//@ts-nocheck
"use client";
import { useAcceptGameStore } from "@/app/accept-game/store";
import { GAME_ADDRESS, truncateAddress } from "@/utils";
//@ts-ignore
import { config } from "@/app/config";
import { Game } from "@/app/your-games/page";
import { writeContract } from "@wagmi/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
//@ts-ignore
import Identicon from "react-identicons";
import { toast } from "sonner";
import { useAccount, usePublicClient } from "wagmi";
import GAME_ABI from "../abi/Game.json";

interface IYourTurn {
  game: Game;
  isFinished: boolean;
}

const YourTurn: React.FC<IYourTurn> = ({ game, isFinished }) => {
  const router = useRouter();
  console.log("game32", game);
  const [isLoading, setIsLoading] = useState(false);
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const [
    inputsSubmitWager,
    eventIdSubmit,
    acceptGameInputs,
    setSubmitWagerInputs,
    setEventIdSubmit,
    setStep,
    setAcceptedSelectedTeam,
    initializeAcceptGame,
  ] = useAcceptGameStore((state: any) => [
    state.inputsSubmitWager,
    state.eventIdSubmit,
    state.setAcceptGameInputs,
    state.setSubmitWagerInputs,
    state.setEventIdSubmit,
    state.setStep,
    state.setAcceptedSelectedTeam,
    state.initializeAcceptGame,
  ]);

  const revealOutcome = async () => {
    setIsLoading(true);

    toast.loading("Simulating game...");
    const tx = await writeContract(config, {
      abi: GAME_ABI.abi,
      address: GAME_ADDRESS,
      functionName: "revealOutcome",
      args: [game.game_id],
    });
    // await waitForTransactionReceipt(wagmiConfig, {
    //   chainId: lineaTestnet.id,
    //   hash: tx2,
    //   confirmations: 2,
    // });
    const transaction2 = await publicClient?.waitForTransactionReceipt({
      hash: tx,
    });

    const gameData = await publicClient?.readContract({
      address: GAME_ADDRESS,
      abi: GAME_ABI.abi,
      functionName: "games",
      args: [game.game_id],
    });

    console.log("🚀 ~ revealOutcome ~ gameData:", gameData);
    toast.info(
      `Result is ${Number(gameData[4].goalsHomeTeam)} - ${Number(
        gameData[4].goalsAwayTeam
      )}`
    );

    setIsLoading(false);
  };

  const renderActionButton = () => {
    switch (game.status) {
      case 0:
        // TODO: only render this button for the opponent
        if (game.opponent === address) {
          return (
            <Button
              disabled={isLoading}
              onClick={() => {
                // setCurrentGame(game);
                router.push(`/accept-game/${game.game_id}`);
              }}
              variant="outline"
              className="tracking-wider text-sm text-black dark:text-white font-semibold flex gap-2.5"
            >
              Accept
            </Button>
          );
        }

      case 1:
        // let blockNumber = await useBlockNumber();
        if (game.challenger === address) {
          return (
            <Button
              // onClick={() => {
              //   router.push(
              //     `/accept-game/${game.gameNotification.recordData.game_multisig}`
              //   );
              // }}
              onClick={revealOutcome}
              disabled={isLoading}
              variant="outline"
              className="tracking-wider text-sm text-black dark:text-white font-semibold flex gap-2.5"
            >
              Reveal outcome
            </Button>
          );
        }

        //// TODO (optional) if game.block_number difference from current block number > 100. Allow opponent to call opponentClaimTimelock.
        //// Challenger can still call revealOutcome in this case, unless opponent has claimed earlier
        //// hardcoded 100 here, but timelockBlocks is defined in contract. maybe read that value instead?
        // else if (game.opponent === address && (game.blockNumber - blockNumber.data?) > 100) {
        //   return (
        //     <Button
        //       onClick={
        //         // () => {
        //         //   setCurrentGame(game);
        //         //   router.push(
        //         //     `/accept-game/${game.gameNotification.recordData.game_multisig}`
        //         //   );
        //         // }
        //       }
        //       variant="outline"
        //       className="tracking-wider text-sm text-black dark:text-white font-semibold flex gap-2.5"
        //     >
        //       Claim Timelock
        //     </Button>
        //   );
        // }

        return (
          <Button
            // onClick={} // TODO implement a simple wallet popup that consumes 2 records.
            variant="outline"
            className="tracking-wider text-sm text-black dark:text-white font-semibold flex gap-2.5"
          >
            Reveal outcome
          </Button>
        );
    }
  };
  return (
    // <div className="mb-2 grid w-full grid-cols-[1fr,auto,1fr] items-center gap-5">
    //   <div className="my-auto self-center text-left text-xs font-bold tracking-tight text-primary-pink max-sm:ml-2">
    //     {truncateAddress(vs)}
    //   </div>
    //   <div className="my-auto self-center text-left text-xs font-bold tracking-tight text-primary-pink max-sm:ml-2">
    //     {wager} pieces
    //   </div>
    //   <div className="flex justify-end">{renderActionButton()}</div>
    // </div>
    <Card className="  w-52 grid-span-1 shadow-lg rounded-xl overflow-hidden">
      <div className="flex flex-col gap-4 justify-center items-center  p-6  sm:space-y-0">
        {/* <div className="flex w-full flex-col justify-between">
          <div>
            <Identicon string={truncateAddress(vs)} size={36} />

            <span className="font-semibold text-lg text-center">
              Challenger: <strong>{truncateAddress(vs)}</strong>
            </span>
          </div>
        </div> */}
        <div className="flex flex-col gap-2.5 items-center ">
          {/* Game id= multisig address */}

          <Identicon
            string={
              game.challenger === address
                ? truncateAddress(game.opponent)
                : truncateAddress(game.challenger)
            }
            size={36}
          />
          <span className="font-bold text-lg text-center">
            {game.challenger === address
              ? truncateAddress(game.opponent)
              : truncateAddress(game.challenger)}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Challenged you
          </span>
        </div>

        <div className="flex flex-col text-center w-full items-center justify-center">
          <div>
            <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700">
              {(game.status === 2 || game.status === 3) && (
                <div className="flex flex-col">
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Outcome: <strong>{game.result}</strong>
                  </p>
                </div>
              )}
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Amount: <strong>{game.wager}</strong>
              </p>
            </div>
          </div>

          {renderActionButton()}
        </div>
        {/* <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700">
      <p className="text-xs text-gray-600 dark:text-gray-400">
        Refree: Pierluigi Webb
      </p>
      <p className="text-xs text-gray-600 dark:text-gray-400">
        Stadium: Wembley, London
      </p>
    </div> */}
      </div>
      {/* <div className="px-6 py-2 border-t border-gray-100 dark:border-gray-700">
      <Button className="w-full" variant="outline">
        {game.state === "completed" ? "View Match Statistics" : "Play"}
      </Button>
    </div> */}
    </Card>
  );
};
export default YourTurn;
