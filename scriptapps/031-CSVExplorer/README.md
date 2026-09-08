# CSVExplorer

CSVExplorer is a dependency-free static CSV viewer. Drop or paste comma-separated data, filter rows, sort columns, and inspect average/minimum/maximum statistics for numeric columns without uploading the file.

## Run locally

Open `index.html` in a modern browser, or serve this directory with any static file server. No build step or backend is required.

## Notes

- The parser supports quoted fields and escaped double quotes.
- Rows are kept in memory only for the current browser session.
- Basic statistics are shown for columns whose values can be parsed as numbers.
