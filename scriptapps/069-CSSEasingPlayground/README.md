# CSSEasingPlayground

CSSEasingPlayground is a dependency-free static cubic Bézier editor. Adjust x1/y1/x2/y2 controls, load presets, inspect the curve, replay a motion preview, and copy the generated CSS timing function.

## Run locally

Open `index.html` in a modern browser, or serve this directory with any static file server. No build step or backend is required.

## Notes

- Control values support overshoot on the y axes for spring-like curves.
- The preview uses the generated CSS `cubic-bezier()` directly.
