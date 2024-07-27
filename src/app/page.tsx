"use client";

import { Header } from "../components/Header";
import { GameArea } from "../components/GameArea/GameArea";
import { GameContextProvider } from "../contexts/GameContext";

export default function Home() {
  return (
    <>
      <Header />
      <GameContextProvider>
        <GameArea />
      </GameContextProvider>
    </>
  );
}
