# TextDiffViewer

TextDiffViewer is a dependency-free static utility for comparing two pasted texts. It highlights unchanged, removed, and added lines, reports counts, supports whitespace-insensitive comparison, and keeps all text in the browser.

## Run locally

Open `index.html` in a modern browser, or serve this directory with any static file server. No build step or backend is required.

## Notes

- The comparison uses a longest-common-subsequence line diff.
- Text is HTML-escaped before rendering so pasted markup is displayed safely as text.
- Very large comparisons are capped to keep the page responsive.
