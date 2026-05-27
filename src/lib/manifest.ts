/**
 * WoT AI Design System — component manifest.
 *
 * Single source of truth describing every component the LLM is allowed to
 * generate. Used by:
 *   - The /api/generate serverless function to build a system prompt.
 *   - The renderTree() function to whitelist what's safe to render.
 *
 * Renderer and LLM both read the same shape, so adding a new component is
 * a one-place change.
 */

export type PropKind =
  | { type: 'string' }
  | { type: 'number' }
  | { type: 'boolean'; default?: boolean }
  | { type: 'enum'; values: readonly string[]; default?: string }
  | { type: 'node' }; // ReactNode / children

export interface ComponentProp {
  description: string;
  kind: PropKind;
  required?: boolean;
}

export interface ComponentEntry {
  name: string;
  description: string;
  props: Record<string, ComponentProp>;
  acceptsChildren: boolean;
  childrenNote?: string;
}

/* ───── Whitelisted HTML primitives for layout / text ───── */

export const HTML_TAGS = [
  // layout
  'div', 'span', 'section', 'header', 'footer', 'main', 'nav', 'article', 'aside',
  // text
  'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'em', 'small', 'br', 'hr', 'code', 'pre',
  // lists
  'ul', 'ol', 'li',
  // forms (we render real WoT form components, but keep these for grouping)
  'form', 'fieldset', 'legend', 'label',
  // anchor / image — restricted at render time
  'a', 'img',
] as const;

/* ───── Components ───── */

export const COMPONENTS: ComponentEntry[] = [
  {
    name: 'Button',
    description: 'Triggers an action. Use one primary per surface.',
    acceptsChildren: true,
    childrenNote: 'The button label (text), or an icon SVG when iconOnly is true.',
    props: {
      variant: { description: 'Visual variant.', kind: { type: 'enum', values: ['primary', 'default', 'dashed', 'text', 'link'], default: 'default' } },
      size: { description: 'Control height: 24 / 32 / 40 px.', kind: { type: 'enum', values: ['sm', 'md', 'lg'], default: 'md' } },
      danger: { description: 'Layer the error palette on top of the variant.', kind: { type: 'boolean', default: false } },
      iconOnly: { description: 'Render as a square button; children should be an icon.', kind: { type: 'boolean', default: false } },
      loading: { description: 'Show a spinner and disable the button.', kind: { type: 'boolean', default: false } },
      block: { description: 'Stretch to fill the container width.', kind: { type: 'boolean', default: false } },
      disabled: { description: 'Standard HTML disabled state.', kind: { type: 'boolean', default: false } },
      shape: { description: 'Border-radius preset.', kind: { type: 'enum', values: ['default', 'round', 'circle'], default: 'default' } },
      'aria-label': { description: 'Required when iconOnly is true.', kind: { type: 'string' } },
    },
  },
  {
    name: 'ButtonGroup',
    description: 'Cluster related actions. Compact mode merges adjacent borders into a single hairline.',
    acceptsChildren: true,
    childrenNote: 'One or more Button elements.',
    props: {
      orientation: { description: 'Stacking direction.', kind: { type: 'enum', values: ['horizontal', 'vertical'], default: 'horizontal' } },
      compact: { description: 'Merge adjacent borders (toolbar / segmented-control look).', kind: { type: 'boolean', default: false } },
    },
  },
  {
    name: 'Input',
    description: 'A text field with optional label, helper text, error state, prefix and suffix slots.',
    acceptsChildren: false,
    props: {
      label: { description: 'Label rendered above the input.', kind: { type: 'string' } },
      helper: { description: 'Helper text below the field.', kind: { type: 'string' } },
      error: { description: 'Error message; promotes the field to error state.', kind: { type: 'string' } },
      size: { description: 'Field height.', kind: { type: 'enum', values: ['sm', 'md', 'lg'], default: 'md' } },
      placeholder: { description: 'Placeholder shown when empty.', kind: { type: 'string' } },
      type: { description: 'HTML input type (text, email, password, number, search, url, tel).', kind: { type: 'string' } },
      optional: { description: 'Mark as optional in the label.', kind: { type: 'boolean', default: false } },
      disabled: { description: 'Non-interactive, dimmed.', kind: { type: 'boolean', default: false } },
      defaultValue: { description: 'Initial value (uncontrolled).', kind: { type: 'string' } },
    },
  },
  {
    name: 'Select',
    description: 'Styled wrapper around native <select>. Provide options via the options prop.',
    acceptsChildren: false,
    props: {
      label: { description: 'Label above the select.', kind: { type: 'string' } },
      helper: { description: 'Helper text below the field.', kind: { type: 'string' } },
      error: { description: 'Error message.', kind: { type: 'string' } },
      size: { description: 'Field height.', kind: { type: 'enum', values: ['sm', 'md', 'lg'], default: 'md' } },
      placeholder: { description: 'Shown when no value is selected.', kind: { type: 'string' } },
      optional: { description: 'Mark as optional in the label.', kind: { type: 'boolean', default: false } },
      disabled: { description: 'Non-interactive.', kind: { type: 'boolean', default: false } },
      defaultValue: { description: 'Initial selected value.', kind: { type: 'string' } },
      options: { description: 'Array of {value, label, disabled?} entries.', kind: { type: 'node' } },
    },
  },
  {
    name: 'Checkbox',
    description: 'Boolean form control with label and optional description.',
    acceptsChildren: false,
    props: {
      label: { description: 'Label to the right of the box.', kind: { type: 'string' } },
      description: { description: 'Optional secondary line below the label.', kind: { type: 'string' } },
      defaultChecked: { description: 'Initial state (uncontrolled).', kind: { type: 'boolean' } },
      disabled: { description: 'Non-interactive.', kind: { type: 'boolean', default: false } },
    },
  },
  {
    name: 'RadioGroup',
    description: 'Wrapper around one or more Radio children that share a name and value.',
    acceptsChildren: true,
    childrenNote: 'One or more Radio elements.',
    props: {
      name: { description: 'Form field name shared by children.', kind: { type: 'string' } },
      defaultValue: { description: 'Initially-selected child value.', kind: { type: 'string' } },
      orientation: { description: 'Stacking direction.', kind: { type: 'enum', values: ['horizontal', 'vertical'], default: 'vertical' } },
    },
  },
  {
    name: 'Radio',
    description: 'Single-select option used inside a RadioGroup.',
    acceptsChildren: false,
    props: {
      value: { description: 'Unique value reported when selected.', kind: { type: 'string' }, required: true },
      label: { description: 'Label rendered next to the dot.', kind: { type: 'string' } },
      description: { description: 'Optional secondary line.', kind: { type: 'string' } },
      disabled: { description: 'Non-interactive.', kind: { type: 'boolean', default: false } },
    },
  },
  {
    name: 'Card',
    description: 'Surface for grouping related content. Compose with CardHeader / CardTitle / CardDescription / CardBody / CardFooter.',
    acceptsChildren: true,
    childrenNote: 'Card subcomponents or arbitrary content.',
    props: {
      variant: { description: 'Surface treatment.', kind: { type: 'enum', values: ['default', 'elevated', 'outline'], default: 'default' } },
      accent: { description: 'Adds a cyan top-border accent stripe.', kind: { type: 'boolean', default: false } },
      interactive: { description: 'Hover affordance for clickable cards.', kind: { type: 'boolean', default: false } },
    },
  },
  { name: 'CardHeader', description: 'Top section of a Card.', acceptsChildren: true, props: {} },
  { name: 'CardTitle', description: 'Title heading inside a Card.', acceptsChildren: true, props: {} },
  { name: 'CardDescription', description: 'Subtitle paragraph inside a Card.', acceptsChildren: true, props: {} },
  { name: 'CardBody', description: 'Main content area of a Card.', acceptsChildren: true, props: {} },
  { name: 'CardFooter', description: 'Action area of a Card; typically holds Buttons.', acceptsChildren: true, props: {} },
  {
    name: 'Notice',
    description: 'Inline notification — same visual as Toast, but renders in normal flow (no portal).',
    acceptsChildren: false,
    props: {
      tone: { description: 'Visual tone.', kind: { type: 'enum', values: ['success', 'info', 'warning', 'error'], default: 'info' } },
      title: { description: 'Bold first line.', kind: { type: 'string' }, required: true },
      body: { description: 'Optional secondary line.', kind: { type: 'string' } },
    },
  },
  {
    name: 'Tooltip',
    description: 'Hover/focus label attached to a single child anchor.',
    acceptsChildren: true,
    childrenNote: 'Exactly one anchor element (usually a Button).',
    props: {
      content: { description: 'Text shown in the tooltip bubble.', kind: { type: 'string' }, required: true },
      side: { description: 'Position relative to the anchor.', kind: { type: 'enum', values: ['top', 'right', 'bottom', 'left'], default: 'top' } },
    },
  },
];

/**
 * Format the manifest as a single text block for inclusion in a Claude
 * system prompt. Stays under ~1500 tokens for cheap caching.
 */
export function manifestForSystemPrompt(): string {
  const blocks = COMPONENTS.map((c) => {
    const propLines = Object.entries(c.props).map(([name, p]) => {
      const required = p.required ? ' (required)' : '';
      let typeStr = '';
      switch (p.kind.type) {
        case 'enum':
          typeStr = `'${p.kind.values.join("' | '")}'`;
          if (p.kind.default !== undefined) typeStr += ` — default '${p.kind.default}'`;
          break;
        case 'boolean':
          typeStr = 'boolean';
          if (p.kind.default !== undefined) typeStr += ` — default ${p.kind.default}`;
          break;
        case 'string':
          typeStr = 'string';
          break;
        case 'number':
          typeStr = 'number';
          break;
        case 'node':
          typeStr = 'data / node';
          break;
      }
      return `  - ${name}: ${typeStr}${required}. ${p.description}`;
    }).join('\n');

    const childrenLine = c.acceptsChildren
      ? `\n  children: ${c.childrenNote ?? 'allowed'}`
      : '\n  children: none';

    return `## ${c.name}\n${c.description}\nProps:\n${propLines || '  (none)'}${childrenLine}`;
  }).join('\n\n');

  const htmlLine = `\n\nAllowed HTML tags for layout / text (lowercase):\n${HTML_TAGS.join(', ')}`;

  return blocks + htmlLine;
}

/** Component lookup helper used by the renderer. */
export const COMPONENT_NAMES = new Set(COMPONENTS.map((c) => c.name));
