# JSPlaygroundHub

A static landing page for discovering 100 web applications, organized by category
with a featured collection at the top.

## Development

Open `index.html` directly in a browser, or serve this directory with any
static file server. No build step or backend is required.

## Adding an application

Add an object to the `applications` array in `script.js` with a `name`,
`description`, `category`, and destination `url`. Use `TBD` until the
destination is available; the card will then show a non-link placeholder.
Application links are relative paths so the hub remains deployable as a
static site without build tooling. The search box, category buttons, and
featured collection are generated from the same metadata. Keep each destination
as a relative `../<project>/index.html` link so the hub and applications can be
deployed together.
