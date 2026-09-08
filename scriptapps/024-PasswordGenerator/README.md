# PasswordGenerator

PasswordGenerator is a dependency-free static utility for creating random passwords locally. Choose a length and character sets, or use memorable mode for a word-based password with an entropy estimate and strength indicator.

## Run locally

Open `index.html` in a modern browser, or serve this directory with any static file server. No build step or backend is required.

## Notes

- Random characters are selected with `crypto.getRandomValues` and rejection sampling to avoid modulo bias.
- Passwords are generated in the browser and are not stored or transmitted.
- Memorable mode uses a built-in word list and is intended for easier typing, not as a replacement for a password manager.
