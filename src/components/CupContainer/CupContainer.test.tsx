import { render, screen } from "@testing-library/react";

import { CupContainer } from "./CupContainer";
import { GameContext, initialContext } from "../../contexts/GameContext";

const mockCups = [{ id: 0 }, { id: 1 }, { id: 2 }];

describe("CupContainer", () => {
  it("should render the loading message when there are no cups", () => {
    render(<CupContainer />);
    expect(screen.getByText("Loading game...")).toBeInTheDocument();
  });

  it("should render the correct number of cups", () => {
    render(
      <GameContext.Provider value={{ ...initialContext, cups: mockCups }}>
        <CupContainer />
      </GameContext.Provider>
    );
    const cups = screen.getAllByTestId("cup");
    expect(cups).toHaveLength(mockCups.length);
  });
});
