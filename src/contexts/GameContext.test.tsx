import { render, screen } from "@testing-library/react";
import { GameContextProvider } from "./GameContext";

describe("GameContext", () => {
  it("should render", () => {
    render(
      <GameContextProvider>
        <div data-testid="mock-children"></div>
      </GameContextProvider>
    );
    expect(screen.getByTestId("mock-children")).toBeInTheDocument();
  });
});
