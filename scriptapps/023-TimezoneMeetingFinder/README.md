# TimezoneMeetingFinder

TimezoneMeetingFinder is a dependency-free static utility for comparing three participants' working hours across time zones. Choose a date, adjust each location and workday, and use the UTC timeline to find a shared meeting window.

## Run locally

Open `index.html` in a modern browser, or serve this directory with any static file server. No build step or backend is required.

## Notes

- Time zone conversion uses the browser's `Intl` time zone database.
- The comparison treats each entered workday as a local date in its selected zone and reports the resulting windows in UTC.
- All input processing remains in the browser.
