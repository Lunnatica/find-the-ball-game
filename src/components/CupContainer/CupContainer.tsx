import { useEffect, useState } from "react";

import { GameState } from "../../components/GameArea/GameArea";
import { Cup } from "../Cup/Cup";

interface ContainerProps {
  numberOfCups: number;
  cupWithBall?: number;
  gameState: GameState;
  setGameState: (gameState: GameState) => void;
}

interface Cup {
  id: number;
  hasBall: boolean;
  isLifted: boolean;
}

export const CupContainer: React.FC<ContainerProps> = ({
  numberOfCups = 3,
  cupWithBall,
  gameState,
  setGameState,
}) => {
  const [cups, setCups] = useState<Cup[]>([]);

  useEffect(() => {
    let cups = [];
    for (let i = 0; i < numberOfCups; i++) {
      cups.push({
        id: i,
        hasBall: cupWithBall === i,
        isLifted:
          gameState === "initial" ||
          gameState === "win" ||
          gameState === "lose",
      });
    }
    setCups(cups);
  }, [cupWithBall, gameState, numberOfCups]);

  return (
    <div data-testid="cup-container">
      {cups.map(({ id, hasBall, isLifted }) => (
        <div key={id} data-testid="cup">
          <Cup hasBall={hasBall} isLifted={isLifted} />
        </div>
      ))}
    </div>
  );
};
