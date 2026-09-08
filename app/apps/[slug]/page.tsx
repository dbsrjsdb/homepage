import { notFound, permanentRedirect } from 'next/navigation';
import { projects } from '@/data/projects';

// Keep existing bookmarks working while grouping scripts under one library page.
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!projects.some((project) => project.slug === slug)) notFound();
  permanentRedirect(`/script-apps?app=${slug}`);
}
