import { useGameContext } from "../../contexts/GameContext";
import { CupInterface } from "../../types/types";
import { Cup } from "../Cup/Cup";
import { StyledCupContainer } from "./StyledCupContainer";

export const CupContainer: React.FC = () => {
  const { cups, animations } = useGameContext();

  return (
    <StyledCupContainer data-testid="cup-container">
      {cups.map(({ id }, index) => (
        <div key={id} data-testid="cup">
          <Cup
            id={id}
            $animate={!!animations[index]}
            $animation={animations[index]}
          />
        </div>
      ))}
    </StyledCupContainer>
  );
};
