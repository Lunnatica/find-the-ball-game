import { useGameContext } from "../../contexts/GameContext";
import { GameState } from "../../types/types";
import { CupContainer } from "../CupContainer/CupContainer";

const renderUserMessage = (gameState: GameState) => {
  switch (gameState) {
    case "win":
      return <p aria-live="polite">You win!</p>;
    case "lose":
      return <p aria-live="polite">You lose!</p>;
    case "shuffling":
      return <p aria-live="polite">Shuffling...</p>;
    default:
      return <p aria-live="polite">Guess where the treasure is!</p>;
  }
};

export const GameArea: React.FC = () => {
  const { gameState, cups, startGame } = useGameContext();

  return (
    <main data-testid="game-area">
      <CupContainer cups={cups} />
      {["initial", "win", "lose"].includes(gameState) && (
        <button type="button" onClick={startGame}>
          Start game!
        </button>
      )}
      {renderUserMessage(gameState)}
    </main>
  );
};
