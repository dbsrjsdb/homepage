# RegexPlayground

RegexPlayground is a dependency-free static regular-expression tester. Enter a pattern, flags, and sample text to see highlighted matches, match indexes, and capture information without sending data to a server.

## Run locally

Open `index.html` in a modern browser, or serve this directory with any static file server. No build step or backend is required.

## Notes

- Matching uses the browser's JavaScript `RegExp` engine.
- When the global flag is absent, the preview scanner adds it so every occurrence can be highlighted; the entered flags remain visible and unchanged.
- Pasted pattern results are HTML-escaped before display.
