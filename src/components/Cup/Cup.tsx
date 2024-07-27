import React from "react";

import { useGameContext } from "../../contexts/GameContext";
import { CupInterface } from "../../types/types";

export const Cup: React.FC<CupInterface> = ({ id, hasBall, isLifted }) => {
  const { gameState, endGame } = useGameContext();

  return (
    <div>
      <button
        type="button"
        data-testid={`cup-${id}`}
        onClick={() => endGame(id)}
        disabled={gameState !== "playing"}
      >
        Cup {id}
      </button>
      {hasBall && isLifted && <div data-testid="ball">Ball</div>}
    </div>
  );
};
