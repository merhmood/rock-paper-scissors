import GameOutcomeFactory from "./components/GameOutcomeFactory";

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

function App() {
  const indicators = {
    balance: 5000,
    bet: 0,
    win: 0,
  };

  const gameBets = {
    rock: { title: GameChoices.ROCK, amount: 0 },
    paper: { title: GameChoices.PAPER, amount: 500 },
    scissors: { title: GameChoices.SCISSORS, amount: 0 },
  };

  const gamePlayed = false;

  const gameOutcome = GameOutcome.WON;

  const choices = {
    player: GameChoices.PAPER,
    computer: GameChoices.SCISSORS,
  };

  const wonChoice = GameChoices.PAPER;

  const objectToList = (object: object) => Object.entries(object);

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
        {gameOutcome === "WON" &&
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
          {objectToList(gameBets).map(([gameBet, value], index) => (
            <div className={`game-board_bets ${gameBet}`} key={index}>
              <p>{value.amount}</p>
              <h2>{value.title}</h2>
            </div>
          ))}
        </div>
        {gamePlayed ? (
          <button className="game-control">CLEAR</button>
        ) : (
          <button className="game-control">PLAY</button>
        )}
      </section>
    </main>
  );
}

export default App;
