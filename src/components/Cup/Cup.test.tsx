import { render, screen } from "@testing-library/react";
import userEvent, { UserEvent } from "@testing-library/user-event";

import { GameContext, initialContext } from "../../contexts/GameContext";
import { Cup } from "./Cup";

const MOCK_ID = 1;
const mockEndGame = jest.fn();

const renderCupWithContext = (
  gameState: "initial" | "playing" = "initial",
  isCupWithBall: boolean = false
) => {
  render(
    <GameContext.Provider
      value={{
        ...initialContext,
        gameState,
        cupWithBall: isCupWithBall ? MOCK_ID : undefined,
        endGame: mockEndGame,
      }}
    >
      <Cup id={MOCK_ID} />
    </GameContext.Provider>
  );
};

describe("Cup", () => {
  it("should render the component", () => {
    renderCupWithContext();
    expect(screen.getByTestId(`cup-${MOCK_ID}`)).toBeInTheDocument();
  });

  describe("when the cup has the ball", () => {
    describe("when the cup is lifted", () => {
      it("should render the ball", () => {
        renderCupWithContext("initial", true);
        expect(screen.getByTestId("ball")).toBeInTheDocument();
      });
    });

    describe("when the cup is not lifted", () => {
      it("should not render the ball", () => {
        renderCupWithContext("playing", true);
        expect(screen.queryByTestId("ball")).not.toBeInTheDocument();
      });
    });
  });

  describe("when the cup does not have the ball", () => {
    describe("when the cup is lifted", () => {
      it("should not render the ball", () => {
        renderCupWithContext("initial", false);
        expect(screen.queryByTestId("ball")).not.toBeInTheDocument();
      });
    });

    describe("when the cup is not lifted", () => {
      it("should not render the ball", () => {
        renderCupWithContext("playing", false);
        expect(screen.queryByTestId("ball")).not.toBeInTheDocument();
      });
    });
  });

  describe("when the game is not in the playing state", () => {
    it("should disable the Cup button", () => {
      renderCupWithContext("initial", false);
      expect(screen.getByTestId(`cup-${MOCK_ID}`)).toBeDisabled();
    });
  });

  describe("when the game is in the playing state", () => {
    let user: UserEvent;

    beforeEach(() => {
      user = userEvent.setup();
      renderCupWithContext("playing", false);
    });

    it("should enable the Cup button", () => {
      expect(screen.getByTestId(`cup-${MOCK_ID}`)).toBeEnabled();
    });

    it("should call the endGame function when the Cup button is clicked", async () => {
      await user.click(screen.getByTestId(`cup-${MOCK_ID}`));

      expect(mockEndGame).toHaveBeenCalledWith(MOCK_ID);
    });
  });
});
