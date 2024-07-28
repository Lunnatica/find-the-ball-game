import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { CupInterface, GameState } from "../types/types";
import { chooseRandomCup, exchangeTwoCups } from "../lib/game-logic";

type GameContext = {
  gameState: GameState;
  cups: CupInterface[];
  cupWithBall: number | undefined;
  startGame: () => void;
  endGame: (chosenCup: number) => void;
};

export const initialContext: GameContext = {
  gameState: "initial",
  cups: [],
  cupWithBall: undefined,
  startGame: () => {},
  endGame: () => {},
};

export const GameContext = createContext<GameContext>(initialContext);

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

  const endGame = (chosenCup: number) => {
    if (chosenCup === cupWithBall) {
      setGameState("win");
    } else {
      setGameState("lose");
    }
  };

  useEffect(() => {
    if (gameState === "initial") {
      setCupWithBall(chooseRandomCup(INITIAL_NUMBER_OF_CUPS));

      let generatedCups = [];
      for (let i = 0; i < INITIAL_NUMBER_OF_CUPS; i++) {
        generatedCups.push({
          id: i,
        });
      }
      setCups(generatedCups);
    }

    // TODO: use requestAnimationFrame instead of setInterval
    if (gameState === "shuffling") {
      const interval = setInterval(() => {
        setCups((cups) => exchangeTwoCups(cups));
      }, 1000);

      const timeout = setTimeout(() => {
        clearInterval(interval);
        setGameState("playing");
      }, NUMBER_OF_SHUFFLES * 1000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [cupWithBall, gameState]);

  return (
    <GameContext.Provider
      value={{ gameState, cups, cupWithBall, startGame, endGame }}
    >
      {children}
    </GameContext.Provider>
  );
};

const useGameContext = () => useContext(GameContext);

export { GameContextProvider, useGameContext };
