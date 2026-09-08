# Meltyheart homepage

A simple personal project directory and matching app-page template. Responsive blue-and-white design, shared navigation, keyboard focus styles, and a skip-to-content link.

Includes all **100 supplied script apps**, with search, categories and a single library page at `/script-apps` (tools open with `?app=<slug>`). The template remains available at `/template`. Apps retain their original behavior and local storage. Public chat is not included.

## Run locally

Requires Node.js 22.13 or newer and npm.

```sh
npm ci
npm run dev
```

Open the local URL printed by the development server.

```sh
node scripts/import-apps.mjs
npm test
npm run check
npm run build
```

## Structure

```text
app/
  layout.tsx          Shared sidebar, footer, and site metadata
  page.tsx            Homepage
  globals.css         Responsive styles for every page
  template/page.tsx   App-template preview
  script-apps/page.tsx Script library and selected app workspace
  chat/page.tsx       Dedicated chat placeholder
  installable-apps/page.tsx Dedicated downloads placeholder
  apps/[slug]/page.tsx Redirects for existing bookmarks
components/
  app-page.tsx        Reusable app title and content container
  site-sidebar.tsx    Desktop sidebar and collapsible mobile navigation
  ui/                UI primitives supplied by the Sites starter
data/navigation.ts  Main project areas
data/projects.ts    Script catalog search and categories
data/apps.json      Generated app metadata
scriptapps/         Editable source for 100 apps and their original hub
scripts/            App importer
tests/              Runnable integration checks
templates/app-page.tsx  Copyable page starter
public/             Static assets (favicon, future images/scripts)
docs/adding-apps.md  Instructions for adding React or existing HTML apps
.github/workflows/check.yml  GitHub build and type checks
```

## Customize

- Change the site name in `app/layout.tsx` and `components/site-sidebar.tsx`.
- Edit the introduction in `app/page.tsx`.
- Edit apps in `scriptapps/`, then run `node scripts/import-apps.mjs`. See [Adding apps](docs/adding-apps.md) for the catalog and import workflow.
- Change colors and spacing in `app/globals.css`.
- Follow [Adding apps](docs/adding-apps.md) to use the shared template.

## Upload to GitHub

This directory is ready for a GitHub repository. Dependencies, generated output, and local secrets are ignored. Create an empty GitHub repository, then from this directory:

```sh
git init -b main
git add .
git commit -m "Create personal homepage"
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

If Git is already initialized or the changes are committed, skip those steps. No repository-wide license is selected; review the supplied app notices and add your preferred license before inviting reuse.

## Hosting

Built with React, TypeScript, and Vinext using the Sites starter. The production build targets Cloudflare Workers; uploading the source to GitHub does not deploy it. GitHub Pages cannot run this Worker build directly. Sites hosting configuration lives in `.openai/hosting.json`; its project ID is not a secret. When creating an independent Sites copy, remove that project ID and register a new site. The GitHub workflow validates source and does not publish it.
