import { render, screen } from "@testing-library/react";

import Home from "./page";

describe("Main page", () => {
  it("should render correctly", () => {
    render(<Home />);
    expect(
      screen.getByText("Page developed by Paula López Antelo")
    ).toBeDefined();
  });

  it("should render a GameArea component", () => {
    render(<Home />);
    expect(screen.getByTestId("game-area")).toBeDefined();
  });
});
