import { createElement, Fragment, type ReactNode } from 'react';
import Button from '../components/Button/Button';
import ButtonGroup from '../components/ButtonGroup/ButtonGroup';
import Input from '../components/Input/Input';
import Select from '../components/Select/Select';
import Checkbox from '../components/Checkbox/Checkbox';
import Radio, { RadioGroup } from '../components/Radio/Radio';
import Card, {
  CardHeader, CardTitle, CardDescription, CardBody, CardFooter,
} from '../components/Card/Card';
import { Notice } from '../components/Toast/Toast';
import Tooltip from '../components/Tooltip/Tooltip';
import { COMPONENT_NAMES, HTML_TAGS } from './manifest';

/**
 * Tree shape returned by the LLM.
 * `tag` is a WoT component name (PascalCase) or an HTML tag (lowercase).
 * `props` is a plain object passed as React props.
 * `children` may be a string, a single node, an array, or absent.
 */
export interface TreeNode {
  tag: string;
  props?: Record<string, unknown>;
  children?: TreeNode | string | Array<TreeNode | string> | null;
}

/** Map from PascalCase component name to React component. */
const COMPONENT_MAP: Record<string, React.ComponentType<Record<string, unknown>>> = {
  Button: Button as unknown as React.ComponentType<Record<string, unknown>>,
  ButtonGroup: ButtonGroup as unknown as React.ComponentType<Record<string, unknown>>,
  Input: Input as unknown as React.ComponentType<Record<string, unknown>>,
  Select: Select as unknown as React.ComponentType<Record<string, unknown>>,
  Checkbox: Checkbox as unknown as React.ComponentType<Record<string, unknown>>,
  Radio: Radio as unknown as React.ComponentType<Record<string, unknown>>,
  RadioGroup: RadioGroup as unknown as React.ComponentType<Record<string, unknown>>,
  Card: Card as unknown as React.ComponentType<Record<string, unknown>>,
  CardHeader: CardHeader as unknown as React.ComponentType<Record<string, unknown>>,
  CardTitle: CardTitle as unknown as React.ComponentType<Record<string, unknown>>,
  CardDescription: CardDescription as unknown as React.ComponentType<Record<string, unknown>>,
  CardBody: CardBody as unknown as React.ComponentType<Record<string, unknown>>,
  CardFooter: CardFooter as unknown as React.ComponentType<Record<string, unknown>>,
  Notice: Notice as unknown as React.ComponentType<Record<string, unknown>>,
  Tooltip: Tooltip as unknown as React.ComponentType<Record<string, unknown>>,
};

const HTML_SET = new Set<string>(HTML_TAGS);

/* Props that are valid on HTML elements; everything else stripped at render. */
const HTML_PROP_WHITELIST = new Set([
  'className', 'style', 'id', 'title', 'role', 'tabIndex',
  'aria-label', 'aria-labelledby', 'aria-describedby', 'aria-hidden',
  'href', 'target', 'rel',           // anchor
  'src', 'alt', 'width', 'height',   // img
  'name', 'type', 'placeholder', 'value', 'defaultValue', 'checked', 'defaultChecked', 'disabled',
  'autoComplete', 'autoFocus',
  'for', 'htmlFor',
]);

function safeHtmlProps(props: Record<string, unknown> | undefined): Record<string, unknown> {
  if (!props) return {};
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(props)) {
    if (k.startsWith('on')) continue; // strip event handlers from generated content
    if (k.startsWith('aria-') || k.startsWith('data-')) {
      out[k] = v;
      continue;
    }
    if (HTML_PROP_WHITELIST.has(k)) out[k] = v;
  }
  // React uses htmlFor instead of for on labels
  if (out.for) {
    out.htmlFor = out.for;
    delete out.for;
  }
  // Sanitize href — only allow http(s) and relative
  if (typeof out.href === 'string') {
    const h = out.href.trim();
    if (!/^(https?:\/\/|\/|#)/i.test(h)) delete out.href;
  }
  return out;
}

let nodeCounter = 0;
const nextKey = () => `r${++nodeCounter}`;

function renderChildren(
  children: TreeNode['children']
): ReactNode {
  if (children == null) return null;
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) {
    return children.map((c, i) => {
      if (typeof c === 'string') return c;
      return renderNode(c, `${i}-${nextKey()}`);
    });
  }
  return renderNode(children, nextKey());
}

export function renderNode(node: TreeNode, keyHint?: string): ReactNode {
  if (!node || typeof node !== 'object' || typeof node.tag !== 'string') {
    return null;
  }
  const tag = node.tag;
  const key = keyHint ?? nextKey();
  const kids = renderChildren(node.children);

  // WoT component
  if (COMPONENT_NAMES.has(tag) && COMPONENT_MAP[tag]) {
    const Cmp = COMPONENT_MAP[tag];
    return createElement(Cmp, { key, ...(node.props ?? {}) }, kids);
  }

  // Allowed HTML tag
  if (HTML_SET.has(tag.toLowerCase())) {
    const props = safeHtmlProps(node.props);
    return createElement(tag.toLowerCase(), { key, ...props }, kids);
  }

  // Unknown tag — render a labelled placeholder so generations don't silently disappear
  return createElement(
    'span',
    {
      key,
      style: {
        display: 'inline-block',
        padding: '4px 8px',
        background: 'var(--color-warning-bg)',
        color: 'var(--color-warning-text)',
        border: '1px solid var(--color-warning-border)',
        borderRadius: 'var(--radius-sm)',
        fontFamily: 'var(--font-family-mono)',
        fontSize: 12,
      },
    },
    `Unknown tag: ${tag}`
  );
}

/** Render a top-level tree (single node) — useful when calling from JSX. */
export default function RenderTree({ tree }: { tree: TreeNode | null | undefined }) {
  if (!tree) return null;
  return <Fragment>{renderNode(tree, 'root')}</Fragment>;
}
