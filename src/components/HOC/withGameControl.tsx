import React from "react";

interface GameControlProps {
  control: "CLEAR" | "PLAY";
}

const GameControlButton: React.FC<GameControlProps> = ({ control }) => (
  <button className="game-control">{control}</button>
);

const withGameControl = (
  WrappedComponent: React.FC<GameControlProps>,
  control: "CLEAR" | "PLAY"
) => {
  return (props: Omit<GameControlProps, "control">) => (
    <WrappedComponent {...props} control={control} />
  );
};

export const ClearGameControlButton = withGameControl(
  GameControlButton,
  "CLEAR"
);

export const PlayGameControlButton = withGameControl(GameControlButton, "PLAY");
