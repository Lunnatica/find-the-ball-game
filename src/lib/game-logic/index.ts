import { keyframes } from "styled-components";

export const chooseRandomCup = (numberOfCups: number) => {
  return Math.floor(Math.random() * numberOfCups);
};

export const swapAnimation = (startX: number, endX: number) => keyframes`
  0% {
    transform: translateX(0, 0);
  }
  50% {
    transform: translateX(${(endX - startX) / 2}px);
  }
  100% {
    transform: translateX(${endX - startX}px);
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
