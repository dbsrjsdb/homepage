# PassphraseGenerator

PassphraseGenerator is a dependency-free static utility for generating readable multi-word passwords locally. Choose the word count, separator, capitalization, and optional digits, then copy the result with its estimated entropy.

## Run locally

Open `index.html` in a modern browser, or serve this directory with any static file server. No build step or backend is required.

## Notes

- Words and digits are chosen with `crypto.getRandomValues` and rejection sampling.
- Passphrases are generated in the browser and are not stored or transmitted.
- The built-in word list keeps the application self-contained and deployable as a static site.
