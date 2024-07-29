import { render, screen } from "@testing-library/react";
import userEvent, { UserEvent } from "@testing-library/user-event";

import {
  GameContext,
  INITIAL_NUMBER_OF_CUPS,
  initialContext,
  useGameContext,
} from "../../contexts/GameContext";
import { Animations, GameState } from "../../types/types";
import { GameArea } from "./GameArea";

const mockCups = [{ id: 0 }, { id: 1 }, { id: 2 }];
const mockAnimations: Animations = [];

jest.mock("../../contexts/GameContext", () => ({
  ...jest.requireActual("../../contexts/GameContext"),
  useGameContext: jest.fn(),
}));

const mockStartGame = jest.fn();
const mockCupWithBallIndex = 1;
const mockContext = {
  ...initialContext,
  cupWithBall: mockCupWithBallIndex,
  cups: mockCups,
  animations: mockAnimations,
  startGame: mockStartGame,
};

const renderGameAreaWithContext = (gameState: GameState = "initial") => {
  (useGameContext as jest.Mock).mockReturnValue({
    ...mockContext,
    gameState,
  });

  render(
    <GameContext.Provider
      value={{
        ...mockContext,
        gameState,
      }}
    >
      <GameArea />
    </GameContext.Provider>
  );
};

describe("GameArea", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("when the game is in the initial state", () => {
    let user: UserEvent;

    beforeEach(() => {
      user = userEvent.setup();
      renderGameAreaWithContext();
    });

    it("should render the game area", () => {
      const gameArea = screen.getByTestId("game-area");
      expect(gameArea).toBeInTheDocument();
    });

    it("should render the cup container", () => {
      const cupContainer = screen.getByTestId("cup-container");
      expect(cupContainer).toBeInTheDocument();
    });

    it("should render the initial number of cups", () => {
      const cups = screen.getAllByTestId("cup");
      expect(cups).toHaveLength(INITIAL_NUMBER_OF_CUPS);
    });

    it("should render the initial user message", () => {
      const userMessage = screen.getByText("Guess where the ball is!");
      expect(userMessage).toBeInTheDocument();
    });

    it("should render a Start game button", () => {
      const startButton = screen.getByText("Start game");
      expect(startButton).toBeInTheDocument();
    });

    it("should show the ball under the cup with the ball", () => {
      const cupWithBall = screen.getByTestId(
        `cup-container-for-${mockCupWithBallIndex}`
      );

      expect(cupWithBall).toContainElement(screen.getByTestId("ball"));
    });

    it("should call the startGame function when clicking the Start game button", async () => {
      const startButton = screen.getByText("Start game");

      await user.click(startButton);

      expect(mockStartGame).toHaveBeenCalledTimes(1);
    });
  });

  describe("when the game is in the shuffling state", () => {
    beforeEach(async () => {
      renderGameAreaWithContext("shuffling");
    });

    it("should hide the ball", () => {
      expect(screen.queryByTestId("ball")).not.toBeInTheDocument();
    });

    it("should show the shuffling message", () => {
      expect(screen.getByText("Shuffling...")).toBeInTheDocument();
    });

    it("should not show the Start game button", () => {
      expect(screen.queryByText("Start game")).not.toBeInTheDocument();
    });
  });

  describe("when the game is in the playing state", () => {
    beforeEach(async () => {
      renderGameAreaWithContext("playing");
    });

    it("should not show the ball", () => {
      expect(screen.queryByTestId("ball")).not.toBeInTheDocument();
    });

    it("should prompt the user to choose a cup", () => {
      expect(screen.getByText("Choose your bet!")).toBeInTheDocument();
    });

    it("should not show the Start game button", () => {
      expect(screen.queryByText("Start game")).not.toBeInTheDocument();
    });
  });

  describe("when the game is in the win state", () => {
    beforeEach(() => {
      renderGameAreaWithContext("win");
    });

    it("should show the win message", () => {
      expect(screen.getByText("You win! 🎉")).toBeInTheDocument();
    });

    it("should show the ball under the cup with the ball", () => {
      const cupWithBall = screen.getByTestId(
        `cup-container-for-${mockCupWithBallIndex}`
      );

      expect(cupWithBall).toContainElement(screen.getByTestId("ball"));
    });

    it("should show the Start game button", () => {
      expect(screen.queryByText("Start game")).toBeInTheDocument();
    });
  });

  describe("when the game is in the lose state", () => {
    beforeEach(() => {
      renderGameAreaWithContext("lose");
    });

    it("should show the lose message", () => {
      expect(screen.getByText("You lose! 🥺")).toBeInTheDocument();
    });

    it("should show the ball under the cup with the ball", () => {
      const cupWithBall = screen.getByTestId(
        `cup-container-for-${mockCupWithBallIndex}`
      );

      expect(cupWithBall).toContainElement(screen.getByTestId("ball"));
    });

    it("should show the Start game button", () => {
      expect(screen.queryByText("Start game")).toBeInTheDocument();
    });
  });
});
