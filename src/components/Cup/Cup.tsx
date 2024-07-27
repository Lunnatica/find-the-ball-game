import React from "react";

import { useGameContext } from "../../contexts/GameContext";
import { CupInterface } from "../../types/types";
import { StyledBall, StyledCup } from "./StyledCup";

export const Cup: React.FC<CupInterface> = ({ id, hasBall, isLifted }) => {
  const { gameState, endGame } = useGameContext();

  return (
    <div>
      <StyledCup
        type="button"
        data-testid={`cup-${id}`}
        onClick={() => endGame(id)}
        disabled={gameState !== "playing"}
      />
      {hasBall && isLifted && <StyledBall data-testid="ball" />}
    </div>
  );
};
