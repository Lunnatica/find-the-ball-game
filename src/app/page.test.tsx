import { render, screen } from "@testing-library/react";

import Home from "./page";

describe("Main page", () => {
  it("should render correctly", () => {
    render(<Home />);
    expect(
      screen.getByText("Page developed by Paula López Antelo")
    ).toBeDefined();
  });

  it("should render a cup container", () => {
    render(<Home />);
    const cupContainer = screen.getByTestId("cup-container");
    expect(cupContainer).toBeDefined();
  });
});
