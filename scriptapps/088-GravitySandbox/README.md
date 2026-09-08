# Gravity Sandbox

Gravity Sandbox is a dependency-free static Canvas N-body experiment. Start with a small orbital system, click to add planets, adjust gravity and time scale, and toggle orbital trails.

## Run locally

Open `index.html` in a modern browser, or serve this directory with any static file server. No build step or backend is required.

## Notes

- Bodies are simulated in memory and wrap neither at the edges nor persist across reloads.
- A small softening term keeps close approaches numerically stable.
