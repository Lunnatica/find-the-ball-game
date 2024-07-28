import { render, screen } from "@testing-library/react";
import userEvent, { UserEvent } from "@testing-library/user-event";

import { GameContext, initialContext } from "../../contexts/GameContext";
import { Cup } from "./Cup";
import { GameState } from "../../types/types";

const MOCK_ID = 1;
const mockEndGame = jest.fn();
const liftedCupStyle = { transform: "translateY(-50px)" };

const renderCupWithContext = (
  gameState: GameState = "initial",
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
      <Cup id={MOCK_ID} $animation={[]} />
    </GameContext.Provider>
  );
};

describe("Cup", () => {
  it("should render the Cup component", () => {
    renderCupWithContext();
    expect(screen.getByTestId(`cup-${MOCK_ID}`)).toBeInTheDocument();
  });

  describe("when the game is in the initial state", () => {
    it("should render the cup lifted", () => {
      renderCupWithContext("initial");
      expect(screen.getByTestId(`cup-${MOCK_ID}`)).toHaveStyle(liftedCupStyle);
    });

    it("should disable the Cup button", () => {
      renderCupWithContext("initial");
      expect(screen.getByTestId(`cup-${MOCK_ID}`)).toBeDisabled();
    });

    it("should not call the endGame function when the Cup button is clicked", () => {
      renderCupWithContext("initial");
      userEvent.click(screen.getByTestId(`cup-${MOCK_ID}`));
      expect(mockEndGame).not.toHaveBeenCalled();
    });

    describe("when the cup has the ball", () => {
      it("should render the ball", () => {
        renderCupWithContext("initial", true);
        expect(screen.getByTestId("ball")).toBeInTheDocument();
      });
    });

    describe("when the cup does not have the ball", () => {
      it("should not render the ball", () => {
        renderCupWithContext("initial", false);
        expect(screen.queryByTestId("ball")).not.toBeInTheDocument();
      });
    });

    describe("when the game is in the playing state", () => {
      let user: UserEvent;

      beforeEach(() => {
        user = userEvent.setup();
      });

      it("should render the cup not lifted", () => {
        renderCupWithContext("playing");
        expect(screen.getByTestId(`cup-${MOCK_ID}`)).not.toHaveStyle(
          liftedCupStyle
        );
      });

      it("should enable the Cup button", () => {
        renderCupWithContext("playing");
        expect(screen.getByTestId(`cup-${MOCK_ID}`)).toBeEnabled();
      });

      it("should call the endGame function when the Cup button is clicked", async () => {
        renderCupWithContext("playing");
        await user.click(screen.getByTestId(`cup-${MOCK_ID}`));

        expect(mockEndGame).toHaveBeenCalledWith(MOCK_ID);
      });

      describe("when the cup has the ball", () => {
        it("should render not the ball", () => {
          renderCupWithContext("playing", true);
          expect(screen.queryByTestId("ball")).not.toBeInTheDocument();
        });
      });

      describe("when the cup does not have the ball", () => {
        it("should not render the ball", () => {
          renderCupWithContext("playing", false);
          expect(screen.queryByTestId("ball")).not.toBeInTheDocument();
        });
      });
    });

    describe("when the game is in the win state", () => {
      it("should render the cup lifted", () => {
        renderCupWithContext("win");
        expect(screen.getByTestId(`cup-${MOCK_ID}`)).toHaveStyle(
          liftedCupStyle
        );
      });

      it("should disable the Cup button", () => {
        renderCupWithContext("win");
        expect(screen.getByTestId(`cup-${MOCK_ID}`)).toBeDisabled();
      });

      describe("when the cup has the ball", () => {
        it("should render the ball", () => {
          renderCupWithContext("win", true);
          expect(screen.getByTestId("ball")).toBeInTheDocument();
        });
      });

      describe("when the cup does not have the ball", () => {
        it("should not render the ball", () => {
          renderCupWithContext("win", false);
          expect(screen.queryByTestId("ball")).not.toBeInTheDocument();
        });
      });
    });

    describe("when the game is in the lose state", () => {
      it("should render the cup lifted", () => {
        renderCupWithContext("lose");
        expect(screen.getByTestId(`cup-${MOCK_ID}`)).toHaveStyle(
          liftedCupStyle
        );
      });

      it("should disable the Cup button", () => {
        renderCupWithContext("lose");
        expect(screen.getByTestId(`cup-${MOCK_ID}`)).toBeDisabled();
      });

      describe("when the cup has the ball", () => {
        it("should render the ball", () => {
          renderCupWithContext("lose", true);
          expect(screen.getByTestId("ball")).toBeInTheDocument();
        });
      });

      describe("when the cup does not have the ball", () => {
        it("should not render the ball", () => {
          renderCupWithContext("lose", false);
          expect(screen.queryByTestId("ball")).not.toBeInTheDocument();
        });
      });
    });
  });
});
