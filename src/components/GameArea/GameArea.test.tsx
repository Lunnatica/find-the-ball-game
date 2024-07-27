import { render, screen } from "@testing-library/react";

import { GameArea } from "./GameArea";

describe("GameArea", () => {
  it("should render the cup container", () => {
    render(<GameArea />);
    const cupContainer = screen.getByTestId("cup-container");
    expect(cupContainer).toBeInTheDocument();
  });
});
