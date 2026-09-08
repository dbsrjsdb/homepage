# GitCommandBuilder

GitCommandBuilder is a dependency-free static helper for common Git tasks. Choose a task, fill in branch/message/remote details, and copy a suggested command without executing anything.

## Run locally

Open `index.html` in a modern browser, or serve this directory with any static file server. No build step or backend is required.

## Notes

- Safer defaults use `git pull --ff-only` and `git reset --soft HEAD~1`.
- Values are shell-quoted before being placed into the suggested command; review commands before running them.
