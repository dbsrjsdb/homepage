# JSONFormatterAndExplorer

JSONFormatterAndExplorer is a dependency-free static utility for validating, prettifying, minifying, and exploring JSON. Nested objects and arrays appear in a keyboard-friendly collapsible tree, and all processing stays in the browser.

## Run locally

Open `index.html` in a modern browser, or serve this directory with any static file server. No build step or backend is required.

## Notes

- Parsing uses the browser's native `JSON.parse` and `JSON.stringify` implementations.
- Invalid JSON reports the parser error and clears the explorer state.
- The tree uses native `details` elements for expansion and collapse.
