import { INITIAL_NUMBER_OF_CUPS } from "../../contexts/GameContext";
import { chooseRandomCup, getIndicesToSwap } from "./";

describe("game-logic", () => {
  describe("chooseRandomCup", () => {
    it("should return a number between 0 and the number passed", () => {
      const result = chooseRandomCup(3);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(2);
    });
  });

  describe("getIndicesToSwap", () => {
    it("should return two different indices", () => {
      const result = getIndicesToSwap(INITIAL_NUMBER_OF_CUPS);
      expect(result.length).toBe(2);
      expect(result[0]).not.toBe(result[1]);
    });
  });
});
