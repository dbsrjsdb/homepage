import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';

export function AppPage({
  title,
  description,
  children,
  backHref = '/',
  backLabel = 'Home',
}: {
  title: string;
  description: string;
  children: ReactNode;
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <main id="main-content" className="page app-page">
      <Link className="back-link" href={backHref}>
        <ArrowLeft size={16} /> {backLabel}
      </Link>
      <div className="app-heading">
        <span className="eyebrow">THE WORKSPACE</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <section className="app-workspace" aria-label={title}>
        {children}
      </section>
    </main>
  );
}
