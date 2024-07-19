/**
 * OutcomeProps won choice represent the outcome that won
 * but NB the outcome of both player and computer may result
 * in draw in this both choice won!
 */

interface OutcomeProps {
  wonChoice: string;
}

const WonOutcome: React.FC<OutcomeProps> = ({ wonChoice }) => (
  <div className="player-won">
    <p>{wonChoice.toLocaleUpperCase()} WON</p>
    <p>
      YOU WIN <span>5000</span>
    </p>
  </div>
);

const LostOutcome: React.FC<OutcomeProps> = ({ wonChoice }) => (
  <div className="player-won">
    <p>{wonChoice.toLocaleUpperCase()} WON</p>
    <p>YOU LOST</p>
  </div>
);

const DrawOutcome: React.FC<OutcomeProps> = ({ wonChoice }) => (
  <div className="player-won">
    <p>{wonChoice.toLocaleUpperCase()} DRAW</p>
    <p>
      YOU GET <span>5000</span>
    </p>
  </div>
);

type OutcomeType = "WON" | "LOST" | "DRAW";

const GameOutcomeFactory = {
  createGameOutcomeComponent(
    outcome: OutcomeType,
    wonChoice: string
  ): React.ReactElement {
    switch (outcome) {
      case "WON":
        return <WonOutcome wonChoice={wonChoice} />;
      case "LOST":
        return <LostOutcome wonChoice={wonChoice} />;
      case "DRAW":
        return <DrawOutcome wonChoice={wonChoice} />;
      default:
        throw new Error("Invalid outcome type");
    }
  },
};

export default GameOutcomeFactory;
