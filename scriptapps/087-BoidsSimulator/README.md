# Boids Simulator

Boids Simulator is a dependency-free static Canvas flocking experiment with live alignment, cohesion, separation, flock-size, pointer-attraction, pause, and reset controls.

## Run locally

Open `index.html` in a modern browser, or serve this directory with any static file server. No build step or backend is required.

## Notes

- Each boid follows local neighborhood rules; the simulation wraps at the canvas edges.
- Flock state is kept in memory and is not uploaded or persisted.
