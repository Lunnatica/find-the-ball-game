import { useGameContext } from "../../contexts/GameContext";
import { GameState } from "../../types/types";
import { CupContainer } from "../CupContainer/CupContainer";
import {
  StyledGameArea,
  StyledStartButton,
  StyledUserMessage,
} from "./StyledGameArea";

const renderUserMessage = (gameState: GameState) => {
  switch (gameState) {
    case "win":
      return (
        <StyledUserMessage aria-live="polite">You win! 🎉</StyledUserMessage>
      );
    case "lose":
      return (
        <StyledUserMessage aria-live="polite">You lose! 🥺</StyledUserMessage>
      );
    case "shuffling":
      return (
        <StyledUserMessage aria-live="polite">Shuffling...</StyledUserMessage>
      );
    case "playing":
      return (
        <StyledUserMessage aria-live="polite">
          Choose your bet!
        </StyledUserMessage>
      );
    default:
      return (
        <StyledUserMessage aria-live="polite">
          Guess where the ball is!
        </StyledUserMessage>
      );
  }
};

export const GameArea: React.FC = () => {
  const { gameState, startGame } = useGameContext();

  return (
    <StyledGameArea data-testid="game-area">
      <CupContainer />
      {renderUserMessage(gameState)}
      {["initial", "win", "lose"].includes(gameState) && (
        <StyledStartButton type="button" onClick={startGame}>
          Start game!
        </StyledStartButton>
      )}
    </StyledGameArea>
  );
};
