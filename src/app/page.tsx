"use client";

import { CupContainer } from "../components/CupContainer/CupContainer";
import { Header } from "../components/Header";

const INITIAL_NUMBER_OF_CUPS = 3;

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <CupContainer numberOfCups={INITIAL_NUMBER_OF_CUPS} />
      </main>
    </>
  );
}
