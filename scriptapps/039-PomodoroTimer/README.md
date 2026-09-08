# PomodoroTimer

PomodoroTimer is a dependency-free static focus timer with work and break modes, a visual progress ring, adjustable durations, cycle tracking, pause/reset/skip controls, and optional automatic transitions.

## Run locally

Open `index.html` in a modern browser, or serve this directory with any static file server. No build step or backend is required.

## Notes

- The timer uses an absolute end timestamp so it remains accurate if interval callbacks are delayed.
- The timer does not persist activity history or require an account.
- Browser background-tab throttling can affect when the visual display refreshes, but the end timestamp keeps elapsed time correct.
