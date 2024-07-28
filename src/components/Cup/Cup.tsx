import React, { useEffect } from "react";

import { useSpring } from "@react-spring/web";

import { useGameContext } from "../../contexts/GameContext";
import { CupInterface } from "../../types/types";
import { StyledBall, StyledCup } from "./StyledCup";

const LIFTED_Y = 100;

export const Cup: React.FC<CupInterface> = ({ id, $animate, $animation }) => {
  const { gameState, cupWithBall, endGame } = useGameContext();
  const [springs, api] = useSpring(() => ({
    from: { x: 0, y: LIFTED_Y },
  }));

  const isLifted =
    gameState === "initial" || gameState === "win" || gameState === "lose";

  const hasBall = id === cupWithBall;

  useEffect(() => {
    const from = isLifted ? { y: LIFTED_Y } : { y: 0 };
    const to = isLifted ? { y: 0 } : { y: LIFTED_Y };

    api.start({
      from,
      to,
    });
  }, [isLifted, api]);

  return (
    <div>
      <StyledCup
        // TODO: pass the springs object to the style component
        style={{
          ...springs,
        }}
        type="button"
        data-testid={`cup-${id}`}
        onClick={() => endGame(id)}
        disabled={gameState !== "playing"}
        $animate={$animate}
        $animation={$animation}
      >
        Cup {id}
      </StyledCup>
      {hasBall && isLifted && <StyledBall data-testid="ball" />}
    </div>
  );
};
