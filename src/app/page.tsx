"use client";

import { useState } from "react";
import { CupContainer } from "../components/CupContainer/CupContainer";
import { Header } from "../components/Header";

export type GameState =
  | "initial"
  | "shuffling"
  | "finished_shuffling"
  | "win"
  | "lose";

const INITIAL_NUMBER_OF_CUPS = 3;

export default function Home() {
  const [gameState, setGameState] = useState<GameState>("initial");
  const [cupWithBall, setCupWithBall] = useState(
    Math.floor(Math.random() * INITIAL_NUMBER_OF_CUPS)
  );

  return (
    <>
      <Header />
      <main>
        <CupContainer
          numberOfCups={INITIAL_NUMBER_OF_CUPS}
          gameState={gameState}
          setGameState={setGameState}
          cupWithBall={cupWithBall}
        />
      </main>
    </>
  );
}
