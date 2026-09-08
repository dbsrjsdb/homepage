# FileHashCalculator

FileHashCalculator is a dependency-free static utility for calculating SHA-256 and SHA-512 digests from a dropped or selected file. Files are read locally with the Web Crypto API and never uploaded.

## Run locally

Open `index.html` in a modern browser, or serve this directory with any static file server. No build step or backend is required.

## Notes

- Hashing uses `crypto.subtle.digest` with SHA-256 or SHA-512.
- The selected file is read into memory only while calculating its digest.
- Digest output is lowercase hexadecimal for easy comparison.
