# The Find the Ball Game

[See Live demo here.](https://find-the-ball-game.vercel.app/)

The Find the Ball Game involves a flat surface, a row of three small containers, and a ball small enough to fit underneath each of them.

On each turn of the game, the player is shown the ball being placed under one of the containers before the order of the containers is repeatedly shuffled at random. The player has to guess correctly which container the ball is under to win; otherwise, they lose.

<img width="1715" alt="Screenshot 2024-07-29 at 16 45 15" src="https://github.com/user-attachments/assets/9da8bc96-1194-410a-8baf-3f60d37a6ae8">

## Local development

### How to run the project locally

1. Install the dependencies `npm install`
2. Run the project with `npm run dev`

### Running the tests

- Run `npm run test` to run all unit and integration tests.

### Game Difficulty Settings

If you wish to change the Game Difficulty Settings (e.g. adding more shells, or change the speed or number of shuffles, you can do so in the Game Settings in the [GameContext file](src/contexts/GameContext.tsx)).

## Implementation details

### Tech stack

- React
- Next.js
- CSS with Styled-Components
- TypeScript
- Jest and React testing library

## Nice to have (potential improvements)

- Using an animations library (e.g. [react-spring](https://www.react-spring.dev/)) to manage transitions in a smoother manner.
- Allowing users to update Game Settings on the UI.
- Adding a score counter.
- Only passing a test ID if the environment is test, to prevent cup ID being shown on the DOM.
- Improve accessibility (e.g. focus on first cup when initiating playing state).
- Adjust cup gap dependant on mobile/desktop.
