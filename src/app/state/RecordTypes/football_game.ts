// @ts-nocheck
import { RecordWithPlaintext, zodAddress } from "@puzzlehq/sdk";
import { z } from "zod";

const u8 = z.number().int().min(0).max(255);

export const GameRecordSchema = z.object({
  owner: zodAddress,
  challenger_commit: z.string(),
  opponent_answer: z.array(u8).length(11),
  total_pot: z.string().transform(Number),
  challenger_address: zodAddress,
  opponent_address: zodAddress,
  game_multisig: zodAddress,
  game_state: z.enum([
    "0field",
    "1field",
    "2field",
    "3field",
    "4field",
    "5field",
    "6field",
    "9field",
  ]),
  ix: z.literal("1u32"), // We ignore finished games (ix 0)
  _nonce: z.string(),
});
export type GameRecord = {
  recordData: z.infer<typeof GameRecordSchema>;
  recordWithPlaintext: RecordWithPlaintext;
};

export const GameReqNotificationSchema = z.object({
  owner: zodAddress,
  game_multisig: zodAddress,
  game_state: z.literal("1field"),
  your_turn: z.string().transform(Boolean),
  total_pot: z.string().transform(Number),
  challenger_address: zodAddress,
  opponent_address: zodAddress,
  ix: z.literal("2u32"),
  _nonce: z.string(),
});
export type GameReqNotification = {
  recordData: z.infer<typeof GameReqNotificationSchema>;
  recordWithPlaintext: RecordWithPlaintext;
};

export const WaitingAcceptanceNotificationSchema = z.object({
  owner: zodAddress, // challenger
  game_multisig: zodAddress,
  game_state: z.literal("1field"),
  your_turn: z.string().transform(Boolean),
  total_pot: z.string().transform(Number),
  challenger_address: zodAddress,
  opponent_address: zodAddress,
  ix: z.literal("3u32"),
  _nonce: z.string(),
});
export type WaitingAcceptanceNotification = {
  recordData: z.infer<typeof WaitingAcceptanceNotificationSchema>;
  recordWithPlaintext: RecordWithPlaintext;
};

export const StakeRenegedNotificationSchema = z.object({
  owner: zodAddress, //opponent
  game_multisig: zodAddress,
  game_state: z.literal("0field"),
  your_turn: z.string().transform(Boolean),
  total_pot: z.string().transform(Number),
  challenger_address: zodAddress,
  opponent_address: zodAddress,
  renege_address: zodAddress,
  ix: z.literal("4u32"),
  _nonce: z.string(),
});
export type StakeRenegedNotification = {
  recordData: z.infer<typeof StakeRenegedNotificationSchema>;
  recordWithPlaintext: RecordWithPlaintext;
};

export const ChallengerWagerNotificationSchema = z.object({
  owner: zodAddress, //opponent
  game_multisig: zodAddress,
  game_state: z.literal("2field"),
  your_turn: z.string().transform(Boolean),
  total_pot: z.string().transform(Number),
  challenger_address: zodAddress,
  opponent_address: zodAddress,
  ix: z.literal("5u32"),
  _nonce: z.string(),
});
export type ChallengerWagerNotification = {
  recordData: z.infer<typeof ChallengerWagerNotificationSchema>;
  recordWithPlaintext: RecordWithPlaintext;
};

export const OpponentWagerNotificationSchema = z.object({
  owner: zodAddress, //opponent
  game_multisig: zodAddress,
  game_state: z.literal("2field"),
  your_turn: z.string().transform(Boolean),
  total_pot: z.string().transform(Number),
  challenger_address: zodAddress,
  opponent_address: zodAddress,
  ix: z.literal("6u32"),
  _nonce: z.string(),
});
export type OpponentWagerNotification = {
  recordData: z.infer<typeof OpponentWagerNotificationSchema>;
  recordWithPlaintext: RecordWithPlaintext;
};

export const WaitingRevealNotificationSchema = z.object({
  owner: zodAddress, //opponent
  game_multisig: zodAddress,
  game_state: z.literal("3field"),
  your_turn: z.string().transform(Boolean),
  total_pot: z.string().transform(Number),
  challenger_address: zodAddress,
  opponent_address: zodAddress,
  ix: z.literal("7u32"),
  _nonce: z.string(),
});
export type WaitingRevealNotification = {
  recordData: z.infer<typeof WaitingRevealNotificationSchema>;
  recordWithPlaintext: RecordWithPlaintext;
};

export const RevealAnswerNotificationSchema = z.object({
  owner: zodAddress, //challenger
  game_multisig: zodAddress,
  game_state: z.literal("3field"),
  your_turn: z.string().transform(Boolean),
  total_pot: z.string().transform(Number),
  challenger_address: zodAddress,
  opponent_address: zodAddress,
  // opponent_answer: z.array(u8).length(11), // TODO should we store as string instead?
  opponent_answer: z.array(z.string()).length(11),
  ix: z.literal("8u32"),
  _nonce: z.string(),
});
export type RevealAnswerNotification = {
  recordData: z.infer<typeof RevealAnswerNotificationSchema>;
  recordWithPlaintext: RecordWithPlaintext;
};

export const WaitingCalculationNotificationSchema = z.object({
  owner: zodAddress, //opponent
  game_multisig: zodAddress,
  game_state: z.literal("4field"),
  your_turn: z.string().transform(Boolean),
  total_pot: z.string().transform(Number),
  challenger_address: zodAddress,
  opponent_address: zodAddress,
  ix: z.literal("9u32"),
  _nonce: z.string(),
});
export type WaitingCalculationNotification = {
  recordData: z.infer<typeof WaitingCalculationNotificationSchema>;
  recordWithPlaintext: RecordWithPlaintext;
};

export const CalculatedOutcomeNotificationSchema = z.object({
  owner: zodAddress, //opponent
  game_multisig: zodAddress,
  game_state: z.literal("4field"),
  your_turn: z.string().transform(Boolean),
  total_pot: z.string().transform(Number),
  challenger_address: zodAddress,
  opponent_address: zodAddress,
  opponent_answer: z.array(z.string()).length(11),
  ix: z.literal("10u32"),
  _nonce: z.string(),
});
export type CalculatedOutcomeNotification = {
  recordData: z.infer<typeof CalculatedOutcomeNotificationSchema>;
  recordWithPlaintext: RecordWithPlaintext;
};

export const GameFinishReqNotificationSchema = z.object({
  owner: zodAddress, //opponent
  game_multisig: zodAddress,
  game_state: z.literal("5field"),
  your_turn: z.string().transform(Boolean),
  total_pot: z.string().transform(Number),
  challenger_address: zodAddress,
  opponent_address: zodAddress,
  // challenger_answer: z.array(u8).length(11),
  // opponent_answer: z.array(u8).length(11),
  challenger_answer: z.array(z.string()).length(11),
  opponent_answer: z.array(z.string()).length(11),
  winner: zodAddress,
  loser: zodAddress,
  ix: z.literal("11u32"),
  _nonce: z.string(),
});
export type GameFinishReqNotification = {
  recordData: z.infer<typeof GameFinishReqNotificationSchema>;
  recordWithPlaintext: RecordWithPlaintext;
};

export const GameFinishedNotificationSchema = z.object({
  owner: zodAddress, //opponent
  game_multisig: zodAddress,
  game_state: z.enum(["6field", "9field"]),
  your_turn: z.string().transform(Boolean),
  total_pot: z.string().transform(Number),
  challenger_address: zodAddress,
  opponent_address: zodAddress,
  winner: zodAddress,
  loser: zodAddress,
  ix: z.literal("12u32"),
  _nonce: z.string(),
});
export type GameFinishedNotification = {
  recordData: z.infer<typeof GameFinishedNotificationSchema>;
  recordWithPlaintext: RecordWithPlaintext;
};

export type GameNotification =
  | GameReqNotification
  | WaitingAcceptanceNotification
  | StakeRenegedNotification
  | ChallengerWagerNotification
  | OpponentWagerNotification
  | WaitingRevealNotification
  | RevealAnswerNotification
  | GameFinishReqNotification
  | GameFinishedNotification
  | CalculatedOutcomeNotification
  | WaitingCalculationNotification;

export const removeVisibilitySuffix = (obj: { [key: string]: string }) => {
  
  for (const key in obj) {
    if (typeof obj[key] === "string") {
      obj[key] = obj[key]
        .replace(".private", "")
        .replace(".public", "")
        .replace("u64", "");
    } else if (Array.isArray(obj[key])) {
      obj[key] = obj[key].map(item => 
        // typeof item === "string" ? item.replace("u8.private", "") : item
        typeof item === "string" ? item.replace(".private", "") : item

      );
    }
    
  }
  return obj;
};

export type GameState =
  | "challenger:0"
  | "challenger:1"
  | "challenger:2"
  | "challenger:3"
  | "challenger:6"
  | "challenger:9"
  | "opponent:0"
  | "opponent:1"
  | "opponent:2"
  | "opponent:3"
  | "opponent:6"
  | "opponent:9"
  | "winner:5"
  | "loser:5";

export const getGameState = (game: GameNotification): GameState => {
  const challenger_or_opponent =
    game.recordData.challenger_address === game.recordData.owner
      ? "challenger"
      : "opponent";
  switch (game.recordData.ix) {
    case "2u32": // GameReqNotification
      return `opponent:1`;
    case "3u32": // WaitingAcceptanceNotification
      return `challenger:1`;
    case "4u32": // StakeRenegedNotification
      return `${challenger_or_opponent}:0`;
    case "5u32": // ChallengerWagerNotification
      return `challenger:2`;
    case "6u32": // OpponentWagerNotification
      return `opponent:2`;
    case "7u32": // WaitingRevealNotification
      return `opponent:3`;
    case "8u32": // RevealAnswerNotification
      return `challenger:3`;
    case "9u32": // WaitingCalculationNotification
      return `opponent:4`;
    case "10u32": // CalculatedOutcomeNotification
      return `challenger:4`;
    case "11u32": {
      console.log("game.recordData.winner", game.recordData.winner);
      const isWinner = game.recordData.winner === game.recordData.owner;
      return isWinner ? `winner:5` : `loser:5`;
    }
    case "12u32": // GameFinishedNotification
      return `${challenger_or_opponent}:6`;
    default:
      return "challenger:0";
  }
};

export type GameAction =
  | "Renege"
  | "Reveal"
  | "Claim"
  | "Accept"
  | "Submit Wager"
  | "Ping"
  | "Claim"
  | "Lose"
  | "Calculate"
  | undefined;

export const getGameAction = (gameState: GameState): GameAction => {
  switch (gameState) {
    case "challenger:0":
      return undefined;
    case "challenger:1":
      return undefined; // ping and Renege
    case "challenger:2":
      return undefined; // ping and Renege
    case "challenger:3":
      return "Calculate";
    case "challenger:4":
      return "Reveal";
    case "challenger:5":
      return undefined;
    case "challenger:6":
      return undefined;
    case "challenger:9":
      return undefined;
    case "opponent:0":
      return undefined;
    case "opponent:1":
      return "Submit Wager";
    case "opponent:2":
      return "Accept";
    case "opponent:3":
      return undefined; // ping  TODO Renege possible here?
    case "opponent:4":
      return undefined; // ping  TODO Renege possible here?
    case "opponent:5":
      return undefined;
    case "opponent:6":
      return undefined;
    case "opponent:9":
      return undefined;
    case "winner:5":
      return "Claim";
    case "loser:5":
      return "Lose";
  }
};

export const parseGameRecord = (
  recordWithPlaintext: RecordWithPlaintext
): GameNotification | undefined => {
  const schemas = [
    GameReqNotificationSchema,
    WaitingAcceptanceNotificationSchema,
    StakeRenegedNotificationSchema,
    ChallengerWagerNotificationSchema,
    OpponentWagerNotificationSchema,
    WaitingRevealNotificationSchema,
    RevealAnswerNotificationSchema,
    GameFinishReqNotificationSchema,
    GameFinishedNotificationSchema,
    CalculatedOutcomeNotificationSchema,
    WaitingCalculationNotificationSchema,
  ];
  for (const schema of schemas) {
    try {

      const result = schema.parse(
        removeVisibilitySuffix(recordWithPlaintext.data)
      );
      return {
        recordData: result,
        recordWithPlaintext: recordWithPlaintext,
      } as GameNotification;
    } catch {
     }
  }
  return undefined;
};
