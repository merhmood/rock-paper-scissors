/**
 * Welcome the ROCK PAPER SCISSORS game
 * - To place bet click on the box showing bet value.
 * - Bet can only be a multiple of 500
 */

import { useState } from "react";
import GameOutcomeFactory from "./components/factories/GameOutcomeFactory";
import {
  ClearGameControlButton,
  PlayGameControlButton,
} from "./components/HOC/withGameControl";

enum GameChoices {
  ROCK = "ROCK",
  PAPER = "PAPER",
  SCISSORS = "SCISSORS",
}

enum GameOutcome {
  WON = "WON",
  LOST = "LOST",
  DRAW = "DRAW",
}

const BET_INCREMENT = 500;

function App() {
  const [indicators, setIndicators] = useState({
    balance: 5000,
    bet: 0,
    win: 0,
  });

  const [gameBets, setGameBets] = useState({
    rock: { title: GameChoices.ROCK, amount: 0 },
    paper: { title: GameChoices.PAPER, amount: 0 },
    scissors: { title: GameChoices.SCISSORS, amount: 0 },
  });

  const [betPositions, setbetPositions] = useState<Array<string>>([]);

  const gamePlayed = false;

  const gameOutcome = "LOST";

  const choices = {
    player: null,
    computer: null,
  };

  const wonChoice = GameChoices.PAPER;

  const objectToList = (object: object) => Object.entries(object);

  const handleBetPlacing = (gameBet: { title: string; amount: number }) => {
    if (
      betPositions.includes(gameBet.title.toLocaleLowerCase()) ||
      betPositions.length <= 1
    ) {
      setbetPositions((prevState) => {
        if (
          !prevState.includes(gameBet.title.toLocaleLowerCase()) &&
          prevState.length <= 2
        )
          return [...prevState, gameBet.title.toLocaleLowerCase()];
        else return [...prevState];
      });
    }
    if (
      indicators.balance > 0 &&
      betPositions.includes(gameBet.title.toLocaleLowerCase())
    ) {
      // Place bet in choice
      setGameBets((prevState: any) => ({
        ...prevState,
        [gameBet.title.toLocaleLowerCase()]: {
          title: prevState[gameBet.title.toLocaleLowerCase()].title,
          amount:
            prevState[gameBet.title.toLocaleLowerCase()].amount + BET_INCREMENT,
        },
      }));
      // Reduce player balance
      setIndicators((prevState) => ({
        ...prevState,
        balance: prevState.balance - BET_INCREMENT,
      }));
    }
  };

  const getWinnerHandler = () => {
    let winingPositions = [];
    let winingAmount = 0;
    const computerChoice = getComputerChoice();

    for (const betPosition of betPositions) {
      if (
        betPosition.toLocaleUpperCase() === "PAPER" &&
        computerChoice === "ROCK"
      ) {
        winingPositions.push("player");
        winingAmount = gameBets["paper"].amount;
      } else if (
        computerChoice === "PAPER" &&
        betPosition.toLocaleUpperCase() === "ROCK"
      ) {
        winingPositions.push("computer");
      } else if (
        betPosition.toLocaleUpperCase() === "ROCK" &&
        computerChoice === "SCISSORS"
      ) {
        winingPositions.push("player");
        winingAmount = gameBets["rock"].amount;
      } else if (
        computerChoice === "ROCK" &&
        betPosition.toLocaleUpperCase() === "SCISSORS"
      ) {
        winingPositions.push("computer");
      } else if (
        betPosition.toLocaleUpperCase() === "SCISSORS" &&
        computerChoice === "PAPER"
      ) {
        winingPositions.push("player");
        winingAmount = gameBets["scissors"].amount;
      } else if (
        computerChoice === "SCISSORS" &&
        betPosition.toLocaleUpperCase() === "PAPER"
      ) {
        winingPositions.push("computer");
      }
    }
    for (const winingPosition of winingPositions) {
      if (winingPosition === "player" && winingPositions.length < 2) {
        setIndicators((prevState) => ({
          ...prevState,
          balance: prevState.balance + 14 * winingAmount,
        }));
      } else if (winingPosition === "player" && winingPositions.length >= 2) {
        setIndicators((prevState) => ({
          ...prevState,
          balance: prevState.balance + 3 * winingAmount,
        }));
      }
    }
  };

  function getComputerChoice(): string {
    const numbers = ["ROCK", "PAPER", "SCISSORS"];
    const randomIndex = Math.floor(Math.random() * numbers.length);
    return numbers[randomIndex];
  }

  return (
    <main>
      <header id="header">
        {
          // Displays the values for balance, bet and win
          objectToList(indicators).map(([indicator, value], index) => (
            <div className="item" key={index}>
              <h2 className="indicator">{indicator.toLocaleUpperCase()}: </h2>
              <p className="value">{value}</p>
            </div>
          ))
        }
      </header>
      <section className="game-outcome">
        {gameOutcome === GameOutcome.WON &&
          GameOutcomeFactory.createGameOutcomeComponent("WON", wonChoice)}
      </section>
      <section className="game-choices">
        {choices.computer && choices.player && (
          <div className="choices">
            <p>{choices.computer}</p>
            <span>VS</span>
            <p>{choices.player}</p>
          </div>
        )}
      </section>
      <section className="game-board">
        <p className="game-board_title">PICK YOUR POSITIONS</p>
        <div className="game-board_pieces">
          {
            // gameBet represents possible betting position
            objectToList(gameBets).map(([gameBet, value], index) => (
              <div
                className={`game-board_bets ${gameBet}`}
                key={index}
                onClick={() =>
                  handleBetPlacing({ title: value.title, amount: value.amount })
                }
              >
                <p>{value.amount}</p>
                <h2>{value.title}</h2>
              </div>
            ))
          }
        </div>
        <p onClick={getWinnerHandler}>play</p>
        {changeControlButton(gamePlayed)}
      </section>
    </main>
  );
}

const changeControlButton = (gamePlayed: boolean) =>
  gamePlayed ? <ClearGameControlButton /> : <PlayGameControlButton />;

export default App;
