import { CupInterface } from "../../types/types";
import { Cup } from "../Cup/Cup";
import { StyledCupContainer } from "./StyledCupContainer";

interface ContainerProps {
  cups: CupInterface[];
}

export const CupContainer: React.FC<ContainerProps> = ({ cups }) => {
  return (
    <StyledCupContainer data-testid="cup-container">
      {cups.map(({ id }) => (
        <div key={id} data-testid="cup">
          <Cup id={id} />
        </div>
      ))}
    </StyledCupContainer>
  );
};
