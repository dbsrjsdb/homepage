# Meltyheart homepage

A simple personal project directory and matching app-page template. Responsive blue-and-white design, shared navigation, keyboard focus styles, and a skip-to-content link.

Image converter and public chat are **upcoming project examples**, not working applications. The template preview is available at `/template`. No database, chat service, or upload backend is included.

## Run locally

Requires Node.js 22.13 or newer and npm.

```sh
npm ci
npm run dev
```

Open the local URL printed by the development server.

```sh
npm run check
npm run build
```

## Structure

```text
app/
  layout.tsx          Shared header, footer, and site metadata
  page.tsx            Homepage
  globals.css         Responsive styles for every page
  template/page.tsx   App-template preview
components/
  app-page.tsx        Reusable app title and content container
  site-header.tsx     Shared navigation and active-page state
  ui/                UI primitives supplied by the Sites starter
data/projects.ts    Project cards, descriptions, links, and statuses
templates/app-page.tsx  Copyable page starter
public/             Static assets (favicon, future images/scripts)
docs/adding-apps.md  Instructions for adding React or existing HTML apps
.github/workflows/check.yml  GitHub build and type checks
```

## Customize

- Change the site name in `app/layout.tsx` and `components/site-header.tsx`.
- Edit the introduction in `app/page.tsx`.
- Add projects and links in `data/projects.ts`. Leave `href: null` for upcoming projects; set a real local path or HTTPS URL when ready.
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

If Git is already initialized or the changes are committed, skip those steps. No license is selected; add your preferred license before inviting reuse.

## Hosting

Built with React, TypeScript, and Vinext using the Sites starter. The production build targets Cloudflare Workers; uploading the source to GitHub does not deploy it. GitHub Pages cannot run this Worker build directly. Sites hosting configuration lives in `.openai/hosting.json`; its project ID is not a secret. When creating an independent Sites copy, remove that project ID and register a new site. The GitHub workflow validates source and does not publish it.
