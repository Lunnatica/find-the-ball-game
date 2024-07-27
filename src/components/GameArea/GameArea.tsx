import { useState } from "react";
import { CupContainer } from "../CupContainer/CupContainer";

export type GameState =
  | "initial"
  | "shuffling"
  | "finished_shuffling"
  | "win"
  | "lose";

const INITIAL_NUMBER_OF_CUPS = 3;

export const GameArea: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>("initial");
  const [cupWithBall, setCupWithBall] = useState(
    Math.floor(Math.random() * INITIAL_NUMBER_OF_CUPS)
  );

  return (
    <main data-testid="game-area">
      <CupContainer
        numberOfCups={INITIAL_NUMBER_OF_CUPS}
        gameState={gameState}
        setGameState={setGameState}
        cupWithBall={cupWithBall}
      />
    </main>
  );
};
