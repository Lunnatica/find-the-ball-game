import { css, keyframes, RuleSet } from "styled-components";

import { CupInterface } from "../../types/types";

export const chooseRandomCup = (numberOfCups: number) => {
  return Math.floor(Math.random() * numberOfCups);
};

const swapAnimation = (
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

export const exchangeTwoCups = (
  initialCups: CupInterface[],
  setAnimations: (animations: Record<string, RuleSet<object>>) => void
) => {
  const cups = [...initialCups];
  if (cups.length < 2) {
    return cups;
  }

  const randomIndex1 = Math.floor(Math.random() * cups.length);
  let randomIndex2 = Math.floor(Math.random() * cups.length);

  const maxAttempts = 10;
  let attempts = 0;
  while (randomIndex2 === randomIndex1 && attempts < maxAttempts) {
    randomIndex2 = Math.floor(Math.random() * cups.length);
  }

  const temp = cups[randomIndex1];
  cups[randomIndex1] = cups[randomIndex2];
  cups[randomIndex2] = temp;

  const startX1 = randomIndex1 * 70;
  const endX1 = randomIndex2 * 70;
  const startX2 = randomIndex2 * 70;
  const endX2 = randomIndex1 * 70;

  const animation1 = css`
    ${swapAnimation(startX1, 0, endX1, 0)}
  `;
  const animation2 = css`
    ${swapAnimation(startX2, 0, endX2, 0)}
  `;

  setAnimations({
    [randomIndex1]: animation1,
    [randomIndex2]: animation2,
  });

  let startTime: number | null = null;
  const duration = 900; // duration of animation in ms

  const animate = (timestamp: number) => {
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;
    if (progress < duration) {
      requestAnimationFrame(animate);
    } else {
      setAnimations({});
    }
  };

  requestAnimationFrame(animate);

  return cups;
};
