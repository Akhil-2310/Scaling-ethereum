"use client";

import { PlayerType, SelectedPlayer } from "../Game";
import GridSlot from "./GridSlot";

interface IGrid {
  formation: string;
  rowIndex: number;
  selectedPlayer: SelectedPlayer;
  isGoalkeeper: boolean;
  grid: (PlayerType | null)[];
  movePlayer: (val0: number, val1: number, val2: number) => void;
  removePlayer: (playerId: number) => void;
  isSelecting: boolean;
  setIsSelecting: (val: boolean) => void;
  replacePlayer: (val: number) => void;
  jersey: string;
}

const Grid: React.FC<IGrid> = ({
  formation,
  grid,
  movePlayer,
  removePlayer,
  selectedPlayer,
  isGoalkeeper,
  rowIndex,
  isSelecting,
  setIsSelecting,
  replacePlayer,
  jersey,
}) => {
  const handleGridSlotClick = (slot: number) => {
    // Handle the click event
    if (grid[slot] === null) {
      movePlayer(selectedPlayer.id, rowIndex, slot);
    } else {
      removePlayer(selectedPlayer.id || 0);
    }
  };

  return (
    <div
      className={`w-[90vh] justify-items-center items-center content-center grid grid-cols-${formation}`}
    >
      {grid.map((player, index) => (
        <GridSlot
          isSelecting={isSelecting}
          isDisabled={false}
          formationPart={formation}
          key={index}
          rowIndex={rowIndex}
          selectedPlayer={selectedPlayer}
          slot={index}
          player={player}
          jersey={jersey}
          setIsSelecting={setIsSelecting}
          isGoalkeeper={isGoalkeeper}
          movePlayer={() => handleGridSlotClick(index)}
          removePlayer={() => removePlayer(player?.id || 0)}
          replacePlayer={replacePlayer}
        />
      ))}
    </div>
  );
};
// const getGridClass = (formation: string): string => {
//   // Implement the logic to determine the grid class based on the formation
//   // You can use a switch statement or any other logic here
//   // Example:
//   switch (formation) {
//     case "4-4-2":
//       return "grid-cols-4 grid-rows-4"; // Customize as needed
//     case "3-5-2":
//       return "grid-cols-3 grid-rows-5"; // Customize as needed
//     default:
//       return "grid-cols-4 grid-rows-4"; // Default grid class
//   }
// };

export default Grid;
