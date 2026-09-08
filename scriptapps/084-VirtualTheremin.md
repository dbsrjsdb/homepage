---

name: VirtualTheremin
status: COMPLETE
priority: 1
progress: 100
-----------

# VirtualTheremin

## Goal

Create a focused, reliable browser-based virtual theremin utility that fulfills the listed project objective: Pointer position controls oscillator pitch and volume.

The application should be easy to use, responsive, accessible, and deployable as a static site without a server-side application.

## Problem

Users need a straightforward way to pointer position controls oscillator pitch and volume. The project should provide a clear interface and immediate local feedback without unnecessary setup or data transfer.

## Requirements

* Implement the core virtual theremin workflow described above.
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

* [x] The core virtual theremin workflow works as described.
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

* Implemented a pointer-controlled Web Audio oscillator where horizontal position controls pitch and vertical position controls volume.
* Added waveform and lowest-pitch controls, live frequency/note/volume readouts, touch/mouse pointer handling, accessible focus labels, and explicit start/stop controls.

## In Progress

* None; implementation and validation are complete.

## Planned

* None.

## Blocked

* None.

## Known Limitations

* Playback requires a browser with Web Audio API support and an intentional user gesture.
* The instrument uses a single oscillator and does not record gestures or notes.
* No backend or persistent cross-device storage is planned unless requirements change.

## Engineering Decisions

* Prefer a client-side implementation so user inputs can remain in the browser.
* Prefer a small dependency footprint and static deployment.
* Keep the primary workflow visible and focused rather than adding unrelated features.
* Use progressive enhancement where practical so the core utility remains understandable and maintainable.

## Notes

The initial scope is the project description from `project_list.md`. Expand requirements only when implementation details are confirmed.
