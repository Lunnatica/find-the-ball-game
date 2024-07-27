import { render, screen } from "@testing-library/react";
import userEvent, { UserEvent } from "@testing-library/user-event";

import { GameContext, initialContext } from "../../contexts/GameContext";
import { Cup } from "./Cup";

const MOCK_ID = 1;

describe("Cup", () => {
  it("should render the component", () => {
    render(<Cup id={MOCK_ID} hasBall={false} isLifted={false} />);
    expect(screen.getByTestId(`cup-${MOCK_ID}`)).toBeInTheDocument();
  });

  describe("when the cup has the ball", () => {
    describe("when the cup is lifted", () => {
      it("should render the ball", () => {
        render(<Cup id={MOCK_ID} hasBall isLifted />);
        expect(screen.getByTestId("ball")).toBeInTheDocument();
      });
    });

    describe("when the cup is not lifted", () => {
      it("should not render the ball", () => {
        render(<Cup id={MOCK_ID} hasBall isLifted={false} />);
        expect(screen.queryByTestId("ball")).not.toBeInTheDocument();
      });
    });
  });

  describe("when the cup does not have the ball", () => {
    describe("when the cup is lifted", () => {
      it("should not render the ball", () => {
        render(<Cup id={MOCK_ID} isLifted hasBall={false} />);
        expect(screen.queryByTestId("ball")).not.toBeInTheDocument();
      });
    });

    describe("when the cup is not lifted", () => {
      it("should not render the ball", () => {
        render(<Cup id={MOCK_ID} hasBall={false} isLifted={false} />);
        expect(screen.queryByTestId("ball")).not.toBeInTheDocument();
      });
    });
  });

  describe("when the game is not in the playing state", () => {
    it("should disable the Cup button", () => {
      render(<Cup id={MOCK_ID} hasBall={false} isLifted={false} />);
      expect(screen.getByTestId(`cup-${MOCK_ID}`)).toBeDisabled();
    });
  });

  describe("when the game is in the playing state", () => {
    let mockEndGame: jest.Mock;
    let user: UserEvent;

    beforeEach(() => {
      mockEndGame = jest.fn();
      user = userEvent.setup();
      render(
        <GameContext.Provider
          value={{
            ...initialContext,
            gameState: "playing",
            endGame: mockEndGame,
          }}
        >
          <Cup id={MOCK_ID} hasBall={false} isLifted={false} />
        </GameContext.Provider>
      );
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
