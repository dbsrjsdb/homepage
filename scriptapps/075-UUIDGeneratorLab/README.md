# UUID Generator Lab

UUID Generator Lab is a dependency-free static utility for generating batches of random version 4 UUIDs and inspecting their version, variant, and group structure.

## Run locally

Open `index.html` in a modern browser, or serve this directory with any static file server. No build step or backend is required.

## Notes

- The Web Crypto API is used for random UUID generation, with a standards-compatible `getRandomValues` fallback.
- UUIDs are generated locally and are not saved or transmitted.
