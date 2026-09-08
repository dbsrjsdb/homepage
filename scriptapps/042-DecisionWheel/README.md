# DecisionWheel

DecisionWheel is a dependency-free static randomizer. Enter one choice per line, then spin an animated SVG wheel to select one locally with browser cryptographic randomness.

## Run locally

Open `index.html` in a modern browser, or serve this directory with any static file server. No build step or backend is required.

## Notes

- Choices are trimmed, empty lines are ignored, and the wheel accepts up to 24 choices for readability.
- The selected result is chosen with `crypto.getRandomValues`.
- Wheel animation is decorative; the chosen index is selected before the animation begins.
