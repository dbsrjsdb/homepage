# Base64Workbench

Base64Workbench is a dependency-free static utility for encoding text or files and decoding Base64 locally. Unicode text uses UTF-8, file bytes are preserved, and results can be copied or downloaded.

## Run locally

Open `index.html` in a modern browser, or serve this directory with any static file server. No build step or backend is required.

## Notes

- Text conversion uses `TextEncoder` and `TextDecoder` for Unicode-safe round trips.
- File bytes are processed in the browser and can be downloaded after conversion.
- Large files are held in memory while being converted.
