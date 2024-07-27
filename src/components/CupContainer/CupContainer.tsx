import { GameState } from "../../components/GameArea/GameArea";
import { Cup } from "../Cup/Cup";

interface ContainerProps {
  numberOfCups: number;
  cupWithBall?: number;
  gameState: GameState;
  setGameState: (gameState: GameState) => void;
}

export const CupContainer: React.FC<ContainerProps> = ({
  numberOfCups = 3,
  cupWithBall,
  gameState,
  setGameState,
}) => {
  return (
    <div data-testid="cup-container">
      {Array.from({ length: numberOfCups }).map((_, index) => (
        <div key={index} data-testid="cup">
          <Cup
            hasBall={cupWithBall === index}
            isLifted={
              gameState === "initial" ||
              gameState === "win" ||
              gameState === "lose"
            }
          />
        </div>
      ))}
    </div>
  );
};
