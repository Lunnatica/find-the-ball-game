import { RuleSet } from "styled-components";

export type SwapAnimation = RuleSet<object>;
export type Animations = Record<number, SwapAnimation>;

export interface CupInterface {
  id: number;
}

export type GameState = "initial" | "shuffling" | "playing" | "win" | "lose";
