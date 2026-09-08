# TimeboxingPlanner

TimeboxingPlanner is a dependency-free static day planner with a 24-hour timeline. Add blocks, drag them to new times, delete them, and see overlapping blocks highlighted while the plan persists locally.

## Run locally

Open `index.html` in a modern browser, or serve this directory with any static file server. No build step or backend is required.

## Notes

- Blocks snap to 15-minute increments when dragged.
- A 24-hour day is represented as 1,440 vertical minutes; the mobile view scales the same timeline for readability.
- Overlapping blocks receive a visible conflict outline.
