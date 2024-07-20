import {
  GameChoices,
  WIN_MULTIPLIER_SINGLE,
  WIN_MULTIPLIER_DOUBLE,
} from "./constants";
import { Bet } from "./types";

export function getComputerChoice(): GameChoices {
  const choices = [GameChoices.ROCK, GameChoices.PAPER, GameChoices.SCISSORS];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

export const determineWinner = (
  playerChoice: GameChoices,
  computerChoice: GameChoices
): string => {
  if (playerChoice === computerChoice) {
    return "tie";
  }

  if (
    (playerChoice === GameChoices.ROCK &&
      computerChoice === GameChoices.SCISSORS) ||
    (playerChoice === GameChoices.SCISSORS &&
      computerChoice === GameChoices.PAPER) ||
    (playerChoice === GameChoices.PAPER && computerChoice === GameChoices.ROCK)
  ) {
    return "player";
  } else {
    return "computer";
  }
};

export const calculateWinnings = (
  betPositions: string[],
  gameBets: Record<string, Bet>,
  computerChoice: GameChoices,
  currentBalance: number
) => {
  let newBalance = currentBalance;
  let newWins = 0;
  let anyWin = false;
  let isTie = false;

  betPositions.forEach((betPosition) => {
    const playerChoice = betPosition.toUpperCase() as GameChoices;
    const result = determineWinner(playerChoice, computerChoice);
    const betAmount = gameBets[betPosition].amount;

    if (result === "player") {
      const multiplier =
        betPositions.length === 1
          ? WIN_MULTIPLIER_SINGLE
          : WIN_MULTIPLIER_DOUBLE;
      newBalance += betAmount * multiplier;
      newWins += 1;
      anyWin = true;
    } else if (result === "tie") {
      newBalance += betAmount;
      isTie = true;
    }
  });

  // Handle case where player bet on two positions, one wins and the other is a tie
  if (anyWin && isTie) {
    const tieBet = betPositions.find(
      (betPosition) =>
        determineWinner(
          betPosition.toUpperCase() as GameChoices,
          computerChoice
        ) === "tie"
    );
    if (tieBet) {
      newBalance += gameBets[tieBet].amount;
    }
  }

  return { newBalance, newWins };
};
