---

name: CellularAutomataLab
status: COMPLETE
priority: 1
progress: 100
-----------

# CellularAutomataLab

## Goal

Create a focused, reliable browser-based cellular automata lab utility that fulfills the listed project objective: Experiment with elementary cellular automata rules.

The application should be easy to use, responsive, accessible, and deployable as a static site without a server-side application.

## Problem

Users need a straightforward way to experiment with elementary cellular automata rules. The project should provide a clear interface and immediate local feedback without unnecessary setup or data transfer.

## Requirements

* Implement the core cellular automata lab workflow described above.
* Provide clear controls for the relevant inputs, options, and actions.
* Display useful output, previews, status, or feedback for the current operation.
* Handle empty, invalid, unsupported, or boundary-case input gracefully.
* Keep processing in the browser where practical and avoid requiring a backend.
* Allow the user to reset or revise the current input and settings.
* Provide a responsive interface suitable for desktop and mobile devices.
* Use semantic, accessible controls with visible focus states and understandable labels.
* Preserve useful state locally when appropriate, without exposing user data.
* Use `TBD` for project-specific information that has not yet been decided.

## Tech Stack

* Language: HTML, CSS, JavaScript
* Framework: TBD — prefer plain HTML/CSS/JS unless React/Vite provides a clear benefit
* Database: None
* Infrastructure: Static web host
* Other: TBD

## Acceptance Criteria

* [x] The core cellular automata lab workflow works as described.
* [x] Inputs, controls, and actions are clearly presented and usable.
* [x] Output or feedback updates correctly for valid and invalid input.
* [x] The application works entirely in the browser without a required backend.
* [x] The interface works on common desktop and mobile viewport sizes.
* [x] The interface meets basic accessibility expectations.
* [x] Relevant tests and basic manual checks pass.
* [x] Required documentation is updated.

## Current Milestone

Complete: validated static browser implementation.

## Completed

* Implemented elementary Wolfram-rule generation over a 120-cell row and 72-generation canvas.
* Added rule, seed, speed, run/step/reset controls, editable first-row cells, binary rule display, generation status, accessible canvas input, and responsive layout.

## In Progress

* None; implementation and validation are complete.

## Planned

* None.

## Blocked

* None.

## Known Limitations

* The lab renders a fixed 120×72 generation field and uses one-dimensional wraparound neighbors.
* Generation state is held in memory and is not persisted.
* No backend or persistent cross-device storage is planned unless requirements change.

## Engineering Decisions

* Prefer a client-side implementation so user inputs can remain in the browser.
* Prefer a small dependency footprint and static deployment.
* Keep the primary workflow visible and focused rather than adding unrelated features.
* Use progressive enhancement where practical so the core utility remains understandable and maintainable.

## Notes

The initial scope is the project description from `project_list.md`. Expand requirements only when implementation details are confirmed.
