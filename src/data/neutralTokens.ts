import type { TokenRow } from '../components/TokenTable/TokenTable';

export const textTokens: TokenRow[] = [
  { variable: 'colorText', group: 'Map', value: '#18181b', description: 'Default body text color — Zinc 900.' },
  { variable: 'colorTextSecondary', group: 'Map', value: '#3f3f46', description: 'Less prominent text such as labels and metadata — Zinc 700.' },
  { variable: 'colorTextTertiary', group: 'Map', value: '#71717a', description: 'De-emphasized text such as placeholders and helper copy — Zinc 500.' },
  { variable: 'colorTextQuaternary', group: 'Map', value: '#a1a1aa', description: 'Faintest tier — reserved for disabled or decorative labels — Zinc 400.' },
  { variable: 'colorTextHeading', group: 'Map', value: '#09090b', description: 'Headings render against the darkest neutral — Zinc 950.' },
  { variable: 'colorTextInverse', group: 'Map', value: '#fafafa', description: 'Text used on dark surfaces such as the brand hero — Zinc 50.' },
  { variable: 'colorTextLabel', group: 'Alias', value: 'colorTextSecondary', description: 'Form labels and inline annotations.' },
  { variable: 'colorTextDescription', group: 'Alias', value: 'colorTextTertiary', description: 'Descriptive helper text under fields and components.' },
  { variable: 'colorTextDisabled', group: 'Alias', value: 'colorTextQuaternary', description: 'Disabled controls and dimmed elements.' },
  { variable: 'colorTextPlaceholder', group: 'Alias', value: 'colorTextQuaternary', description: 'Input placeholder text.' },
];

export const iconTokens: TokenRow[] = [
  { variable: 'colorIcon', group: 'Alias', value: 'colorTextTertiary', description: 'Default icon color in idle state.' },
  { variable: 'colorIconHover', group: 'Alias', value: 'colorText', description: 'Icon color on hover.' },
];

export const backgroundTokens: TokenRow[] = [
  { variable: 'colorBgBase', group: 'Seed', value: '#ffffff', description: 'Underlying light-mode background of the system.' },
  { variable: 'colorBgContainer', group: 'Map', value: '#ffffff', description: 'Background of cards, modals, and content containers.' },
  { variable: 'colorBgElevated', group: 'Map', value: '#ffffff', description: 'Elevated surfaces such as popovers, dropdowns, and tooltips.' },
  { variable: 'colorBgLayout', group: 'Map', value: '#fafafa', description: 'Page-level background behind containers — Zinc 50.' },
  { variable: 'colorBgSubtle', group: 'Map', value: '#f4f4f5', description: 'Subtle alternating background — Zinc 100.' },
  { variable: 'colorBgDark', group: 'Map', value: '#09090b', description: 'Brand dark surface — Zinc 950. Used for the hero and footer.' },
  { variable: 'colorBgMask', group: 'Map', value: 'rgba(9, 9, 11, 0.45)', description: 'Overlay used for modal masks and scrims.' },
  { variable: 'colorBgSpotlight', group: 'Alias', value: 'colorZinc900', description: 'Inverted background used for popovers in light theme.' },
];

export const borderTokens: TokenRow[] = [
  { variable: 'colorBorder', group: 'Map', value: '#e4e4e7', description: 'Default border color for inputs, dividers, and surfaces — Zinc 200.' },
  { variable: 'colorBorderSecondary', group: 'Map', value: '#f4f4f5', description: 'Lighter border tier for grouped surfaces — Zinc 100.' },
  { variable: 'colorSplit', group: 'Alias', value: 'colorBorder', description: 'Subtle divider overlaid on backgrounds.' },
];

export const fillTokens: TokenRow[] = [
  { variable: 'colorFill', group: 'Map', value: '#d4d4d8', description: 'Strongest neutral fill — Zinc 300.' },
  { variable: 'colorFillSecondary', group: 'Map', value: '#e4e4e7', description: 'Mid-tier fill for hover states — Zinc 200.' },
  { variable: 'colorFillTertiary', group: 'Map', value: '#f4f4f5', description: 'Light fill for resting hover indicators — Zinc 100.' },
  { variable: 'colorFillQuaternary', group: 'Map', value: '#fafafa', description: 'Faintest fill for subtle alternation in tables — Zinc 50.' },
  { variable: 'colorFillAlter', group: 'Alias', value: 'colorFillQuaternary', description: 'Alternation background used in tables.' },
];
