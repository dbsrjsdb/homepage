# TextTransformer

TextTransformer is a dependency-free static utility for practical text cleanup. Convert case, trim lines, collapse spaces, sort lines, remove duplicates, and copy the result without sending text to a server.

## Run locally

Open `index.html` in a modern browser, or serve this directory with any static file server. No build step or backend is required.

## Notes

- Transformations run in the browser and preserve the original input until it is cleared or replaced.
- Operations can be combined; case conversion runs before line cleanup, deduplication, and sorting.
- The output is presented in a read-only text area so it can be reviewed before copying.
