"use client";
import { Card, CardContent } from "@/components/ui/card";
import { calculateAttribute } from "@/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { PlayerType, SelectedPlayer } from "./Game";
import { Badge } from "./ui/badge";

interface IPlayer {
  player: PlayerType;
  movePlayer: (val0: number, val1: number, val2: number) => void;
  removePlayer?: (val0: number) => void;
  onPlayerClick?: () => void;
  isActive: boolean;
  selectedPlayer: SelectedPlayer;
}

interface PlayerAttributes {
  attack: number;
  defense: number;
  speed: number;
  power: number;
  stamina: number;
  technique: number;
  goalkeeping: number;
}

// Define a type for attribute weights
type AttributeWeights = {
  [key in keyof PlayerAttributes]: number;
};

const calculateOverallRating = (attributes: PlayerAttributes): number => {
  // Define weights for each attribute based on their importance in overall rating
  const weights: AttributeWeights = {
    attack: 0.25,
    defense: 0.2,
    speed: 0.1,
    power: 0.1,
    stamina: 0.1,
    technique: 0.15,
    goalkeeping: 0.1,
  };

  // Map attributes to the 0-99 scale using calculateAttribute
  const scaledAttributes: PlayerAttributes = {} as PlayerAttributes;
  Object.keys(attributes).forEach((attribute) => {
    scaledAttributes[attribute as keyof PlayerAttributes] = calculateAttribute(
      attributes[attribute as keyof PlayerAttributes]
    );
  });

  // Calculate the weighted sum of scaled attribute values
  const weightedSum = Object.keys(scaledAttributes).reduce(
    (sum, attribute) =>
      sum +
      scaledAttributes[attribute as keyof PlayerAttributes] *
        weights[attribute as keyof PlayerAttributes],
    0
  );

  // Directly use the weighted sum as the overall rating
  const overallRating = Math.min(99, Math.max(0, weightedSum));

  // Round the overall rating to two decimal places
  return Math.floor((Math.round(overallRating * 100) / 100) * 3.5);
};

type DropResult = {
  slot?: number;
};

const positionColors = {
  ATT: "bg-red-500", // Replace 'forward' with the actual position and 'bg-red-500' with the desired color
  MID: "bg-green-500",
  DEF: "bg-blue-500",
  GK: "bg-yellow-500",
};

const Player: React.FC<IPlayer> = ({
  player,
  movePlayer,
  removePlayer,
  isActive,
  onPlayerClick,
  selectedPlayer,
}) => {
  const [playerRating, setPlayerRating] = useState(0);

  const handleDoubleClick = () => {
    if (removePlayer) removePlayer(player.id);
  };

  useEffect(() => {
    const overallRating = calculateOverallRating({
      attack: player.attackScore,
      defense: player.defenseScore,
      speed: player.speed,
      power: player.power,
      stamina: player.stamina,
      technique: player.technique,
      goalkeeping: player.goalkeeping,
    });
    setPlayerRating(overallRating);
  }, []);

  return (
    // <Card
    //   onDoubleClick={handleDoubleClick}
    //   className={`flex  bg-white ${
    //     isActive ? "w-2/3 h-28 p-2 opacity-80" : "w-full h-32 p-4 "
    //   } shadow-lg    transition duration-200 ease-in-out hover:scale-105 `}
    // >
    //   <div
    //     ref={drag}
    //     className={`flex relative  ${
    //         ? " w-full h-full items-center justify-between"
    //         : "w-full h-full"
    //     } `}
    //   >
    //     <div className="flex items-center">
    //       <img
    //         src={player.image}
    //         alt={player.name}
    //         className={`${isActive ? "w-16 h-16  " : "w-20 h-20"} `}
    //       />
    //     </div>
    //     <div
    //       className={`text-black h-full flex flex-col items-center ${
    //         isActive ? "gap-1" : "gap-2"
    //       }`}
    //     >
    //       <p className="font-bold text-lg whitespace-nowrap">{player.name}</p>
    //       <p className="">
    //         <span className="font-bold">A:</span> {player.attackScore}
    //       </p>
    //       <p className="">
    //         <span className="font-bold">D:</span> {player.defenseScore}
    //       </p>
    //     </div>
    //   </div>
    // </Card>
    <>
      {isActive ? (
        <div className="absolute top-[50px] text-white w-[100%] flex items-center justify-center">
          <p className=" text-base font-semibold tracking-tight">
            {player?.name}
          </p>
          <span className="absolute left-[68px] bottom-6 tracking-tighter text-2xl font-semibold">
            {playerRating}
          </span>
        </div>
      ) : (
        <Card
          onClick={onPlayerClick}
          onDoubleClick={handleDoubleClick}
          className={`w-full   cursor-pointer h-24  flex justify-center items-center    shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-200 ease-in-out`}
        >
          {selectedPlayer.id === player.id && (
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-red-400 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          )}
          <CardContent className="group  flex w-[100%] relative items-center  justify-center  ">
            <div className="  flex flex-col absolute bottom-3 -left-[30%] items-center  w-full">
              <Badge
                className={`${
                  positionColors[player.position as keyof typeof positionColors]
                } hover:${
                  positionColors[player.position as keyof typeof positionColors]
                }  text-white dark:bg-opacity-60 px-1.5`}
              >
                {player.position}
              </Badge>
            </div>
            <div className="flex flex-col w-16 absolute left-7 mt-3 h-24 items-center  justify-end  ">
              {/* <Avatar className=" w-10 h-10 ">
                <AvatarImage src={player.image} />
                <AvatarFallback className="hidden">FP</AvatarFallback>
              </Avatar> */}
              <Image alt="player" width={24} height={24} src={player.image} />
              <h1 className=" font-bold text-base dark:text-white/80">
                {player.name}
              </h1>
            </div>
            <h3 className="font-bold absolute dark:text-white/80 right-2 text-xl">
              {playerRating ? playerRating : 0}
            </h3>
            {/* <Badge
            className="items-center whitespace-nowrap py-2"
            variant="outline"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5 mr-2"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            </svg>
            {player.defenseScore}
          </Badge>
          <Badge
            className="items-center whitespace-nowrap py-2"
            variant="outline"
          >
            <svg
              className="h-3.5 w-3.5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5" />
              <line x1="13" x2="19" y1="19" y2="13" />
              <line x1="16" x2="20" y1="16" y2="20" />
              <line x1="19" x2="21" y1="21" y2="19" />
            </svg>
            {player.attackScore}
          </Badge> */}
          </CardContent>
        </Card>
      )}
    </>
  );
};
export default Player;
