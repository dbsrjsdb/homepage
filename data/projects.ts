import apps from './apps.json' with { type: 'json' };
export const projects = apps;
export const categories = [
  ...new Set(projects.map((project) => project.category)),
];
export function filterProjects(query: string, category: string) {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  return projects.filter(
    (project) =>
      (category === 'All' || project.category === category) &&
      terms.every((term) =>
        `${project.title} ${project.description} ${project.category}`
          .toLowerCase()
          .includes(term),
      ),
  );
}
