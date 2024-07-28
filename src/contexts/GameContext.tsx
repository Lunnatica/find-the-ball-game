import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { RuleSet } from "styled-components";
import { chooseRandomCup, exchangeTwoCups } from "../lib/game-logic";
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
      let shuffles = NUMBER_OF_SHUFFLES;
      const shuffleInterval = () => {
        if (shuffles > 0) {
          setCups((prevCups) => exchangeTwoCups(prevCups, setAnimations));
          shuffles -= 1;
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
