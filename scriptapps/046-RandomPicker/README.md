# RandomPicker

RandomPicker is a dependency-free static utility for fair random selection from a pasted list of names or items. It includes an animated result, optional removal of picked items, a short history, and cryptographic random index selection.

## Run locally

Open `index.html` in a modern browser, or serve this directory with any static file server. No build step or backend is required.

## Notes

- Empty lines are ignored and the list is capped at 100 items for a focused interface.
- The optional remove-picked mode maintains a temporary available pool until the list is edited or reset.
- The random index uses rejection sampling with `crypto.getRandomValues`.
