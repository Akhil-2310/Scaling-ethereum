import { isValidPlacement } from "@/utils";
import Image from "next/image";
import React from "react";
import { CgArrowsExchangeAlt } from "react-icons/cg";
import { GiCancel } from "react-icons/gi";
import { PlayerType, SelectedPlayer } from "../Game";
import Player from "../Player";
interface IGridSlot {
  player: PlayerType | null;
  formationPart: string;
  slot: number;
  isDisabled: boolean;
  rowIndex: number;
  selectedPlayer: SelectedPlayer;
  isGoalkeeper: boolean;
  isSelecting: boolean;
  movePlayer: (val0: number, val1: number, val2: number) => void;
  removePlayer: (val0: number) => void;
  setIsSelecting: (val: boolean) => void;
  replacePlayer: (val: number) => void;
  jersey: string;
}

const GridSlot: React.FC<IGridSlot> = ({
  slot,
  player,
  movePlayer,
  isDisabled,
  isGoalkeeper,
  formationPart,
  selectedPlayer,
  removePlayer,
  rowIndex,
  isSelecting,
  setIsSelecting,
  replacePlayer,
  jersey,
}) => {
  const jerseyColor = isGoalkeeper ? "rgba(255,0,0,1)" : jersey;
  const isValid = isValidPlacement(selectedPlayer?.position, rowIndex);
  return (
    <div
      onClick={() => {
        setIsSelecting(true);
        if (!player) {
          movePlayer(selectedPlayer.id, rowIndex, slot);
        }
      }}
      className={`w-20 h-20 relative ${
        isValid && !player && "hover:scale-105 duration-200 transition"
      }  flex  flex-col ${isDisabled ? "cursor-not-allowed" : ""} ${
        isSelecting ? " " : ""
      }`}
    >
      {isSelecting && (
        <div className="absolute flex justify-end mx-auto w-[90%] -top-2 left-1">
          {/* <FaExchangeAlt
            onClick={() => {
              if (player) {
                replacePlayer(player.id);
              }
            }}
            className="hover:text-red-500 z-10 stroke-current"
          /> */}
          {player && (
            <GiCancel
              onClick={() => removePlayer(player?.id as number)}
              className=" hover:text-red-500 ease-in-out transition-colors duration-150 z-10 stroke-current "
            />
          )}
        </div>
      )}
      <div>
        <span className="w-12 left-4 absolute h-12">
          {/* <JerseySVG fillColor={jerseyColor} /> */}
          <Image
            // src={`/svg/${isGoalkeeper ? "jersey_gk.svg" : jersey}`}
            src={jersey}
            alt="jersey"
            className="relative"
            fill
          />
        </span>
        {isSelecting && isValid && (
          <span className=" absolute left-[35%] top-[20%]">
            <CgArrowsExchangeAlt className="h-6 fill-white text-white w-6" />
          </span>
        )}

        {player && !isDisabled && (
          <Player
            selectedPlayer={selectedPlayer}
            removePlayer={removePlayer}
            player={player}
            movePlayer={movePlayer}
            isActive={true}
          />
        )}
      </div>
    </div>
  );
};

export default GridSlot;
