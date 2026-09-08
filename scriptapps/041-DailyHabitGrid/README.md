# DailyHabitGrid

DailyHabitGrid is a dependency-free static habit tracker with a GitHub-style 12-week completion grid. Add multiple habits, click days to mark completion, review streaks, and keep the data in localStorage.

## Run locally

Open `index.html` in a modern browser, or serve this directory with any static file server. No build step or backend is required.

## Notes

- Completion data is stored locally under one browser storage key.
- The grid covers the previous 11 weeks plus the current week.
- Completion is intentionally binary in the initial scope: a day is marked complete or not complete.
