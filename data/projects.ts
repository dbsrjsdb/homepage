// Add a URL only when a project is ready to open. External URLs work too.
export const projects = [
  {
    title: 'Image converter',
    description: 'A simpler way to give your images a new format.',
    category: 'Web apps',
    icon: 'image',
    href: null,
    status: 'Coming soon',
  },
  {
    title: 'Public chat',
    description: 'A little corner of the internet to say hello.',
    category: 'Hang out',
    icon: 'chat',
    href: null,
    status: 'Coming soon',
  },
  {
    title: 'App template',
    description: 'A shared home for the next thing I build.',
    category: 'Projects',
    icon: 'code',
    href: '/template',
    status: 'Preview',
  },
] as const;
