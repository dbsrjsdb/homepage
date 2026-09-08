export const projectPages = [
  {
    href: '/script-apps',
    title: 'Script apps',
    icon: 'code',
    category: 'BROWSER COLLECTION',
    description:
      'Quick tools, little games, and creative experiments. Pick one and jump in.',
    status: '100 apps',
    available: true,
  },
  {
    href: '/chat',
    title: 'Chat',
    icon: 'chat',
    category: 'CONNECT',
    description: 'A dedicated place for conversations and community.',
    status: 'Coming soon',
    available: false,
  },
  {
    href: '/installable-apps',
    title: 'Installable apps',
    icon: 'download',
    category: 'ON YOUR DEVICE',
    description: 'A home for apps you can download and make your own.',
    status: 'Coming soon',
    available: false,
  },
] as const;
