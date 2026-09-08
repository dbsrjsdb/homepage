# Audio Visualizer

Audio Visualizer is a dependency-free static microphone visualizer with waveform and frequency-spectrum modes, sensitivity control, and explicit permission/start/stop states.

## Run locally

Open `index.html` in a modern browser, or serve this directory with any static file server. Microphone access generally requires a secure context such as HTTPS or localhost.

## Notes

- Microphone audio is analyzed in memory and is never recorded or uploaded.
- The browser prompts for permission only after Start microphone is pressed.
