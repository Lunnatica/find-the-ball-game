import React from "react";

import { useGameContext } from "../../contexts/GameContext";
import { CupInterface } from "../../types/types";
import { StyledBall, StyledCup } from "./StyledCup";

export const Cup: React.FC<CupInterface> = ({ id, $animate, $animation }) => {
  const { gameState, cupWithBall, endGame } = useGameContext();

  const isLifted =
    gameState === "initial" || gameState === "win" || gameState === "lose";

  const hasBall = id === cupWithBall;

  return (
    <div>
      <StyledCup
        type="button"
        data-testid={`cup-${id}`}
        onClick={() => endGame(id)}
        disabled={gameState !== "playing"}
        $animate={$animate}
        $animation={$animation}
        $isLifted={isLifted}
      >
        Cup {id}
      </StyledCup>
      {hasBall && isLifted && <StyledBall data-testid="ball" />}
    </div>
  );
};
