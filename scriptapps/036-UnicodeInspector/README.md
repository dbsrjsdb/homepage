# UnicodeInspector

UnicodeInspector is a dependency-free static utility for inspecting text by Unicode code point. It shows glyphs, hexadecimal and decimal values, UTF-8 bytes, and readable names for common characters with a safe fallback for less common code points.

## Run locally

Open `index.html` in a modern browser, or serve this directory with any static file server. No build step or backend is required.

## Notes

- Code points are iterated with `Array.from`, so surrogate-pair emoji appear as one row.
- UTF-8 bytes come from the browser's `TextEncoder`.
- The compact built-in name map is supplemented by common Latin letter and digit naming rules.
