import React from "react";

import { CupInterface } from "../../types/types";

export const Cup: React.FC<CupInterface> = ({ id, hasBall, isLifted }) => {
  return (
    <div>
      <button type="button" data-testid={`cup-${id}`}>
        Cup {id}
      </button>
      {hasBall && isLifted && <div data-testid="ball">Ball</div>}
    </div>
  );
};
