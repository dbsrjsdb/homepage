# ClipboardScratchpad

ClipboardScratchpad is a dependency-free static scratchpad for temporary text snippets. Snippets are timestamped, searchable, pinnable, copyable, and stored only in the browser's local storage.

## Run locally

Open `index.html` in a modern browser, or serve this directory with any static file server. No build step or backend is required.

## Notes

- Text is escaped before rendering and capped at 5,000 characters per snippet.
- Copy uses the Clipboard API when available and reports a helpful fallback when permission is unavailable.
- Clearing is immediate and removes all locally stored snippets.
