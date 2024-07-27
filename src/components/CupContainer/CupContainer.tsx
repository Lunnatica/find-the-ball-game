import { CupInterface } from "../../types/types";
import { Cup } from "../Cup/Cup";

interface ContainerProps {
  cups: CupInterface[];
}

export const CupContainer: React.FC<ContainerProps> = ({ cups }) => {
  return (
    <div data-testid="cup-container">
      {cups.map(({ id, hasBall, isLifted }) => (
        <div key={id} data-testid="cup">
          <Cup id={id} hasBall={hasBall} isLifted={isLifted} />
        </div>
      ))}
    </div>
  );
};
