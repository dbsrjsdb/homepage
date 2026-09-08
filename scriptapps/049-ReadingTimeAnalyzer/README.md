# ReadingTimeAnalyzer

ReadingTimeAnalyzer is a dependency-free static utility that estimates reading time, sentence count, Flesch readability, grade level, paragraph count, and average sentence length from pasted text.

## Run locally

Open `index.html` in a modern browser, or serve this directory with any static file server. No build step or backend is required.

## Notes

- Analysis updates as text changes and uses approximate English-language syllable counting.
- A draft is kept in local browser storage for convenience; it is never uploaded.
- Reading time uses a 200-words-per-minute estimate.
