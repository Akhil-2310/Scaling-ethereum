// import { useRecords } from "@puzzlehq/sdk";

// export const useGameRecords = () => {
//   const { records } = useRecords({
//     filter: {
//       programIds: [
//         "football_game_v014.aleo",
//         "puzzle_pieces_v016.aleo",
//         "multiparty_pvp_utils_v015_avh.aleo",
//       ],
//       type: "unspent",
//     },
//     multisig: false,
//   });

//   const gameNotifications = records?.filter(
//     (record) => record.programId === "football_game_v014.aleo"
//   );
//   const puzzleRecords = records?.filter(
//     (record) => record.programId === "puzzle_pieces_v016.aleo"
//   );
//   const utilRecords = records?.filter(
//     (record) => record.programId === "multiparty_pvp_utils_v015_avh.aleo"
//   );

//   return { puzzleRecords, gameNotifications, utilRecords };
// };
