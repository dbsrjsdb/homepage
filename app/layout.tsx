import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import './globals.css';

export const metadata: Metadata = {
  title: 'Meltyheart · Small projects & useful things',
  description:
    'A personal collection of handy web apps, side projects, and things just for fun.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <footer className="site-footer">
          <span>© {new Date().getFullYear()} Meltyheart</span>
          <span>Made with curiosity.</span>
          <Link href="/">Back to home ↑</Link>
        </footer>
      </body>
    </html>
  );
}
