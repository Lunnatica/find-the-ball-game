import { render, screen } from "@testing-library/react";

import { CupContainer } from "./CupContainer";

const mockSetGameState = jest.fn();
const mockGameState = "initial";

describe("CupContainer", () => {
  it("should render the correct number of cups", () => {
    render(
      <CupContainer
        numberOfCups={5}
        cupWithBall={1}
        gameState={mockGameState}
        setGameState={mockSetGameState}
      />
    );
    const cups = screen.getAllByTestId("cup");
    expect(cups).toHaveLength(5);
  });

  describe("initial state", () => {
    it("should render the cup with the ball in the initial state", () => {
      render(
        <CupContainer
          numberOfCups={3}
          cupWithBall={1}
          gameState={mockGameState}
          setGameState={mockSetGameState}
        />
      );
      const cups = screen.getAllByTestId("cup");
      expect(cups[1].querySelector("[data-testid='ball']")).toBeInTheDocument();
    });
  });
});
