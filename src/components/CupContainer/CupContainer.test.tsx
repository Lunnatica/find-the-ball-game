import { render, screen } from "@testing-library/react";

import { CupContainer } from "./CupContainer";

describe("CupContainer", () => {
  it("should render the correct number of cups", () => {
    render(<CupContainer numberOfCups={5} />);
    const cups = screen.getAllByTestId("cup");
    expect(cups).toHaveLength(5);
  });
});
