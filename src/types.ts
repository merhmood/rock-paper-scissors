import { GameChoices } from "./constants";

export interface Bet {
  title: GameChoices;
  amount: number;
}

export interface Indicators {
  balance: number;
  bet: number;
  win: number;
}
