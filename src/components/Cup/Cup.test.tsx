import { render, screen } from "@testing-library/react";
import { Cup } from "./Cup";

const MOCK_ID = 1;

describe("Cup", () => {
  it("should render the component", () => {
    render(<Cup id={MOCK_ID} hasBall={false} isLifted={false} />);
    expect(screen.getByText(`Cup ${MOCK_ID}`)).toBeInTheDocument();
  });

  describe("when the cup has the ball", () => {
    describe("when the cup is lifted", () => {
      it("should render the ball", () => {
        render(<Cup id={MOCK_ID} hasBall isLifted />);
        expect(screen.getByTestId("ball")).toBeInTheDocument();
      });
    });

    describe("when the cup is not lifted", () => {
      it("should not render the ball", () => {
        render(<Cup id={MOCK_ID} hasBall isLifted={false} />);
        expect(screen.queryByTestId("ball")).not.toBeInTheDocument();
      });
    });
  });

  describe("when the cup does not have the ball", () => {
    describe("when the cup is lifted", () => {
      it("should not render the ball", () => {
        render(<Cup id={MOCK_ID} isLifted hasBall={false} />);
        expect(screen.queryByTestId("ball")).not.toBeInTheDocument();
      });
    });

    describe("when the cup is not lifted", () => {
      it("should not render the ball", () => {
        render(<Cup id={MOCK_ID} hasBall={false} isLifted={false} />);
        expect(screen.queryByTestId("ball")).not.toBeInTheDocument();
      });
    });
  });
});
