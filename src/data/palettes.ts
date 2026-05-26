import type { SwatchRow } from '../components/SwatchTable/SwatchTable';

// Tailwind 11-step scale (50, 100, 200, …, 950).
const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

const buildRows = (prefix: string, hexes: string[]): SwatchRow[] =>
  hexes.map((hex, idx) => ({
    step: STEPS[idx],
    variable: `--color-${prefix}-${STEPS[idx]}`,
    value: hex,
  }));

export const palettes = [
  {
    name: 'Cyan — brand',
    rows: buildRows('cyan', [
      '#ecfeff', '#cffafe', '#a5f3fc', '#67e8f9', '#22d3ee',
      '#06b6d4', '#0891b2', '#0e7490', '#155e75', '#164e63', '#083344',
    ]),
  },
  {
    name: 'Zinc — neutral',
    rows: buildRows('zinc', [
      '#fafafa', '#f4f4f5', '#e4e4e7', '#d4d4d8', '#a1a1aa',
      '#71717a', '#52525b', '#3f3f46', '#27272a', '#18181b', '#09090b',
    ]),
  },
  {
    name: 'Emerald — success',
    rows: buildRows('emerald', [
      '#ecfdf5', '#d1fae5', '#a7f3d0', '#6ee7b7', '#34d399',
      '#10b981', '#059669', '#047857', '#065f46', '#064e3b', '#022c22',
    ]),
  },
  {
    name: 'Amber — warning',
    rows: buildRows('amber', [
      '#fffbeb', '#fef3c7', '#fde68a', '#fcd34d', '#fbbf24',
      '#f59e0b', '#d97706', '#b45309', '#92400e', '#78350f', '#451a03',
    ]),
  },
  {
    name: 'Red — error',
    rows: buildRows('red', [
      '#fef2f2', '#fee2e2', '#fecaca', '#fca5a5', '#f87171',
      '#ef4444', '#dc2626', '#b91c1c', '#991b1b', '#7f1d1d', '#450a0a',
    ]),
  },
];
