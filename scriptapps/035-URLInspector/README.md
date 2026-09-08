# URLInspector

URLInspector is a dependency-free static utility for breaking an absolute URL into its protocol, host, port, path, credentials, query parameters, fragment, and normalized form.

## Run locally

Open `index.html` in a modern browser, or serve this directory with any static file server. No build step or backend is required.

## Notes

- Parsing uses the browser's native `URL` and `URLSearchParams` APIs.
- Query parameter names and values are HTML-escaped before rendering.
- Relative URLs are rejected so the displayed components always have an unambiguous origin.
