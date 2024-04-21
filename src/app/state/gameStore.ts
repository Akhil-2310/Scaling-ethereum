import { RecordWithPlaintext } from "@puzzlehq/sdk";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useNewGameStore } from "../create-game/store";
import {
  GameAction,
  GameNotification,
  GameState,
  getGameAction,
  getGameState,
  parseGameRecord,
} from "./RecordTypes/football_game";

import _ from "lodash";
import { Step, useAcceptGameStore } from "../accept-game/store";

const parsePuzzlePieces = (records: RecordWithPlaintext[]) => {
  if (records.length > 0) {
    let availableBalance = 0;
    let largestPiece = records[0];

    const totalBalance = records
      .filter((record) => !record.spent)
      .map((record) => {
        const amount = record.data?.amount?.replace("u64.private", "");
        if (amount && record.data?.ix === "0u32.private") {
          /// find largestPiece (and thus availableBalance)
          const amountInt = parseInt(amount);
          availableBalance = Math.max(availableBalance, amountInt);
          if (availableBalance == amountInt) {
            largestPiece = record;
          }
          return amountInt;
        }
        return 0;
      })
      .reduce((total, amount) => {
        /// sum up
        return total + amount;
      });
    return { totalBalance, availableBalance, largestPiece };
  }
  return { totalBalance: 0, availableBalance: 0, largestPiece: undefined };
};

export type Game = {
  gameNotification: GameNotification;
  gameState: GameState;
  gameAction?: GameAction;
  puzzleRecords: RecordWithPlaintext[];
  utilRecords: RecordWithPlaintext[];
  msRecords?: MSGameRecords;
};

export type MSGameRecords = {
  gameRecords: RecordWithPlaintext[];
  puzzleRecords: RecordWithPlaintext[];
  utilRecords: RecordWithPlaintext[];
};

type GameStore = {
  currentGame?: Game;
  yourTurn: Game[];
  theirTurn: Game[];
  finished: Game[];
  puzzleRecords: RecordWithPlaintext[];
  availableBalance: number;
  totalBalance: number;
  largestPiece?: RecordWithPlaintext | undefined;
  setRecords: (
    user: string,
    records: {
      gameNotifications: RecordWithPlaintext[];
      utilRecords: RecordWithPlaintext[];
      puzzleRecords: RecordWithPlaintext[];
    },
    msRecords?: MSGameRecords
  ) => void;
  setCurrentGame: (game?: Game) => void;
  clearFlowStores: () => void;
};

const createGame = (
  gameNotification: GameNotification,
  puzzleRecords: RecordWithPlaintext[],
  utilRecords: RecordWithPlaintext[],
  msRecords?: MSGameRecords
): Game => {
  const gameState = getGameState(gameNotification);
  return {
    gameNotification,
    gameState: gameState,
    gameAction: getGameAction(gameState),
    puzzleRecords: puzzleRecords.filter(
      (puzzleRecord) =>
        puzzleRecord.data.game_multisig?.replace(".private", "") ===
        gameNotification.recordData.game_multisig
    ),
    utilRecords: utilRecords.filter(
      (utilRecord) =>
        utilRecord.data.game_multisig?.replace(".private", "") ===
        gameNotification.recordData.game_multisig
    ),
    msRecords: msRecords
      ? {
          gameRecords: msRecords.gameRecords.filter(
            (gameRecord) =>
              gameRecord.owner === gameNotification.recordData.game_multisig
          ),
          puzzleRecords: msRecords.puzzleRecords.filter(
            (puzzleRecord) =>
              puzzleRecord.owner === gameNotification.recordData.game_multisig
          ),
          utilRecords: msRecords.utilRecords.filter(
            (utilRecord) =>
              utilRecord.owner === gameNotification.recordData.game_multisig
          ),
        }
      : undefined,
  };
};

const validStates = {
  yourTurn: new Set([
    "opponent:1", // opponent to submit wager
    "opponent:2", // opponent to accept game
    "challenger:3", // challenger to calculate outcome
    "challenger:4", // challenger to reveal outcome
    "winner:5", // challenger or opponent to claim prize
  ]),
  theirTurn: new Set([
    "challenger:1", // challenger to ping opponent to submit wager
    "challenger:2", // challenger to ping opponent to accept game
    "opponent:3", // opponent to ping challenger to calculate outcome
    "opponent:4", // opponent to ping challenger to reveal outcome
    "loser:5", // TODO: move this to finished instead?
  ]),
  finished: new Set([
    "opponent:0",
    "opponent:6",
    "opponent:9",
    "challenger:0",
    "challenger:6",
    "challenger:9",
  ]),
};

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      currentGame: undefined as Game | undefined,
      yourTurn: [] as Game[],
      theirTurn: [] as Game[],
      finished: [] as Game[],
      puzzleRecords: [] as RecordWithPlaintext[],
      availableBalance: 0,
      totalBalance: 0,
      largestPiece: undefined,
      setRecords: (user, records, msRecords) => {
        const currentGame = get().currentGame;

        const utilRecords = records.utilRecords;

        const puzzleRecords = records.puzzleRecords;
        const { availableBalance, totalBalance, largestPiece } =
          parsePuzzlePieces(puzzleRecords);
        set((state) => ({
          ...state,
          availableBalance,
          totalBalance,
          largestPiece,
        }));

        const allGameNotifications: GameNotification[] =
          records.gameNotifications
            .map((record) => {
              const gameNotification: GameNotification | undefined =
                parseGameRecord(record);
              if (!gameNotification) return;
              return gameNotification;
            })
            .filter(
              (record): record is GameNotification => record !== undefined
            );

        const gameNotificationsByGameAddress = _.groupBy(
          allGameNotifications,
          "recordData.game_multisig"
        );

        const gameNotifications = _.values(gameNotificationsByGameAddress).map(
          (notifications) => {
            if (notifications.length === 1) return notifications[0];
            else {
              const reneged = notifications.find(
                (n) => n.recordData.game_state === "0field"
              );
              if (reneged) return reneged;
              const sorted = _.orderBy(
                notifications,
                "recordData.game_state",
                "desc"
              );
              return sorted[0];
            }
          }
        );

        const { yourTurn, theirTurn, finished } = gameNotifications.reduce<{
          yourTurn: Game[];
          theirTurn: Game[];
          finished: Game[];
        }>(
          (acc, gameNotification) => {
            const game_state = getGameState(gameNotification);
            const game = createGame(
              gameNotification,
              puzzleRecords,
              utilRecords,
              msRecords
            );
            if (
              currentGame &&
              game.gameNotification.recordData.game_multisig ===
                currentGame?.gameNotification.recordData.game_multisig
            ) {
              set({
                currentGame: game,
              });
            }
            if (validStates.yourTurn.has(game_state)) {
              acc.yourTurn.push(game);
            } else if (validStates.theirTurn.has(game_state)) {
              acc.theirTurn.push(game);
            } else {
              acc.finished.push(game);
            }
            return acc;
          },
          { yourTurn: [], theirTurn: [], finished: [] }
        );

        set({ yourTurn, theirTurn, finished });
      },
      setCurrentGame: (game?: Game) => {
        set({ currentGame: game });
        switch (game?.gameAction) {
          case "Submit Wager":
            useAcceptGameStore.getState().setStep(Step._01_SubmitWager);
            break;
          case "Accept":
            useAcceptGameStore.getState().setStep(Step._02_AcceptGame);
            break;
        }
      },
      clearFlowStores: () => {
        useNewGameStore.getState().close();
        useAcceptGameStore.getState().close();
        // useRenegeStore.getState().close();
        // useClaimPrizeWinStore.getState().close();
        // useRevealAnswerStore.getState().close();
        set({ currentGame: undefined });
      },
    }),
    {
      name: "game-manager",
    }
  )
);
