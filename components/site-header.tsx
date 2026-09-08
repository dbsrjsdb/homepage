'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Asterisk } from 'lucide-react';

export function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="Meltyheart home">
          <span className="brand-mark">
            <Asterisk size={26} />
          </span>
          meltyheart<span className="brand-dot">.</span>
        </Link>
        <nav aria-label="Main navigation">
          <Link href="/" aria-current={pathname === '/' ? 'page' : undefined}>
            Home
          </Link>
          <Link href="/#projects">Projects</Link>
          <Link
            href="/template"
            aria-current={pathname === '/template' ? 'page' : undefined}
          >
            App template <ArrowUpRight size={15} />
          </Link>
        </nav>
      </div>
    </header>
  );
}
