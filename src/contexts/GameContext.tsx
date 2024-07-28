import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { CupInterface, GameState } from "../types/types";
import { chooseRandomCup, exchangeTwoCups } from "../lib/game-logic";
import { css, keyframes } from "styled-components";

type GameContext = {
  gameState: GameState;
  cups: CupInterface[];
  cupWithBall: number | undefined;
  startGame: () => void;
  endGame: (chosenCup: number) => void;
  animations: Record<string, string>;
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

const swapAnimation = (
  startX: number,
  startY: number,
  endX: number,
  endY: number
) => keyframes`
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(${(endX - startX) / 2}px, ${
  (endY - startY) / 2
}px) scale(1.2);
  }
  100% {
    transform: translate(${endX - startX}px, ${endY - startY}px);
  }
`;

interface ProviderProps {
  children: ReactNode;
}

const INITIAL_NUMBER_OF_CUPS = 3;
export const NUMBER_OF_SHUFFLES = 4;

const GameContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [cups, setCups] = useState<CupInterface[]>([]);
  const [cupWithBall, setCupWithBall] = useState<number | undefined>();
  const [gameState, setGameState] = useState<GameState>("initial");
  const [animations, setAnimations] = useState({});

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
    // if (gameState === "shuffling") {
    //   const interval = setInterval(() => {
    //     setCups((cups) => exchangeTwoCups(cups));
    //   }, 1000);

    //   const timeout = setTimeout(() => {
    //     clearInterval(interval);
    //     setGameState("playing");
    //   }, NUMBER_OF_SHUFFLES * 1000);

    //   return () => {
    //     clearInterval(interval);
    //     clearTimeout(timeout);
    //   };
    // }
    const swapCups = () => {
      const index1 = Math.floor(Math.random() * cups.length);
      let index2 = Math.floor(Math.random() * cups.length);
      while (index1 === index2) {
        index2 = Math.floor(Math.random() * cups.length);
      }

      const newCups = [...cups];
      const temp = newCups[index1];
      newCups[index1] = newCups[index2];
      newCups[index2] = temp;

      const startX1 = index1 * 70;
      const endX1 = index2 * 70;
      const startX2 = index2 * 70;
      const endX2 = index1 * 70;

      const animation1 = css`
        ${swapAnimation(startX1, 0, endX1, 0)}
      `;
      const animation2 = css`
        ${swapAnimation(startX2, 0, endX2, 0)}
      `;

      setAnimations({
        [index1]: animation1,
        [index2]: animation2,
      });

      let startTime: number | null = null;
      const duration = 900; // duration of animation in ms

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        if (progress < duration) {
          requestAnimationFrame(animate);
        } else {
          setCups(newCups);
          setAnimations({});
        }
      };

      requestAnimationFrame(animate);
    };

    if (gameState === "shuffling") {
      let shuffles = NUMBER_OF_SHUFFLES;
      const shuffleInterval = () => {
        if (shuffles > 0) {
          swapCups();
          shuffles -= 1;
          setTimeout(shuffleInterval, 1000);
        } else {
          setGameState("playing");
        }
      };
      shuffleInterval();
    }
  }, [cupWithBall, gameState]);

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
