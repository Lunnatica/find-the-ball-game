export interface CupInterface {
  id: number;
  $animate?: boolean;
  $animation?: string;
}

export type GameState = "initial" | "shuffling" | "playing" | "win" | "lose";
