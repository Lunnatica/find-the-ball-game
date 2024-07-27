import { render, screen } from "@testing-library/react";

import { GameArea } from "./GameArea";

describe("GameArea", () => {
  it("should render the cup container", () => {
    render(<GameArea />);
    const cupContainer = screen.getByTestId("cup-container");
    expect(cupContainer).toBeInTheDocument();
  });

  it("should render the initial number of cups", () => {
    render(<GameArea />);
    const cups = screen.getAllByTestId("cup");
    expect(cups).toHaveLength(3);
  });

  describe("when the game is in the initial state", () => {
    it("should render a Start game button", () => {
      render(<GameArea />);
      const startButton = screen.getByText("Start game!");
      expect(startButton).toBeInTheDocument();
    });
  });
});
