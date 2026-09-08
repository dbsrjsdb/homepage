'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Asterisk,
  Home,
  Code2,
  MessageCircle,
  Download,
  PanelLeft,
  LayoutTemplate,
  ChevronDown,
} from 'lucide-react';
import { projectPages } from '@/data/navigation';

const icons = { code: Code2, chat: MessageCircle, download: Download };
export function SiteSidebar() {
  const pathname = usePathname();
  const navigation = (
    <nav aria-label="Main navigation">
      <span className="nav-group">OVERVIEW</span>
      <Link href="/" aria-current={pathname === '/' ? 'page' : undefined}>
        <Home size={18} /> Home
      </Link>
      <span className="nav-group">EXPLORE</span>
      {projectPages.map((page) => {
        const Icon = icons[page.icon];
        return (
          <Link
            key={page.href}
            href={page.href}
            aria-current={pathname === page.href ? 'page' : undefined}
          >
            <Icon size={18} />
            <span>{page.title}</span>
            {!page.available && <span className="nav-soon">Soon</span>}
          </Link>
        );
      })}
      <span className="nav-group">BUILD</span>
      <Link
        href="/template"
        aria-current={pathname === '/template' ? 'page' : undefined}
      >
        <LayoutTemplate size={18} /> Page template
      </Link>
    </nav>
  );
  return (
    <aside className="site-sidebar">
      <Link className="brand" href="/" aria-label="Meltyheart home">
        <span className="brand-mark">
          <Asterisk size={25} />
        </span>
        meltyheart<span className="brand-dot">.</span>
      </Link>
      <div className="desktop-navigation">{navigation}</div>
      <details className="mobile-navigation" key={pathname}>
        <summary>
          <PanelLeft size={18} /> Navigate <ChevronDown size={16} />
        </summary>
        {navigation}
      </details>
      <div className="sidebar-note">
        <span className="tiny-dot" /> A little space for big ideas.
      </div>
    </aside>
  );
}
