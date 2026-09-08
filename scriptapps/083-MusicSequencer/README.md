# Music Sequencer

Music Sequencer is a dependency-free static 16-step drum and bass sequencer using the Web Audio API. Toggle cells for kick, snare, hi-hat, and bass voices, then play the loop locally.

## Run locally

Open `index.html` in a modern browser, or serve this directory with any static file server. No build step or backend is required.

## Notes

- Audio is synthesized only after the user presses Play, which respects browser autoplay policies.
- Patterns live in memory and are not uploaded or persisted.
