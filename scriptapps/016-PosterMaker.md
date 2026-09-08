---

name: PosterMaker
status: COMPLETE
priority: 1
progress: 100
-----------

# PosterMaker

## Goal

Create a focused, reliable browser-based poster maker utility that fulfills the listed project objective: Image + headline + typography controls with PNG export.

The application should be easy to use, responsive, accessible, and deployable as a static site without a server-side application.

## Problem

Users need a straightforward way to image + headline + typography controls with PNG export. The project should provide a clear interface and immediate local feedback without unnecessary setup or data transfer.

## Requirements

* Implement the core poster maker workflow described above.
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

* [x] The core poster maker workflow works as described.
* [x] Inputs, controls, and actions are clearly presented and usable.
* [x] Output or feedback updates correctly for valid and invalid input.
* [x] The application works entirely in the browser without a required backend.
* [x] The interface works on common desktop and mobile viewport sizes.
* [x] The interface meets basic accessibility expectations.
* [x] Relevant tests and basic manual checks pass.
* [x] Required documentation is updated.

## Current Milestone

Initial implementation complete.

## Completed

* Selected a plain HTML, CSS, and JavaScript implementation with Canvas APIs.
* Added local image upload with cover-fit background rendering.
* Added headline wrapping, font family, text size, alignment, text color, and overlay controls.
* Added live poster preview, PNG export, reset behavior, validation, and live status feedback.
* Added responsive layouts, visible focus states, semantic labels, and preview labelling.
* Added development and usage documentation.
* Verified static loading, poster controls, responsive viewport behavior, and accessibility markers in Chromium.

## In Progress

* None.

## Planned

* None for the initial scope.

## Blocked

* None.

## Known Limitations

* Specific framework, hosting provider, and optional dependencies are TBD.
* Browser capabilities and file/input size limits may constrain some operations.
* No backend or persistent cross-device storage is planned unless requirements change.

## Engineering Decisions

* Prefer a client-side implementation so user inputs can remain in the browser.
* Prefer a small dependency footprint and static deployment.
* Keep the primary workflow visible and focused rather than adding unrelated features.
* Use progressive enhancement where practical so the core utility remains understandable and maintainable.
* Render a fixed 600×800 poster canvas and wrap headline text to preserve readable margins.
* Keep all image data in the browser and cap source files at 20 MB.

## Notes

The initial scope is the project description from `project_list.md`. Expand requirements only when implementation details are confirmed.
