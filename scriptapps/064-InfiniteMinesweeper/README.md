# InfiniteMinesweeper

InfiniteMinesweeper is a dependency-free static procedural minefield. Explore a moving 13×11 viewport, reveal safe cells, flag suspected mines, and pan indefinitely through deterministic generated terrain.

## Run locally

Open `index.html` in a modern browser, or serve this directory with any static file server. No build step or backend is required.

## Notes

- Cell mines are generated from coordinates and a world seed, so explored areas stay consistent while panning.
- The origin has a small safe zone for a welcoming first click; a new world creates a new seed.
