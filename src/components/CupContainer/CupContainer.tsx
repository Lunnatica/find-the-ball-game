import { useGameContext } from "../../contexts/GameContext";
import { Cup } from "../Cup/Cup";
import { StyledCupContainer, StyledCupLoader } from "./StyledCupContainer";

const CupLoader: React.FC = () => (
  <StyledCupLoader>Loading game...</StyledCupLoader>
);

export const CupContainer: React.FC = () => {
  const { cups, animations } = useGameContext();

  return (
    <StyledCupContainer data-testid="cup-container">
      {cups.length ? (
        cups.map(({ id }, index) => (
          <Cup id={id} key={id} $animation={animations[index]} />
        ))
      ) : (
        <CupLoader />
      )}
    </StyledCupContainer>
  );
};
