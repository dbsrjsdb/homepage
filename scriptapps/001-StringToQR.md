---

name: StringToQR
status: COMPLETE
priority: 1
progress: 100
-----------

# StringToQR

## Goal

Create a simple web page that converts user-provided text into a QR code image. The user should be able to configure the generated QR code and download or otherwise obtain the resulting image.

## Problem

Users sometimes need to quickly turn text into a QR code without using a larger QR-code service. StringToQR should provide a focused, lightweight interface for entering text, configuring QR-code output, and generating an image directly in the browser.

## Requirements

* Provide an input field or text area for the source text.
* Generate a QR code from the provided text.
* Allow the user to select the output image format.
* Allow the user to select the QR-code pixel size.
* Allow the user to select the error-correction level/percentage.
* Update the generated QR code when the relevant settings change or when the user explicitly generates it.
* Display the generated QR code clearly.
* Allow the generated QR code image to be downloaded.
* Work entirely in the browser without requiring a backend.
* Provide a responsive interface suitable for desktop and mobile devices.
* Handle empty input and invalid configuration gracefully.
* Clearly indicate the currently selected generation options.

## Tech Stack

* Language: HTML, CSS, JavaScript
* Framework: TBD — prefer plain HTML/CSS/JS unless React/Vite provides a clear benefit
* Database: None
* Infrastructure: Static web host
* Other: QRCode.js 1.0.0 loaded from cdnjs

## Acceptance Criteria

* [x] The user can enter arbitrary text into the application.
* [x] The application generates a valid QR code representing the entered text.
* [x] The user can select the image output format.
* [x] The user can select the QR-code pixel size.
* [x] The user can select the error-correction percentage/level.
* [x] Changing the selected options produces QR output using those settings.
* [x] The generated QR code is displayed at the requested size.
* [x] The user can download the generated QR code as an image in the selected format.
* [x] Empty input is handled with a clear and useful message.
* [x] The application works without a server or backend.
* [x] The interface includes responsive desktop and mobile layouts.
* [x] Relevant tests and basic accessibility checks pass.
* [x] Required documentation is updated.

## Current Milestone

Initial implementation complete.

## Completed

* Selected a plain HTML, CSS, and JavaScript implementation.
* Added a client-side QR generation interface with text, size, format, and error-correction controls.
* Added PNG/JPEG download support and empty-input handling.
* Hardened option handling against invalid values and added accessible labels for generated output.
* Added an image-element download fallback for browsers where QRCode.js does not expose a canvas.
* Hardened downloads by attaching the download anchor before clicking and delaying blob URL cleanup.
* Verified QR generation and decoded the generated output back to the entered URL in headless Chromium.
* Verified PNG/JPEG output, option changes, empty input handling, invalid-option normalization, and mobile layout in headless Chromium.
* Completed basic accessibility checks for labelled controls, live status messaging, and generated-output labelling.

## In Progress

* None.

## Planned

* None for the initial scope.

## Blocked

* None.

## Known Limitations

* The supported image formats are PNG and JPEG.
* The available pixel sizes are 128, 256, 384, and 512 pixels.
* QR-code error correction is represented by levels L, M, Q, and H with their conventional approximate recovery percentages.
* Maximum supported input length may depend on the selected QR version and error-correction level.
* Generation depends on the browser being able to load the cdnjs-hosted QRCode.js library.

## Engineering Decisions

* QR generation should happen entirely client-side so that user-provided text does not need to be sent to a server.
* A small dedicated QR-code generation library should be preferred over implementing the QR standard from scratch.
* The application should use QR error-correction levels internally, with a user-facing percentage or equivalent representation if appropriate.
* Generated images should be created in the browser and exposed as downloadable files.
* The initial implementation should favor a minimal dependency footprint and simple static deployment.
* QRCode.js 1.0.0 is loaded from cdnjs to avoid introducing a local build pipeline; generation remains in the browser.
* The UI presents QR error-correction levels with their conventional approximate recovery percentages: L (7%), M (15%), Q (25%), and H (30%).
* PNG is the default export because it preserves the QR pixels without compression artifacts; JPEG remains available for compatibility.

## Notes

The application is intended to be a focused utility rather than a full QR-code design tool. The initial version should prioritize fast generation, a simple interface, predictable output, and privacy through client-side processing.
