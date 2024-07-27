import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { CupInterface, GameState } from "../types/types";
import { chooseRandomCup } from "../lib/game-logic";

const GameContext = createContext({});

interface ProviderProps {
  children: ReactNode;
}

const INITIAL_NUMBER_OF_CUPS = 3;

const GameContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [cups, setCups] = useState<CupInterface[]>([]);
  const [cupWithBall, setCupWithBall] = useState<number | undefined>();
  const [gameState, setGameState] = useState<GameState>("initial");

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

  return (
    <GameContext.Provider value={{ gameState, setGameState, cups, setCups }}>
      {children}
    </GameContext.Provider>
  );
};

type UseGameContext = () => {
  gameState: GameState;
  setGameState: (gameState: GameState) => void;
  cups: CupInterface[];
  setCups: React.Dispatch<React.SetStateAction<CupInterface[]>>;
};

const useGameContext = (() => useContext(GameContext)) as UseGameContext;

export { GameContextProvider, useGameContext };
