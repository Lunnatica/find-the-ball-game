import { css, keyframes, RuleSet } from "styled-components";

import { CupInterface } from "../../types/types";

export const chooseRandomCup = (numberOfCups: number) => {
  return Math.floor(Math.random() * numberOfCups);
};

export const swapAnimation = (
  startX: number,
  startY: number,
  endX: number,
  endY: number
) => keyframes`
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(${(endX - startX) / 2}px, ${
  (endY - startY) / 2
}px) scale(1.2);
  }
  100% {
    transform: translate(${endX - startX}px, ${endY - startY}px);
  }
`;

export const getIndicesToSwap = (cupsLength: number): [number, number] => {
  const randomIndex1 = Math.floor(Math.random() * cupsLength);
  let randomIndex2 = Math.floor(Math.random() * cupsLength);

  const maxAttempts = 10;
  let attempts = 0;
  while (randomIndex2 === randomIndex1 && attempts < maxAttempts) {
    randomIndex2 = Math.floor(Math.random() * cupsLength);
  }

  return [randomIndex1, randomIndex2];
};
