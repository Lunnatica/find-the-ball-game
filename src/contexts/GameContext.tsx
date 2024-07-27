import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { CupInterface, GameState } from "../types/types";
import { chooseRandomCup, exchangeTwoCups } from "../lib/game-logic";

const GameContext = createContext({});

interface ProviderProps {
  children: ReactNode;
}

const INITIAL_NUMBER_OF_CUPS = 3;
export const NUMBER_OF_SHUFFLES = 4;

const GameContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [cups, setCups] = useState<CupInterface[]>([]);
  const [cupWithBall, setCupWithBall] = useState<number | undefined>();
  const [gameState, setGameState] = useState<GameState>("initial");

  const startGame = () => {
    setGameState("shuffling");
  };

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
    <GameContext.Provider value={{ gameState, cups, startGame }}>
      {children}
    </GameContext.Provider>
  );
};

type UseGameContext = () => {
  gameState: GameState;
  setGameState: (gameState: GameState) => void;
  cups: CupInterface[];
  setCups: React.Dispatch<React.SetStateAction<CupInterface[]>>;
  startGame: () => void;
};

const useGameContext = (() => useContext(GameContext)) as UseGameContext;

export { GameContextProvider, useGameContext };
