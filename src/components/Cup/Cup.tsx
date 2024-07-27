import React from "react";

import { CupInterface } from "../../types/types";

export const Cup: React.FC<CupInterface> = ({
  id,
  hasBall = false,
  isLifted = false,
}) => {
  return (
    <div>
      <div data-testid={`cup-${id}`}>Cup {id}</div>
      {hasBall && isLifted && <div data-testid="ball">Ball</div>}
    </div>
  );
};
