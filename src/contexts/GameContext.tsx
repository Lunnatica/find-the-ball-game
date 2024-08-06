import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { css } from "styled-components";

import {
  chooseRandomCup,
  getIndicesToSwap,
  swapAnimation,
} from "../lib/game-logic";
import { Animations, CupInterface, GameState } from "../types/types";

export type GameContext = {
  gameState: GameState;
  cups: CupInterface[];
  cupWithBall: number | undefined;
  startGame: () => void;
  endGame: (chosenCup: number) => void;
  animations: Animations;
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

/** Game Settings */
export const INITIAL_NUMBER_OF_CUPS = 3; // Update this number to add more cups
export const NUMBER_OF_SHUFFLES = 6; // Update this number to increase the number of shuffles
export const SHUFFLE_INTERVAL_DURATION = 500; // Update this number to change the shuffle speed
/** End of game settings */

const CUP_WIDTH = 100 + 48; // 100px width + 48px gap

const GameContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [cups, setCups] = useState<CupInterface[]>([]);
  const [cupWithBall, setCupWithBall] = useState<number | undefined>();
  const [gameState, setGameState] = useState<GameState>("initial");
  const [animations, setAnimations] = useState<Animations>({});

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
    const [index1, index2] = getIndicesToSwap(INITIAL_NUMBER_OF_CUPS);
    setAnimations({
      [index1]: css`
        ${swapAnimation(index1 * CUP_WIDTH, index2 * CUP_WIDTH)}
      `,
      [index2]: css`
        ${swapAnimation(index2 * CUP_WIDTH, index1 * CUP_WIDTH)}
      `,
    });

    setCups((prevCups) => {
      const newCups = [...prevCups];

      const temp = newCups[index1];
      newCups[index1] = newCups[index2];
      newCups[index2] = temp;

      return newCups;
    });
  };

  useEffect(() => {
    if (gameState === "initial") {
      setInitialGame();
    }

    if (gameState === "shuffling") {
      const interval = setInterval(swapCups, SHUFFLE_INTERVAL_DURATION);

      let finalShuffleTimeout: NodeJS.Timeout;
      const timeout = setTimeout(() => {
        clearInterval(interval);
        finalShuffleTimeout = setTimeout(() => {
          setAnimations({});
          setGameState("playing");
        }, SHUFFLE_INTERVAL_DURATION);
      }, NUMBER_OF_SHUFFLES * SHUFFLE_INTERVAL_DURATION);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
        clearTimeout(finalShuffleTimeout);
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
