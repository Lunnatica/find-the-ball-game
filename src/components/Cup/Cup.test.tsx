import { render, screen } from "@testing-library/react";
import { Cup } from "./Cup";

describe("Cup", () => {
  it("should render the component", () => {
    render(<Cup />);
    expect(screen.getByText("Cup")).toBeInTheDocument();
  });

  describe("when the cup has the ball", () => {
    describe("when the cup is lifted", () => {
      it("should render the ball", () => {
        render(<Cup hasBall isLifted />);
        expect(screen.getByTestId("ball")).toBeInTheDocument();
      });
    });

    describe("when the cup is not lifted", () => {
      it("should not render the ball", () => {
        render(<Cup hasBall />);
        expect(screen.queryByTestId("ball")).not.toBeInTheDocument();
      });
    });
  });

  describe("when the cup does not have the ball", () => {
    describe("when the cup is lifted", () => {
      it("should not render the ball", () => {
        render(<Cup isLifted />);
        expect(screen.queryByTestId("ball")).not.toBeInTheDocument();
      });
    });

    describe("when the cup is not lifted", () => {
      it("should not render the ball", () => {
        render(<Cup />);
        expect(screen.queryByTestId("ball")).not.toBeInTheDocument();
      });
    });
  });
});
