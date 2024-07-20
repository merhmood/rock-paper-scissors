import React from "react";
import { Bet } from "../types";

interface BettingPanelProps {
  gameBets: Record<string, Bet>;
  handleBetPlacing: (gameBet: Bet) => void;
}

const BettingPanel: React.FC<BettingPanelProps> = ({
  gameBets,
  handleBetPlacing,
}) => (
  <div className="game-board_pieces">
    {Object.entries(gameBets).map(([key, value], index) => (
      <div
        className={`game-board_bets ${key}`}
        key={index}
        onClick={() =>
          handleBetPlacing({ title: value.title, amount: value.amount })
        }
      >
        <p>{value.amount}</p>
        <h2>{value.title}</h2>
      </div>
    ))}
  </div>
);

export default BettingPanel;
