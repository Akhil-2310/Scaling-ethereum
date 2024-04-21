"use client";
import { useState } from "react";
// import { getLeaderboard, storeLeaderboard } from "./db";
// import { sdk } from "./sdk";

// import './Leaderboard.css'; // Assuming you have a separate CSS file for the Leaderboard
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const calculateTotalPoints = (win: number, draw: number) => {
    return win * 3 + draw;
  };
  const LEADERBOARD_SECTIONS = [
    { title: "GP", description: "Games Played" },
    { title: "W", description: "Wins" },
    { title: "D", description: "Draws" },
    { title: "L", description: "Losses" },
    { title: "GF", description: "Goals For" },
    { title: "GA", description: "Goals Against" },
    { title: "P", description: "Points" },
  ];
  //   useEffect(() => {
  //     const refresh = async () => {
  //       await refreshLeaderboard();
  //     };
  //     refresh();
  //     const lb = getLeaderboard();
  //     setLeaderboard(lb);
  //   }, []);

  //   const refreshLeaderboard = async () => {
  //     setIsLoading(true);
  //     try {
  //       const lb = await sdk.retrieveLeaderboard();

  //       storeLeaderboard(lb);
  //       setLeaderboard(lb);
  //       return lb;
  //     } catch (error) {
  //       console.error(error);
  //     }
  //     setIsLoading(false);
  //   };

  return (
    <section className="w-full  text-black py-6 px-2 md:px-4 lg:px-8">
      <div className="grid gap-4 grid-rows-3 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-7 row-span-2 ">
          <CardHeader>
            <CardTitle className="text-3xl dark:text-white font-semibold mb-2 tracking-tighter">
              Leo League Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="">Team</TableHead>
                    {LEADERBOARD_SECTIONS.map((section) => {
                      return (
                        <TooltipProvider
                          delayDuration={200}
                          key={section.title}
                        >
                          <TableHead className="underline">
                            <Tooltip>
                              <TooltipTrigger>{section.title}</TooltipTrigger>
                              <TooltipContent>
                                {section.description}
                              </TooltipContent>
                            </Tooltip>
                          </TableHead>
                        </TooltipProvider>
                      );
                    })}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* {leaderboard &&
                leaderboard.players
                  .sort((a, b) => a.position - b.position)
                  .map((player) => (
                    <TableRow key={player.user}>
                      <TableCell className="flex items-center">
  
                        <span className="font-medium">
                          {truncateAddress(player.user)}
                        </span>
                      </TableCell>
                      <TableCell>
                        {player.win + player.draw + player.loss}
                      </TableCell>
                      <TableCell>{player.win}</TableCell>
                      <TableCell>{player.draw}</TableCell>
                      <TableCell>{player.loss}</TableCell>
                      <TableCell>{player.goals_scored}</TableCell>
                      <TableCell>{player.goals_conceded}</TableCell>
  
                      <TableCell>
                        {calculateTotalPoints(player.win, player.draw)}
                      </TableCell>
                    </TableRow>
                  ))}  */}

                  <TableRow className="dark:text-white">
                    <TableCell className="flex items-center">
                      <span className="font-medium">aleo1aehm9...juhy4</span>
                    </TableCell>
                    <TableCell>4</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>4</TableCell>
                    <TableCell>5</TableCell>

                    <TableCell>12</TableCell>
                  </TableRow>
                  <TableRow className="dark:text-white">
                    <TableCell className="flex items-center">
                      <span className="font-medium">aleo1aehm9...juhy4</span>
                    </TableCell>
                    <TableCell>4</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>4</TableCell>
                    <TableCell>5</TableCell>

                    <TableCell>12</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        {/* <div className="col-span-7  ">
          <div className="grid grid-cols-4 gap-2">
            <GamesData />
            <GamesData />
            <GamesData />
            <GamesData />
          </div>
        </div> */}
        {/* <PlayerDetails /> */}
      </div>
    </section>
  );
};

export default Leaderboard;
