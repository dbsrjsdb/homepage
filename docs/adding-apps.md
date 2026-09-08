# Adding and editing apps

## Imported script apps

`scriptapps/` is the editable source collection. Each numbered folder contains its original HTML, CSS, JavaScript and README. The root `scriptapp_list.md` supplies readable names for apps 002–100; the original hub supplies descriptions and categories. App 001 is Text to QR Code.

`node scripts/import-apps.mjs` builds the public copies in `public/embedded/apps/` and the catalog in `data/apps.json`. It runs automatically before `npm run dev` and `npm run build`. Generated public copies are ignored by Git; edit the originals, then rerun the import command (restart the development server after changes).

The homepage supports text search and category filters. `/script-apps?app=<slug>` opens each app inside the single Script apps section and wraps it with the shared header, title, category bar, and footer. Each app runs in a separate same-origin iframe to avoid collisions between its globals, styles, keyboard handlers, and other apps. Navigating away destroys that frame, including its timers and audio context.

`public/embedded/theme.css` removes the duplicate hero, standardizes spacing, corners and focus states, and preserves app-specific canvas and game colors. `public/embedded/frame.js` reports content height to the parent; the parent validates the message origin and sending frame before resizing. Very long content is capped at 16,000px and remains scrollable in the frame.

The frames run trusted repository scripts, not arbitrary user-supplied executable code. Browser microphone and clipboard permission prompts still apply. Existing localStorage keys are preserved. Storage is local to the site origin and will not migrate automatically from a previous domain.

### Add app 101 or later

1. Add its folder under `scriptapps/`, with `index.html`, `styles.css` and `script.js`.
2. Add its metadata row in the original hub's `applications` array and append a matching name/description line to `scriptapp_list.md`.
3. Update the explicit expected catalog/list counts in `scripts/import-apps.mjs` and the integration check. These checks deliberately catch accidentally missing apps.
4. Run the import command, `npm test`, `npm run check`, and `npm run build`.

## Native React app

Copy `templates/app-page.tsx` to `app/your-app/page.tsx`. Replace the content inside `AppPage` with your component. The root layout supplies navigation and footer. For browser APIs, create a nearby component with `'use client';` and render it inside the page.

## External services and supplied-app limitations

- Text to QR Code loads QRCode.js from cdnjs; QR Code Reader loads jsQR from jsDelivr. Their code libraries require connectivity; image/text processing happens in the browser.
- README Badge Builder loads previews from Shields.io. Badge text and settings are sent to that service.
- The password and passphrase tools use small supplied word lists. Memorable-password strength is now shown as not estimated, and low-entropy passphrases are labeled weak.
- The catalog descriptions summarize the supplied implementations, which may be narrower than the ideas in `scriptapp_list.md`. Integration checks cover catalog completeness, local asset paths, JavaScript syntax, filtering, frame sizing and the corrected strength labels. They do not certify every app's algorithms or browser-specific behavior.
- Public chat is not in this collection and has not been implemented.

## Site navigation

`components/site-sidebar.tsx` is the shared desktop sidebar and collapsible mobile navigation. `data/navigation.ts` defines the main project areas shown in the sidebar and homepage.

- `/`: overview of project areas
- `/script-apps`: searchable library of all 100 scripts; `?app=<slug>` opens a tool within the same page
- `/chat`: dedicated placeholder for a future chat app
- `/installable-apps`: dedicated placeholder for future downloads
- `/template`: reusable page template

Legacy `/apps/[slug]` bookmarks redirect to the library. Add future major apps as their own `app/<name>/page.tsx` route and a record in `data/navigation.ts`. `AppPage` accepts optional `backHref` and `backLabel`; the default returns to Home.
