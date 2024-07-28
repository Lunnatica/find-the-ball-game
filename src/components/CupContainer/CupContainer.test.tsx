import { render, screen } from "@testing-library/react";

import { CupContainer } from "./CupContainer";

const mockCups = [{ id: 0 }, { id: 1 }, { id: 2 }];

describe("CupContainer", () => {
  it("should render the correct number of cups", () => {
    render(<CupContainer cups={mockCups} />);
    const cups = screen.getAllByTestId("cup");
    expect(cups).toHaveLength(mockCups.length);
  });
});
