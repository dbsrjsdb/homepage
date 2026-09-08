import Link from 'next/link';
import {
  ArrowUpRight,
  Code2,
  MessageCircle,
  Download,
  ArrowRight,
  FolderOpen,
  LayoutTemplate,
  Home as HomeIcon,
  ChevronRight,
} from 'lucide-react';
import { projectPages } from '@/data/navigation';
const icons = { code: Code2, chat: MessageCircle, download: Download };

export default function Home() {
  return (
    <main id="main-content" className="page home-page">
      <div className="page-breadcrumb">
        <HomeIcon size={15} aria-hidden="true" /> Overview{' '}
        <ChevronRight size={14} aria-hidden="true" /> Home
      </div>
      <section className="home-intro">
        <span className="eyebrow">
          <span className="tiny-dot" /> WELCOME TO MY CORNER
        </span>
        <h1>
          A place for things
          <br />
          <span>I love building.</span>
        </h1>
        <p>
          Hi, I’m Meltyheart. Explore a collection of useful tools,
          <br className="desktop-break" /> playful experiments, and projects
          with room to grow.
        </p>
      </section>
      <div className="collection-layout">
        <section aria-labelledby="spaces-heading">
          <div className="section-heading">
            <h2 id="spaces-heading">
              <FolderOpen size={23} aria-hidden="true" /> Explore the projects{' '}
              <span className="count">{projectPages.length}</span>
            </h2>
            <span className="section-note">
              Find your next little discovery.
            </span>
          </div>
          <div className="project-grid destination-grid">
            {projectPages.map((page) => {
              const Icon = icons[page.icon];
              return (
                <Link
                  className="project-card open-card destination-card"
                  key={page.href}
                  href={page.href}
                >
                  <div className="card-top">
                    <span className={`project-icon ${page.icon}`}>
                      <Icon size={26} />
                    </span>
                    <span className={`status ${page.available ? 'ready' : ''}`}>
                      {page.status}
                    </span>
                  </div>
                  <span className="eyebrow">{page.category}</span>
                  <h3>{page.title}</h3>
                  <p>{page.description}</p>
                  <div className="card-bottom">
                    {page.available ? 'Explore collection' : 'View page'}
                    <ArrowUpRight size={18} />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
        <aside className="collection-rail" aria-label="Quick links">
          <h2>
            <FolderOpen size={18} aria-hidden="true" /> Project spaces
          </h2>
          <nav aria-label="Project shortcuts">
            {projectPages.map((page) => {
              const Icon = icons[page.icon];
              return (
                <Link key={page.href} href={page.href}>
                  <Icon size={17} aria-hidden="true" />
                  <span>{page.title}</span>
                  <ChevronRight size={15} aria-hidden="true" />
                </Link>
              );
            })}
          </nav>
          <h2>
            <LayoutTemplate size={18} aria-hidden="true" /> Start building
          </h2>
          <Link className="rail-button" href="/template">
            <LayoutTemplate size={17} aria-hidden="true" /> Page template{' '}
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </aside>
      </div>
      <Link className="library-banner" href="/script-apps">
        <span className="banner-icon">
          <Code2 size={25} />
        </span>
        <div>
          <strong>One collection. A hundred possibilities.</strong>
          <p>Convert an image, make music, or take a quick game break.</p>
        </div>
        <ArrowRight size={22} />
      </Link>
    </main>
  );
}
