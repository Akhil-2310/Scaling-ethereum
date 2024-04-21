"use client";

import { truncateAddress } from "@/utils";
import { Card } from "./ui/card";
//@ts-ignore
import Identicon from "react-identicons";
import { useAccount } from "wagmi";
interface IGameCard {
  playerOne: string;
  playerTwo: string;
  score?: string;
  state: string;
  date?: string;
}

const GameCard: React.FC<IGameCard> = ({
  playerOne,
  playerTwo,
  score,
  state,
  date,
}) => {
  const { address } = useAccount();
  return (
    <Card className="  max-w-lg grid-span-1 w-full shadow-lg rounded-xl overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-center items-center lg:justify-between p-6 space-y-6 sm:space-y-0">
        <div className="flex flex-col gap-2.5 items-center ">
          <span className="font-bold text-lg text-center">
            {address ? truncateAddress(address) : ""}
          </span>
          {/* <img
          alt="Team A Logo"
          className="rounded-full"
          height="50"
          src={homeLogo}
          style={{
            aspectRatio: "50/50",
            objectFit: "cover",
          }}
          width="50"
        /> */}
          <Identicon string={playerOne} size={36} className="" />
        </div>
        <div className="text-center">
          {/* <p className="text-sm whitespace-nowrap text-gray-600 dark:text-gray-400">
            vs
          </p> */}
          <p className="text-xl font-bold">{score}</p>
          <p className="text-sm whitespace-nowrap text-gray-600 dark:text-gray-400">
            {state === "completed" ? "Full Time" : "Ongoing"}
          </p>
        </div>
        <div className="flex flex-col gap-2.5 items-center text-center">
          <span className="font-bold text-lg">
            {playerTwo ? truncateAddress(playerTwo) : ""}
          </span>
          <Identicon string={playerTwo} size={36} className="" />
        </div>
      </div>
      <div className="flex w-full items-center justify-center">
        <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {/* Match Date: {date} */}
            Match Date : 23/03/2024
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Stadium: Froggy Arena
          </p>
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
        {state === "completed" ? "View Match Statistics" : "Play"}
      </Button>
    </div> */}
    </Card>
  );
};
export default GameCard;
