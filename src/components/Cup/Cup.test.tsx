import { render, screen } from "@testing-library/react";
import { Cup } from "./Cup";

describe("Cup", () => {
  it("should render the component", () => {
    render(<Cup />);
    expect(screen.getByText("Cup")).toBeInTheDocument();
  });
});
