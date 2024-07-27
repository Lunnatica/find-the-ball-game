import { useEffect, useState } from "react";

import { CupContainer } from "../CupContainer/CupContainer";

export type GameState =
  | "initial"
  | "shuffling"
  | "finished_shuffling"
  | "win"
  | "lose";

const INITIAL_NUMBER_OF_CUPS = 3;

const chooseRandomCup = (numberOfCups: number): number =>
  Math.floor(Math.random() * numberOfCups);

const renderUserMessage = (gameState: GameState) => {
  switch (gameState) {
    case "win":
      return <p aria-live="polite">You win!</p>;
    case "lose":
      return <p aria-live="polite">You lose!</p>;
    case "shuffling":
      return <p aria-live="polite">Shuffling...</p>;
    default:
      return <p aria-live="polite">Guess where the ball is!</p>;
  }
};

export const GameArea: React.FC = () => {
  const [cupWithBall, setCupWithBall] = useState<number | undefined>();
  const [gameState, setGameState] = useState<GameState>("initial");

  const startGame = () => {
    setGameState("shuffling");
  };

  useEffect(() => {
    setCupWithBall(chooseRandomCup(INITIAL_NUMBER_OF_CUPS));
  }, []);

  return (
    <main data-testid="game-area">
      <CupContainer
        numberOfCups={INITIAL_NUMBER_OF_CUPS}
        gameState={gameState}
        setGameState={setGameState}
        cupWithBall={cupWithBall}
      />
      {["initial", "win", "lose"].includes(gameState) && (
        <button type="button" onClick={startGame}>
          Start game!
        </button>
      )}
      {renderUserMessage(gameState)}
    </main>
  );
};
