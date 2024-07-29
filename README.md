# The Find the Ball Game

[See Live demo here.](https://find-the-ball-game.vercel.app/)

The Find the Ball Game involves a flat surface, a row of three small containers, and a ball small enough to fit underneath each of them.

On each turn of the game, the player is shown the ball being placed under one of the containers before the order of the containers is repeatedly shuffled at random. The player has to guess correctly which container the ball is under to win; otherwise, they lose.

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
