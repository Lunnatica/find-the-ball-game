import { CupInterface } from "../../types/types";

export const chooseRandomCup = (numberOfCups: number) => {
  return Math.floor(Math.random() * numberOfCups);
};

export const exchangeTwoCups = (initialCups: CupInterface[]) => {
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

  return cups;
};
