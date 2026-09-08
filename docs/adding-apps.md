# Add an app

1. Copy `templates/app-page.tsx` into `app/your-app/page.tsx`.
2. Set the title, description, and metadata.
3. Replace the content inside `AppPage` with your app. The root layout automatically supplies the same navigation and footer as the homepage.
4. Add a record in `data/projects.ts` with `href: '/your-app'`, a suitable status, and one of the existing icons (`image`, `chat`, or `code`).
5. Run `npm run check` and `npm run build`.

## Interactive React app

Keep the page as a server component and create `app/your-app/tool.tsx` with `'use client';` on its first line. Export your interactive component, import it into the page, and render it inside `AppPage`. Use browser APIs in event handlers or effects. Never put API secrets in client components or public files.

## Existing HTML / JavaScript app

Place your app's files in `public/apps/your-app/` with an `index.html`, keeping its relative script and style paths. In the page's `AppPage`, render:

```tsx
<iframe
  title="Your app"
  src="/apps/your-app/index.html"
  style={{ width: '100%', minHeight: '70vh', border: 0 }}
/>
```

Use this for your own trusted scripts. The outer page retains the shared navigation. Do not put another site header inside the embedded app. An iframe has its own styles; update those separately if needed.

## Public chat

The homepage card is a placeholder. A real shared chat needs a server or hosted chat service, persistent messages, input validation, abuse protection, and moderation. Browser-local storage would not make a public chat. Implement the service before changing the card to a live URL.
