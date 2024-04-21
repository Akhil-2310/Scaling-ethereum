// import { useGameStore } from "@state/gameStore";
// import { useEffect } from "react";
// import { useAccount } from "wagmi";
// import { useGameRecords } from "./records";

// export const useInitGame = () => {
//   const { address } = useAccount();

//   const [setRecords] = useGameStore((state) => [state.setRecords]);

//   const { gameNotifications, puzzleRecords, utilRecords } = useGameRecords();

//   useEffect(() => {
//     if (
//       gameNotifications !== undefined &&
//       puzzleRecords !== undefined &&
//       utilRecords !== undefined &&
//       address
//     ) {
//       setRecords(address, {
//         gameNotifications,
//         puzzleRecords,
//         utilRecords,
//       });
//     }
//   }, [[gameNotifications, puzzleRecords, utilRecords].toString(), address]);
// };
