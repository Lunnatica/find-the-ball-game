import React from "react";

import { useGameContext } from "../../contexts/GameContext";
import { SwapAnimation } from "../../types/types";
import { StyledBall, StyledCup } from "./StyledCup";

interface CupProps {
  id: number;
  $animation: SwapAnimation;
}

export const Cup: React.FC<CupProps> = ({ id, $animation }) => {
  const { gameState, cupWithBall, endGame } = useGameContext();

  const isLifted =
    gameState === "initial" || gameState === "win" || gameState === "lose";

  const hasBall = id === cupWithBall;

  return (
    <div data-testid={`cup-container-for-${id}`}>
      <StyledCup
        type="button"
        data-testid={`cup-${id}`}
        onClick={() => endGame(id)}
        disabled={gameState !== "playing"}
        $animate={!!$animation}
        $animation={$animation}
        $isLifted={isLifted}
      />
      {hasBall && isLifted && <StyledBall data-testid="ball" />}
    </div>
  );
};
