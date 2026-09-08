# CronExpressionVisualizer

CronExpressionVisualizer is a dependency-free static cron helper. Enter a five-field cron expression to see a plain-language summary and the next eight occurrences in the browser's local time zone.

## Run locally

Open `index.html` in a modern browser, or serve this directory with any static file server. No build step or backend is required.

## Notes

- Supported fields are minute, hour, day of month, month, and day of week.
- Supports wildcards, lists, ranges, steps, and month/day names.
- Occurrences are calculated locally by scanning minute boundaries; day-of-month and day-of-week follow the common OR behavior when both are restricted.
