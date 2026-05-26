import type { TokenRow } from '../components/TokenTable/TokenTable';

const buildRoleTokens = (role: string, hexes: Record<string, string>): TokenRow[] => [
  {
    variable: `color${role}Bg`,
    group: 'Map',
    value: hexes.bg,
    description: `Lightest ${role.toLowerCase()} tint — subtle background fills behind ${role.toLowerCase()} content.`,
  },
  {
    variable: `color${role}BgHover`,
    group: 'Map',
    value: hexes.bgHover,
    description: `Hover state for ${role.toLowerCase()} background fills.`,
  },
  {
    variable: `color${role}Border`,
    group: 'Map',
    value: hexes.border,
    description: `Border color for ${role.toLowerCase()} components and outlined buttons.`,
  },
  {
    variable: `color${role}BorderHover`,
    group: 'Map',
    value: hexes.borderHover,
    description: `Hover state for ${role.toLowerCase()} borders.`,
  },
  {
    variable: `color${role}Hover`,
    group: 'Map',
    value: hexes.hover,
    description: `Hover state of the solid ${role.toLowerCase()} color.`,
  },
  {
    variable: `color${role}`,
    group: 'Map',
    value: hexes.base,
    description: `Base ${role.toLowerCase()} color — used on solid surfaces and primary actions.`,
  },
  {
    variable: `color${role}Active`,
    group: 'Map',
    value: hexes.active,
    description: `Active or pressed state of the solid ${role.toLowerCase()} color.`,
  },
  {
    variable: `color${role}TextHover`,
    group: 'Map',
    value: hexes.textHover,
    description: `Hover state for ${role.toLowerCase()} text and links.`,
  },
  {
    variable: `color${role}Text`,
    group: 'Map',
    value: hexes.text,
    description: `Default text color for ${role.toLowerCase()} messaging.`,
  },
  {
    variable: `color${role}TextActive`,
    group: 'Map',
    value: hexes.textActive,
    description: `Active state for ${role.toLowerCase()} text and links.`,
  },
];

// Primary — Cyan 500 base. The brand accent per BRAND.md.
export const primaryTokens: TokenRow[] = buildRoleTokens('Primary', {
  bg: '#ecfeff',
  bgHover: '#cffafe',
  border: '#a5f3fc',
  borderHover: '#67e8f9',
  hover: '#22d3ee',
  base: '#06b6d4',
  active: '#0e7490',
  textHover: '#06b6d4',
  text: '#0891b2',
  textActive: '#0e7490',
});

export const successTokens: TokenRow[] = buildRoleTokens('Success', {
  bg: '#ecfdf5',
  bgHover: '#d1fae5',
  border: '#a7f3d0',
  borderHover: '#6ee7b7',
  hover: '#34d399',
  base: '#10b981',
  active: '#047857',
  textHover: '#10b981',
  text: '#059669',
  textActive: '#047857',
});

export const warningTokens: TokenRow[] = buildRoleTokens('Warning', {
  bg: '#fffbeb',
  bgHover: '#fef3c7',
  border: '#fde68a',
  borderHover: '#fcd34d',
  hover: '#fbbf24',
  base: '#f59e0b',
  active: '#b45309',
  textHover: '#d97706',
  text: '#b45309',
  textActive: '#92400e',
});

// Info — alias of Primary, also cyan.
export const infoTokens: TokenRow[] = buildRoleTokens('Info', {
  bg: '#ecfeff',
  bgHover: '#cffafe',
  border: '#a5f3fc',
  borderHover: '#67e8f9',
  hover: '#22d3ee',
  base: '#06b6d4',
  active: '#0e7490',
  textHover: '#06b6d4',
  text: '#0891b2',
  textActive: '#0e7490',
});

export const errorTokens: TokenRow[] = buildRoleTokens('Error', {
  bg: '#fef2f2',
  bgHover: '#fee2e2',
  border: '#fecaca',
  borderHover: '#fca5a5',
  hover: '#f87171',
  base: '#ef4444',
  active: '#b91c1c',
  textHover: '#ef4444',
  text: '#dc2626',
  textActive: '#b91c1c',
});

export const linkTokens: TokenRow[] = [
  { variable: 'colorLink', group: 'Map', value: '#0891b2', description: 'Default hyperlink color — Cyan 600 for accessible contrast on white.' },
  { variable: 'colorLinkHover', group: 'Map', value: '#06b6d4', description: 'Hyperlink hover — brand Cyan 500.' },
  { variable: 'colorLinkActive', group: 'Map', value: '#0e7490', description: 'Hyperlink active / visited — Cyan 700.' },
];

export const controlTokens: TokenRow[] = [
  { variable: 'controlOutline', group: 'Alias', value: 'colorPrimaryBg', description: 'Focus ring color surrounding active form controls.' },
  { variable: 'shadowFocus', group: 'Map', value: '0 0 0 3px rgba(6, 182, 212, 0.35)', description: 'Box-shadow used as the focus ring across components.' },
  { variable: 'controlItemBgHover', group: 'Alias', value: 'colorFillTertiary', description: 'Hover background for items inside controls such as selects.' },
  { variable: 'controlItemBgActive', group: 'Alias', value: 'colorPrimaryBg', description: 'Active / selected background inside controls.' },
  { variable: 'controlItemBgActiveHover', group: 'Alias', value: 'colorPrimaryBgHover', description: 'Hover state on an already-selected control item.' },
];
