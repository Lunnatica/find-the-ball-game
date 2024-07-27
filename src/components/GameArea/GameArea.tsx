import { useEffect, useState } from "react";

import { chooseRandomCup, exchangeTwoCups } from "../../lib/game-logic";
import { CupContainer } from "../CupContainer/CupContainer";
import { CupInterface } from "../../types/types";

export type GameState =
  | "initial"
  | "shuffling"
  | "finished_shuffling"
  | "win"
  | "lose";

const INITIAL_NUMBER_OF_CUPS = 3;
export const NUMBER_OF_SHUFFLES = 4;

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
  const [cups, setCups] = useState<CupInterface[]>([]);

  useEffect(() => {
    if (gameState === "initial") {
      setCupWithBall(chooseRandomCup(INITIAL_NUMBER_OF_CUPS));
    }

    let generatedCups = [];
    for (let i = 0; i < INITIAL_NUMBER_OF_CUPS; i++) {
      generatedCups.push({
        id: i,
        hasBall: cupWithBall === i,
        isLifted:
          gameState === "initial" ||
          gameState === "win" ||
          gameState === "lose",
      });
    }
    setCups(generatedCups);
  }, [cupWithBall, gameState]);

  const startGame = () => {
    setGameState("shuffling");
  };

  useEffect(() => {
    if (gameState === "shuffling") {
      const interval = setInterval(() => {
        setCups((cups) => exchangeTwoCups(cups));
      }, 1000);

      const timeout = setTimeout(() => {
        clearInterval(interval);
        setGameState("finished_shuffling");
      }, NUMBER_OF_SHUFFLES * 1000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [gameState]);

  return (
    <main data-testid="game-area">
      <CupContainer cups={cups} />
      {["initial", "win", "lose"].includes(gameState) && (
        <button type="button" onClick={startGame}>
          Start game!
        </button>
      )}
      {renderUserMessage(gameState)}
    </main>
  );
};
