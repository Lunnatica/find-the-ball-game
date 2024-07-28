import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { css, RuleSet } from "styled-components";

import {
  chooseRandomCup,
  getIndicesToSwap,
  swapAnimation,
} from "../lib/game-logic";
import { CupInterface, GameState } from "../types/types";

type GameContext = {
  gameState: GameState;
  cups: CupInterface[];
  cupWithBall: number | undefined;
  startGame: () => void;
  endGame: (chosenCup: number) => void;
  animations: Record<string, RuleSet<object>>;
};

export const initialContext: GameContext = {
  gameState: "initial",
  cups: [],
  cupWithBall: undefined,
  startGame: () => {},
  endGame: () => {},
  animations: {},
};

export const GameContext = createContext<GameContext>(initialContext);

interface ProviderProps {
  children: ReactNode;
}

const INITIAL_NUMBER_OF_CUPS = 3;
const NUMBER_OF_SHUFFLES = 4;
const SHUFFLE_INTERVAL = 1500;
const INITIAL_DELAY = 500;

const GameContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [cups, setCups] = useState<CupInterface[]>([]);
  const [cupWithBall, setCupWithBall] = useState<number | undefined>();
  const [gameState, setGameState] = useState<GameState>("initial");
  const [animations, setAnimations] = useState<Record<string, RuleSet<object>>>(
    {}
  );

  const setInitialGame = () => {
    setCupWithBall(chooseRandomCup(INITIAL_NUMBER_OF_CUPS));
    setCups(
      Array.from({ length: INITIAL_NUMBER_OF_CUPS }, (_, i) => ({
        id: i,
      }))
    );
  };

  const startGame = () => {
    setGameState("shuffling");
  };

  const endGame = (chosenCup: number) => {
    setGameState(chosenCup === cupWithBall ? "win" : "lose");
  };

  const swapCups = () => {
    setCups((prevCups) => {
      const [index1, index2] = getIndicesToSwap(prevCups);
      const newCups = [...prevCups];

      const temp = newCups[index1];
      newCups[index1] = newCups[index2];
      newCups[index2] = temp;

      setAnimations({
        [index1]: css`
          ${swapAnimation(index1 * 70, 0, index2 * 70, 0)}
        `,
        [index2]: css`
          ${swapAnimation(index2 * 70, 0, index1 * 70, 0)}
        `,
      });

      return newCups;
    });
  };

  useEffect(() => {
    if (gameState === "initial") {
      setInitialGame();
    }

    if (gameState === "shuffling") {
      const interval = setInterval(swapCups, 1000);

      const timeout = setTimeout(() => {
        clearInterval(interval);
        setAnimations({});
        setGameState("playing");
      }, NUMBER_OF_SHUFFLES * 1000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [gameState]);

  return (
    <GameContext.Provider
      value={{ gameState, cups, cupWithBall, startGame, endGame, animations }}
    >
      {children}
    </GameContext.Provider>
  );
};

const useGameContext = () => useContext(GameContext);

export { GameContextProvider, useGameContext };
