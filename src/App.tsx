import { useEffect, useState } from "react";
import BettingPanel from "./components/BettingPanel";
import GameChoicesDisplay from "./components/GameChoicesDisplay";
import Header from "./components/Header";
import { GameChoices, BET_INCREMENT, INITIAL_BALANCE } from "./constants";
import { Bet, Indicators } from "./types";
import { getComputerChoice, calculateWinnings } from "./utils";

const App = () => {
  const [indicators, setIndicators] = useState<Indicators>({
    balance: INITIAL_BALANCE,
    bet: 0,
    win: 0,
  });

  const [gameBets, setGameBets] = useState<Record<string, Bet>>({
    rock: { title: GameChoices.ROCK, amount: 0 },
    paper: { title: GameChoices.PAPER, amount: 0 },
    scissors: { title: GameChoices.SCISSORS, amount: 0 },
  });

  const [betPositions, setBetPositions] = useState<string[]>([]);
  const [gamePlayed, setGamePlayed] = useState(false);
  const [invalidBet, setInvalidBet] = useState(false);

  useEffect(() => {
    const totalBet = Object.values(gameBets).reduce(
      (sum, bet) => sum + bet.amount,
      0
    );
    setInvalidBet(indicators.balance < totalBet);
  }, [indicators.balance, gameBets]);

  const handleBetPlacing = (gameBet: Bet) => {
    if (betPositions.length < 2 && indicators.balance >= BET_INCREMENT) {
      setBetPositions((prevState) => {
        if (!prevState.includes(gameBet.title.toLowerCase())) {
          return [...prevState, gameBet.title.toLowerCase()];
        }
        return prevState;
      });

      setGameBets((prevState) => ({
        ...prevState,
        [gameBet.title.toLowerCase()]: {
          title: prevState[gameBet.title.toLowerCase()].title,
          amount: prevState[gameBet.title.toLowerCase()].amount + BET_INCREMENT,
        },
      }));
      setIndicators((prevState) => ({
        ...prevState,
        balance: prevState.balance - BET_INCREMENT,
      }));
    }
  };

  const getWinnerHandler = () => {
    const computerChoice = getComputerChoice();
    const { newBalance, newWins } = calculateWinnings(
      betPositions,
      gameBets,
      computerChoice,
      indicators.balance
    );

    setIndicators((prevState) => ({
      ...prevState,
      balance: newBalance,
      win: prevState.win + newWins,
      bet: prevState.bet + 1,
    }));

    setGamePlayed(true);
  };

  const resetGame = () => {
    setGamePlayed(false);
    setBetPositions([]);
    setGameBets({
      rock: { title: GameChoices.ROCK, amount: 0 },
      paper: { title: GameChoices.PAPER, amount: 0 },
      scissors: { title: GameChoices.SCISSORS, amount: 0 },
    });
  };

  return (
    <main>
      <Header indicators={indicators} />
      <section className="game-choices">
        {gamePlayed && (
          <GameChoicesDisplay
            computerChoice={getComputerChoice()}
            betPositions={betPositions}
          />
        )}
      </section>
      <section className="game-board">
        <p className="game-board_title">PICK YOUR POSITIONS</p>
        <BettingPanel gameBets={gameBets} handleBetPlacing={handleBetPlacing} />
        <button
          className="game-control"
          onClick={gamePlayed ? resetGame : getWinnerHandler}
          disabled={invalidBet}
          style={{ opacity: invalidBet ? 0.5 : 1 }}
        >
          {gamePlayed ? "CLEAR" : "PLAY"}
        </button>
      </section>
    </main>
  );
};

export default App;
