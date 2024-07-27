import { useEffect, useState } from "react";

import { chooseRandomCup, exchangeTwoCups } from "../../lib/game-logic";
import { GameState } from "../../types/types";
import { CupContainer } from "../CupContainer/CupContainer";
import { useGameContext } from "../../contexts/GameContext";

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
  const { gameState, setGameState, cups, setCups } = useGameContext();

  const startGame = () => {
    setGameState("shuffling");
  };

  useEffect(() => {
    // TODO: use requestAnimationFrame instead of setInterval
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
  }, [gameState, setCups, setGameState]);

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
