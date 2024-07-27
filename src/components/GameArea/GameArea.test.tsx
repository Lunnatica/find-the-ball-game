import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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
    it("should render the initial user message", () => {
      render(<GameArea />);
      const userMessage = screen.getByText("Guess where the ball is!");
      expect(userMessage).toBeInTheDocument();
    });

    it("should render a Start game button", () => {
      render(<GameArea />);
      const startButton = screen.getByText("Start game!");
      expect(startButton).toBeInTheDocument();
    });

    it("should show the ball under one of the cups", () => {
      render(<GameArea />);
      expect(screen.getByTestId("ball")).toBeInTheDocument();
    });

    it("should hide the button after clicking the Start game button", async () => {
      const user = userEvent.setup();
      render(<GameArea />);
      const startButton = screen.getByText("Start game!");

      await user.click(startButton);

      expect(startButton).not.toBeInTheDocument();
    });
  });

  describe("when the game is in the shuffling state", () => {
    beforeEach(async () => {
      const user = userEvent.setup();
      render(<GameArea />);
      const startButton = screen.getByText("Start game!");
      await user.click(startButton);
    });

    it("should hide the ball", () => {
      expect(screen.queryByTestId("ball")).not.toBeInTheDocument();
    });

    it("should show the shuffling message", () => {
      expect(screen.getByText("Shuffling...")).toBeInTheDocument();
    });
  });
});
