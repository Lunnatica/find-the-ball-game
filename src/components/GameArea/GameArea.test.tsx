import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GameArea, NUMBER_OF_SHUFFLES } from "./GameArea";
import { exchangeTwoCups } from "../../lib/game-logic";
import { GameContextProvider } from "../../contexts/GameContext";

jest.mock("../../lib/game-logic", () => ({
  ...jest.requireActual("../../lib/game-logic"),
  exchangeTwoCups: jest.fn(),
}));

const renderGameAreaWithContext = () => {
  render(
    <GameContextProvider>
      <GameArea />
    </GameContextProvider>
  );
};

describe("GameArea", () => {
  it("should render the cup container", () => {
    renderGameAreaWithContext();
    const cupContainer = screen.getByTestId("cup-container");
    expect(cupContainer).toBeInTheDocument();
  });

  it("should render the initial number of cups", () => {
    renderGameAreaWithContext();
    const cups = screen.getAllByTestId("cup");
    expect(cups).toHaveLength(3);
  });

  describe("when the game is in the initial state", () => {
    it("should render the initial user message", () => {
      renderGameAreaWithContext();
      const userMessage = screen.getByText("Guess where the ball is!");
      expect(userMessage).toBeInTheDocument();
    });

    it("should render a Start game button", () => {
      renderGameAreaWithContext();
      const startButton = screen.getByText("Start game!");
      expect(startButton).toBeInTheDocument();
    });

    it("should show the ball under one of the cups", () => {
      renderGameAreaWithContext();
      expect(screen.getByTestId("ball")).toBeInTheDocument();
    });

    it("should hide the button after clicking the Start game button", async () => {
      const user = userEvent.setup();
      renderGameAreaWithContext();
      const startButton = screen.getByText("Start game!");

      await user.click(startButton);

      expect(startButton).not.toBeInTheDocument();
    });
  });

  describe("when the game is in the shuffling state", () => {
    beforeEach(async () => {
      const user = userEvent.setup();
      renderGameAreaWithContext();
      const startButton = screen.getByText("Start game!");
      await user.click(startButton);
    });

    it("should hide the ball", () => {
      expect(screen.queryByTestId("ball")).not.toBeInTheDocument();
    });

    it("should show the shuffling message", () => {
      expect(screen.getByText("Shuffling...")).toBeInTheDocument();
    });

    // TODO: fix tests
    // it(`should call the exchangeTwoCups function ${NUMBER_OF_SHUFFLES} times`, () => {
    //   expect(exchangeTwoCups).toHaveBeenCalledTimes(NUMBER_OF_SHUFFLES);
    // });

    it.todo("should keep the ball under the same cup");
  });

  // TODO: fix these tests
  // describe("when the game is in the finished shuffling state", () => {
  //   beforeEach(async () => {
  //     jest.useFakeTimers();
  //     const user = userEvent.setup();
  //     renderGameAreaWithContext()

  //     const startButton = screen.getByText("Start game!");
  //     await user.click(startButton);

  //     await act(async () => {
  //       jest.advanceTimersByTime(NUMBER_OF_SHUFFLES * 1000);
  //     });
  //   });

  //   afterEach(() => {
  //     jest.useRealTimers();
  //   });

  //   it("should not show the ball", () => {
  //     expect(screen.queryByTestId("ball")).not.toBeInTheDocument();
  //   });

  //   it("should prompt the user to choose a cup", () => {
  //     expect(screen.getByText("Guess where the ball is!")).toBeInTheDocument();
  //   });
  // });
});
