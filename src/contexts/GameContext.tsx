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
  const [cupToBeSwapped1, setCupToBeSwapped1] = useState<number | undefined>();
  const [cupToBeSwapped2, setCupToBeSwapped2] = useState<number | undefined>();

  const startGame = () => {
    setGameState("shuffling");
  };

  const endGame = (chosenCup: number) => {
    setGameState(chosenCup === cupWithBall ? "win" : "lose");
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

    if (gameState === "shuffling") {
      let shuffles = 0;
      const shuffleInterval = () => {
        if (shuffles <= NUMBER_OF_SHUFFLES) {
          setCups((prevCups) => {
            const [index1, index2] = getIndicesToSwap(prevCups);
            const newCups = [...prevCups];
            setCupToBeSwapped1(index1);
            setCupToBeSwapped2(index2);

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

            const duration = 900; // ms
            requestAnimationFrame((timestamp) => {
              const startTime = timestamp;
              const animate = (currentTime: number) => {
                if (currentTime - startTime < duration) {
                  requestAnimationFrame(animate);
                } else {
                  setAnimations({});
                }
              };
              requestAnimationFrame(animate);
            });

            return newCups;
          });

          shuffles++;
          setTimeout(shuffleInterval, SHUFFLE_INTERVAL);
        } else {
          setGameState("playing");
        }
      };
      setTimeout(shuffleInterval, INITIAL_DELAY);
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
