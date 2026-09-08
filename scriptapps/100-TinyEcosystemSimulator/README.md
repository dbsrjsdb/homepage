# Tiny Ecosystem Simulator

Tiny Ecosystem Simulator is a static browser experiment for observing a simple food web. Plants regrow, herbivores graze and reproduce when fed, and predators hunt or starve according to local rules.

## Run locally

Serve this directory with any static file server, for example:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Notes

All simulation state stays in memory in the browser. Use the population sliders and Reset world to explore different starting balances.
