import React from "react";

interface CupProps {
  hasBall?: boolean;
  isLifted?: boolean;
}

export const Cup: React.FC<CupProps> = ({
  hasBall = false,
  isLifted = false,
}) => {
  return (
    <div>
      <h1>Cup</h1>
      {hasBall && isLifted && <div data-testid="ball">Ball</div>}
    </div>
  );
};
