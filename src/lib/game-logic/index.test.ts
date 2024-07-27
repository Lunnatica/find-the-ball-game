import { chooseRandomCup } from "./";

describe("game-logic", () => {
  describe("chooseRandomCup", () => {
    it("should return a number between 0 and the number passed", () => {
      const result = chooseRandomCup(3);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(2);
    });
  });
});
