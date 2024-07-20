import React from "react";
import { GameChoices } from "../constants";

interface GameChoicesDisplayProps {
  computerChoice: GameChoices;
  betPositions: string[];
}

const GameChoicesDisplay: React.FC<GameChoicesDisplayProps> = ({
  computerChoice,
  betPositions,
}) => (
  <div className="choices">
    <p>{computerChoice}</p>
    <span>VS</span>
    <p>
      {
        // Player Choice
        betPositions.join(", ").toUpperCase()
      }
    </p>
  </div>
);

export default GameChoicesDisplay;
