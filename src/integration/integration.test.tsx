import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { GameArea } from "../components/GameArea/GameArea";
import {
  GameContextProvider,
  NUMBER_OF_SHUFFLES,
  SHUFFLE_INTERVAL_DURATION,
} from "../contexts/GameContext";

const TIME_TO_RUN_SHUFFLES =
  SHUFFLE_INTERVAL_DURATION * NUMBER_OF_SHUFFLES + 1000;

describe("End to End Test", () => {
  it(
    "should start the game, shuffle the cups, and end the game",
    async () => {
      render(
        <GameContextProvider>
          <GameArea />
        </GameContextProvider>
      );

      expect(screen.getByText("Start game")).toBeInTheDocument();

      await userEvent.click(screen.getByText("Start game"));

      expect(screen.getByText("Shuffling...")).toBeInTheDocument();

      await waitFor(
        () => {
          expect(screen.getByText("Choose your bet!")).toBeInTheDocument();
        },
        { timeout: TIME_TO_RUN_SHUFFLES }
      );

      await userEvent.click(screen.getByRole("button", { name: "Cup 1" }));

      await waitFor(() => {
        const resultMessage =
          screen.queryByText("You win! 🎉") ||
          screen.queryByText("You lose! 🥺");
        expect(resultMessage).toBeInTheDocument();
      });

      expect(screen.getByText("Start game")).toBeInTheDocument();
    },
    TIME_TO_RUN_SHUFFLES
  );
});
