"use client";

import Game from "@/components/Game";
import TeamSelection from "@/components/TeamSelection";
import { useState } from "react";

interface IAcceptGamePage {}

const AcceptGamePage: React.FC<IAcceptGamePage> = ({}) => {
  const [selectedTeam, setSelectedTeam] = useState(1);
  const [isGameStarted, setIsGameStarted] = useState(false);
  return (
    <div className="">
      {isGameStarted ? (
        <Game selectedTeam={selectedTeam} isChallenged={true} />
      ) : (
        <TeamSelection
          isChallenged={true}
          setSelectedTeam={setSelectedTeam}
          selectedTeam={selectedTeam}
          setIsGameStarted={setIsGameStarted}
        />
      )}
    </div>
  );
};
export default AcceptGamePage;
