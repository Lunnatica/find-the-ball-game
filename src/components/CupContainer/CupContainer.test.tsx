import { render, screen } from "@testing-library/react";

import { CupContainer } from "./CupContainer";

const mockSetGameState = jest.fn();
const mockGameState = "initial";

const mockCups = [
  { id: 0, hasBall: false, isLifted: false },
  { id: 1, hasBall: true, isLifted: true },
  { id: 2, hasBall: false, isLifted: false },
];

describe("CupContainer", () => {
  it("should render the correct number of cups", () => {
    render(<CupContainer cups={mockCups} />);
    const cups = screen.getAllByTestId("cup");
    expect(cups).toHaveLength(mockCups.length);
  });

  describe("initial state", () => {
    it("should render the the ball if the cup with the ball is lifted", () => {
      render(<CupContainer cups={mockCups} />);
      const cups = screen.getAllByTestId("cup");
      expect(cups[1].querySelector("[data-testid='ball']")).toBeInTheDocument();
    });
  });
});
