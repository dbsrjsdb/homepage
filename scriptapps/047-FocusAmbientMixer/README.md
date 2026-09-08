# FocusAmbientMixer

FocusAmbientMixer is a dependency-free static ambient sound mixer. It synthesizes rain, noise, fan, and oscillator channels with Web Audio, gives each channel a toggle and volume, and provides presets for quick starting points.

## Run locally

Open `index.html` in a modern browser, or serve this directory with any static file server. No build step, audio files, or backend is required.

## Notes

- Audio starts only after a user gesture, following browser autoplay rules.
- Noise buffers are generated in memory and looped; no audio assets are fetched.
- Stopping suspends the audio context and leaves the selected mix controls in place.
