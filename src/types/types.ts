export interface CupInterface {
  id: number;
  hasBall: boolean;
  isLifted: boolean;
}

export type GameState =
  | "initial"
  | "shuffling"
  | "finished_shuffling"
  | "win"
  | "lose";
