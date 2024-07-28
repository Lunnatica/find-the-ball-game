import { useGameContext } from "../../contexts/GameContext";
import { Cup } from "../Cup/Cup";
import { StyledCupContainer } from "./StyledCupContainer";

export const CupContainer: React.FC = () => {
  const { cups, animations } = useGameContext();

  return (
    <StyledCupContainer data-testid="cup-container">
      {cups.map(({ id }, index) => (
        <div key={id} data-testid="cup">
          <Cup id={id} $animation={animations[index]} />
        </div>
      ))}
    </StyledCupContainer>
  );
};
