---

name: ExpenseSplitter
status: COMPLETE
priority: 1
progress: 100
-----------

# ExpenseSplitter

## Goal

Create a focused, reliable browser-based expense splitter utility that fulfills the listed project objective: Split a restaurant/trip bill with unequal shares and individual items.

The application should be easy to use, responsive, accessible, and deployable as a static site without a server-side application.

## Problem

Users need a straightforward way to split a restaurant/trip bill with unequal shares and individual items. The project should provide a clear interface and immediate local feedback without unnecessary setup or data transfer.

## Requirements

* Implement the core expense splitter workflow described above.
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

* [x] The core expense splitter workflow works as described.
* [x] Inputs, controls, and actions are clearly presented and usable.
* [x] Output or feedback updates correctly for valid and invalid input.
* [x] The application works entirely in the browser without a required backend.
* [x] The interface works on common desktop and mobile viewport sizes.
* [x] The interface meets basic accessibility expectations.
* [x] Relevant tests and basic manual checks pass.
* [x] Required documentation is updated.

## Current Milestone

Initial implementation.

## Completed

* Implemented unequal share-weight splitting with individually assigned items, shared costs, tax/tip, reset, and copy-summary controls.
* Added responsive styling, semantic labels, live status feedback, zero-weight validation, and browser-only calculation.

## In Progress

* None.

## Planned

* None; implementation and validation are complete.

## Blocked

* None.

## Known Limitations

* Specific framework, hosting provider, and optional dependencies are TBD.
* Currency display is USD-only; clipboard permissions may vary by browser.
* No backend or persistent cross-device storage is planned unless requirements change.

## Engineering Decisions

* Prefer a client-side implementation so user inputs can remain in the browser.
* Prefer a small dependency footprint and static deployment.
* Keep the primary workflow visible and focused rather than adding unrelated features.
* Use progressive enhancement where practical so the core utility remains understandable and maintainable.

## Notes

The initial scope is the project description from `project_list.md`. Expand requirements only when implementation details are confirmed.
