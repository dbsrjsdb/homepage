# MazeGeneratorSolver

MazeGeneratorSolver is a dependency-free static maze lab. It generates perfect mazes at three sizes and animates BFS or A* search from the entrance to the exit.

## Run locally

Open `index.html` in a modern browser, or serve this directory with any static file server. No build step or backend is required.

## Notes

- Maze generation uses recursive backtracking, so every generated maze has a route between its endpoints.
- Search progress and the final route are animated locally; changing size creates a fresh maze.
