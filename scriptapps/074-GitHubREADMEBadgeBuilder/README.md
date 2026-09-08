# GitHub README Badge Builder

GitHub README Badge Builder is a dependency-free static utility for configuring a Shields.io badge and copying the resulting Markdown. Labels, colors, style, optional logo, and an optional repository link are all processed in the browser.

## Run locally

Open `index.html` in a modern browser, or serve this directory with any static file server. No build step or backend is required.

## Notes

- Badge previews use an image URL from Shields.io; the generated Markdown works independently of this page.
- Invalid or empty values use readable defaults, and repository links are included only when they use `http` or `https`.
