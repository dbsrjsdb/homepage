# ExpenseSplitter

ExpenseSplitter is a dependency-free static bill calculator for assigning individual items and dividing shared costs by unequal share weights. It also supports tax/tip, reset, and copying the final summary.

## Run locally

Open `index.html` in a modern browser, or serve this directory with any static file server. No build step or backend is required.

## Notes

- Individual items are assigned to one person; shared amount and tax/tip are distributed by each person's weight.
- Amounts are displayed in USD and calculations remain in the browser.
- Clipboard permissions vary by browser; the visible result list remains available if copying is unavailable.
