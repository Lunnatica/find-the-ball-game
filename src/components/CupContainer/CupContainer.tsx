import { Cup } from "../Cup/Cup";

interface ContainerProps {
  numberOfCups: number;
}

export const CupContainer: React.FC<ContainerProps> = ({
  numberOfCups = 3,
}) => {
  return (
    <div data-testid="cup-container">
      {Array.from({ length: numberOfCups }).map((_, index) => (
        <div key={index} data-testid="cup">
          <Cup />
        </div>
      ))}
    </div>
  );
};
