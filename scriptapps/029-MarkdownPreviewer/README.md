# MarkdownPreviewer

MarkdownPreviewer is a dependency-free static editor and preview pane for a practical subset of Markdown. It supports headings, emphasis, links, lists, quotes, code, fenced code blocks, and downloadable standalone HTML.

## Run locally

Open `index.html` in a modern browser, or serve this directory with any static file server. No build step or backend is required.

## Notes

- Markdown is parsed locally with a small built-in renderer; no third-party runtime is required.
- User text is HTML-escaped before inline markup is applied.
- Downloads contain the rendered HTML and a minimal embedded stylesheet.
