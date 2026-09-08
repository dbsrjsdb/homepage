// Copy to app/your-app/page.tsx. Shared navigation comes from app/layout.tsx.
// For browser APIs or interactive state, place a 'use client' component
// alongside the page and render it inside AppPage.
import { AppPage } from '@/components/app-page';

export const metadata = { title: 'Your app · Meltyheart' };

export default function Page() {
  return (
    <AppPage
      title="Your app"
      description="A short description of what it does."
    >
      <div style={{ padding: '24px' }}>
        {/* Replace this area with your app component. */}
        <p>Your content goes here.</p>
      </div>
    </AppPage>
  );
}
