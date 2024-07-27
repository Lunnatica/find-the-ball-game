import { chooseRandomCup, exchangeTwoCups } from "./";

describe("game-logic", () => {
  describe("chooseRandomCup", () => {
    it("should return a number between 0 and the number passed", () => {
      const result = chooseRandomCup(3);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(2);
    });
  });

  describe("exchangeTwoCups", () => {
    it("should return the same array if it has less than 2 elements", () => {
      const cups = [{ id: 1, hasBall: false, isLifted: false }];
      const result = exchangeTwoCups(cups);
      expect(result).toEqual(cups);
    });

    it("should exchange two cups at random", () => {
      const cups = [
        { id: 1, hasBall: false, isLifted: false },
        { id: 2, hasBall: true, isLifted: false },
      ];
      const result = exchangeTwoCups(cups);
      expect(result).not.toEqual(cups);
      expect(result[0]).toEqual(cups[1]);
    });
  });
});
