# ScreenRuler

ScreenRuler is a dependency-free static on-screen ruler. Set a pixel length, choose an orientation and display unit, and optionally calibrate pixels against a known physical reference for more useful inch, centimeter, or millimeter estimates.

## Run locally

Open `index.html` in a modern browser, or serve this directory with any static file server. No build step or backend is required.

## Notes

- Browser CSS pixels are not guaranteed to match physical measurements without calibration.
- Calibration is kept in the current page and is not stored or transmitted.
- The ruler is capped at 900 displayed pixels to keep it usable on smaller screens.
