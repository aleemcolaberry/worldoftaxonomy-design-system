export interface NavItem {
  to: string;
  label: string;
  badge?: 'new' | 'beta';
}

export interface NavGroup {
  group: string;
  items: NavItem[];
}

export const navConfig: NavGroup[] = [
  {
    group: 'Getting Started',
    items: [
      { to: '/', label: 'Introduction' },
    ],
  },
  {
    group: 'Foundations',
    items: [
      { to: '/typography/font-family', label: 'Font Family' },
      { to: '/typography/text-styles', label: 'Text Styles' },
      { to: '/colors/palettes', label: 'Color Palettes' },
      { to: '/colors/neutral', label: 'Neutral Colors' },
      { to: '/colors/brand', label: 'Brand Colors' },
    ],
  },
  {
    group: 'Components',
    items: [
      { to: '/components/button', label: 'Button' },
      { to: '/components/button-group', label: 'Button Group' },
      { to: '/components/button-compact', label: 'Button Compact' },
    ],
  },
  {
    group: 'Demos',
    items: [
      { to: '/showcase', label: 'Showcase' },
      { to: '/playground', label: 'Playground', badge: 'new' },
    ],
  },
];
