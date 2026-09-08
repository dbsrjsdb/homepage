import { notFound } from 'next/navigation';
import { AppDirectory } from '@/components/app-directory';
import { AppPage } from '@/components/app-page';
import { ScriptApp } from '@/components/script-app';
import { projects } from '@/data/projects';

type Props = { searchParams: Promise<{ app?: string | string[] }> };
export async function generateMetadata({ searchParams }: Props) {
  const { app: slug } = await searchParams;
  const app = projects.find((project) => project.slug === slug);
  return {
    title: `${app ? app.title + ' · ' : ''}Script apps · Meltyheart`,
    description:
      app?.description ||
      'A collection of 100 browser tools, games, and creative experiments.',
  };
}
export default async function Page({ searchParams }: Props) {
  const { app: slug } = await searchParams;
  if (slug !== undefined) {
    const app = projects.find((project) => project.slug === slug);
    if (!app) notFound();
    return (
      <AppPage
        title={app.title}
        description={app.description}
        backHref="/script-apps"
        backLabel="All script apps"
      >
        <div className="workspace-toolbar">
          <span>
            <span className="tiny-dot" />
            {app.category}
          </span>
          <span>Script apps / #{app.slug.slice(0, 3)}</span>
        </div>
        <ScriptApp key={app.slug} slug={app.slug} title={app.title} />
      </AppPage>
    );
  }
  return (
    <main id="main-content" className="page library-page">
      <div className="page-breadcrumb">
        Explore <span>/</span> Script apps
      </div>
      <div className="page-heading">
        <span className="eyebrow">THE BROWSER COLLECTION</span>
        <h1>Script apps</h1>
        <p>
          Small, handy, and ready to play. Find a tool or try something new.
        </p>
      </div>
      <AppDirectory />
    </main>
  );
}
