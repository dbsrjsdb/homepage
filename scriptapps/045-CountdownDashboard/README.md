# CountdownDashboard

CountdownDashboard is a dependency-free static event countdown board. Add multiple future events, see live days/hours/minutes/seconds, remove cards, and keep the dashboard persisted locally.

## Run locally

Open `index.html` in a modern browser, or serve this directory with any static file server. No build step or backend is required.

## Notes

- Event dates are stored as ISO timestamps and displayed in the browser's local timezone.
- Expired events remain visible with a “The moment is here” state until removed.
- The dashboard uses localStorage and does not synchronize across devices.
