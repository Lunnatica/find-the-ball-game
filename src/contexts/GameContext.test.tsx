import { act, render, screen } from "@testing-library/react";

import {
  GameContext,
  GameContextProvider,
  useGameContext,
} from "./GameContext";

describe("GameContext", () => {
  let contextValue: GameContext;
  beforeEach(() => {
    contextValue = {} as GameContext;
  });

  it("should render", () => {
    render(
      <GameContextProvider>
        <div data-testid="mock-children"></div>
      </GameContextProvider>
    );
    expect(screen.getByTestId("mock-children")).toBeInTheDocument();
  });

  it("should generate the initial context", () => {
    const MockComponent = () => {
      contextValue = useGameContext();
      return null;
    };

    render(
      <GameContextProvider>
        <MockComponent />
      </GameContextProvider>
    );

    expect(contextValue).toEqual({
      gameState: "initial",
      cups: expect.any(Array),
      cupWithBall: expect.any(Number),
      startGame: expect.any(Function),
      endGame: expect.any(Function),
      animations: {},
    });
  });

  it("should update the context value when calling startGame", () => {
    const MockComponent = () => {
      contextValue = useGameContext();
      return null;
    };

    render(
      <GameContextProvider>
        <MockComponent />
      </GameContextProvider>
    );

    act(() => {
      contextValue.startGame();
    });

    expect(contextValue.gameState).toBe("shuffling");
  });

  it("should update the gameState to win when calling endGame with the winning cup", () => {
    const MockComponent = () => {
      contextValue = useGameContext();
      return null;
    };

    render(
      <GameContextProvider>
        <MockComponent />
      </GameContextProvider>
    );

    act(() => {
      contextValue.endGame(contextValue.cupWithBall!);
    });

    expect(contextValue.gameState).toBe("win");
  });

  it("should update the gameState to lose when calling endGame with the wrong cup", () => {
    const MockComponent = () => {
      contextValue = useGameContext();
      return null;
    };

    render(
      <GameContextProvider>
        <MockComponent />
      </GameContextProvider>
    );

    act(() => {
      contextValue.endGame(contextValue.cupWithBall! + 1);
    });

    expect(contextValue.gameState).toBe("lose");
  });
});
