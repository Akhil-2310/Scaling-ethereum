"use client";

import Image from "next/image";
import { BsBatteryFull } from "react-icons/bs";
import { FaBullseye } from "react-icons/fa";
import { FaDumbbell } from "react-icons/fa6";
import { LuSword } from "react-icons/lu";
import { MdShield } from "react-icons/md";

import { TbBrandSpeedtest } from "react-icons/tb";
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { PlayerType } from "./Game";
import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
interface IPlayerDetails {
  playerDetails: PlayerType;
}

const PlayerDetails: React.FC<IPlayerDetails> = ({ playerDetails }) => {
  const data = [
    {
      attribute: "Attack",
      A: playerDetails.attackScore,
      fullMark: 100,
    },
    {
      attribute: "Defense",
      A: playerDetails.defenseScore,
      fullMark: 100,
    },
    {
      attribute: "Speed",
      A: playerDetails.speed,
      fullMark: 100,
    },
    {
      attribute: "Power",
      A: playerDetails.power,
      fullMark: 100,
    },
    {
      attribute: "Technique",
      A: playerDetails.technique,
      fullMark: 100,
    },
    {
      attribute: "Stamina",
      A: playerDetails.stamina,
      fullMark: 100,
    },
  ];
  console.log("playerdetails", playerDetails);

  return (
    <Card className=" relative rounded-lg ">
      <CardHeader className="flex  flex-row gap-4 justify-center items-center">
        <div className="flex flex-col items-center text-center">
          <Image
            alt="player"
            width={48}
            height={48}
            src={playerDetails.image}
          />
          <div>
            <CardTitle className="text-lg font-bold ">
              {playerDetails.name}
            </CardTitle>
            <CardDescription className="text-sm ">
              Position: {playerDetails.position}
            </CardDescription>
          </div>
        </div>
        <div className=" w-80 h-[200px]  rounded">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="attribute" />
              <Tooltip />
              <Radar
                dataKey="A"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.75}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4 mt-2 ">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p>Attack:</p>
            <Badge className="items-center dark:bg-opacity-60 hover:bg-red-500 bg-red-500 text-white">
              <LuSword className="mr-1 h-4 w-4" />
              {playerDetails.attackScore}
              {"\n                      "}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <p>Defense:</p>
            <Badge className="items-center dark:bg-opacity-60 hover:bg-blue-500 bg-blue-500 text-white">
              <MdShield className="mr-1 h-4 w-4" />
              {playerDetails.defenseScore}
              {"\n                      "}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <p>Speed:</p>
            <Badge className="items-center dark:bg-opacity-60 hover:bg-green-500 bg-green-500 text-white">
              <TbBrandSpeedtest className="mr-1 h-4 w-4" />
              {playerDetails.speed}
              {"\n                      "}
            </Badge>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p>Power:</p>
            <Badge className="items-center dark:bg-opacity-60 hover:bg-purple-500 bg-purple-500 text-white">
              <FaDumbbell className="mr-1 h-4 w-4" />
              {playerDetails.power}
              {"\n                      "}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <p>Stamina:</p>
            <Badge className="items-center dark:bg-opacity-60 hover:bg-yellow-500 bg-yellow-500 hover:fill-white text-white hover:text-white ">
              {/* <IoBatteryCharging className="mr-1 h-4 w-4" /> */}
              <BsBatteryFull className="mr-1 h-4 w-4 fill-current" />
              {playerDetails.stamina}
              {"\n                      "}
            </Badge>
          </div>
          <div className="flex items-center dark:bg-opacity-60 justify-between">
            <p>Technique:</p>
            <Badge className="items-center hover:bg-pink-500 bg-pink-500 text-white">
              <FaBullseye className="mr-1.5 h-4 w-4" />
              {playerDetails.technique}
              {"\n                      "}
            </Badge>
          </div>
        </div>
      </CardContent>
      {/* <CardContent className="mt-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-medium text-gray-900">Goalkeeping:</p>
          <Badge className="items-center bg-teal-500 text-white">
            <GiGoalKeeper className="mr-1 h-4 w-4" />
            {playerDetails.goalkeeping}
            {"\n                  "}
          </Badge>
        </div>
      </CardContent> */}
    </Card>
  );
};
export default PlayerDetails;
