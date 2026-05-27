import AppShell from '../../components/AppShell/AppShell';
import PageIntro from '../../components/PageIntro/PageIntro';
import ComponentPreview from '../../components/ComponentPreview/ComponentPreview';
import PropsTable, { type PropRow } from '../../components/PropsTable/PropsTable';
import Btn from '../../components/Button/Button';
import styles from './Button.module.css';

const propRows: PropRow[] = [
  { name: 'variant', type: "'primary' | 'default' | 'dashed' | 'text' | 'link'", default: "'default'", description: 'Visual variant. Primary is the only one filled with the brand cyan.' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Control height: 24 / 32 / 40 px respectively.' },
  { name: 'danger', type: 'boolean', default: 'false', description: 'Layer the error palette over the chosen variant.' },
  { name: 'iconOnly', type: 'boolean', default: 'false', description: 'Render a square button. Pass the icon as children.' },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Show a spinner and disable the button.' },
  { name: 'block', type: 'boolean', default: 'false', description: 'Stretch to fill its container width.' },
  { name: 'shape', type: "'default' | 'round' | 'circle'", default: "'default'", description: 'Border-radius treatment. Circle requires iconOnly content.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Standard HTML button disabled state.' },
];

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

export default function ButtonPage() {
  return (
    <AppShell>
      <PageIntro
        eyebrow="Components"
        title="Button"
        lede="Buttons trigger actions. Five variants × three sizes, with optional danger flag, icon-only and circular forms, and a loading state."
      />

      <ComponentPreview
        title="Variants"
        description="Five visual variants. Use primary for the leading action on a surface; default for secondary actions; dashed for empty-state CTAs; text for inline controls; link for navigation-like actions."
        code={`<Button variant="primary">Primary</Button>
<Button variant="default">Default</Button>
<Button variant="dashed">Dashed</Button>
<Button variant="text">Text</Button>
<Button variant="link">Link</Button>`}
      >
        <div className={styles.row}>
          <Btn variant="primary">Primary</Btn>
          <Btn variant="default">Default</Btn>
          <Btn variant="dashed">Dashed</Btn>
          <Btn variant="text">Text</Btn>
          <Btn variant="link">Link</Btn>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Sizes"
        description="Three heights — 24, 32, and 40 px — covering compact toolbars, default forms, and hero CTAs."
        code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}
      >
        <div className={styles.row}>
          <Btn variant="primary" size="sm">Small</Btn>
          <Btn variant="primary" size="md">Medium</Btn>
          <Btn variant="primary" size="lg">Large</Btn>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Danger"
        description="Apply the error palette over any variant for destructive actions."
        code={`<Button variant="primary" danger>Delete</Button>
<Button variant="default" danger>Delete</Button>
<Button variant="dashed" danger>Delete</Button>
<Button variant="text" danger>Delete</Button>
<Button variant="link" danger>Delete</Button>`}
      >
        <div className={styles.row}>
          <Btn variant="primary" danger>Delete</Btn>
          <Btn variant="default" danger>Delete</Btn>
          <Btn variant="dashed" danger>Delete</Btn>
          <Btn variant="text" danger>Delete</Btn>
          <Btn variant="link" danger>Delete</Btn>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Icon-only & circular"
        description="Square buttons with iconOnly; perfectly round buttons with shape='circle'."
        code={`<Button variant="primary" iconOnly aria-label="Search"><SearchIcon /></Button>
<Button variant="default" iconOnly aria-label="Search"><SearchIcon /></Button>
<Button variant="primary" iconOnly shape="circle" aria-label="Search"><SearchIcon /></Button>`}
      >
        <div className={styles.row}>
          <Btn variant="primary" iconOnly aria-label="Search"><SearchIcon /></Btn>
          <Btn variant="default" iconOnly aria-label="Search"><SearchIcon /></Btn>
          <Btn variant="dashed" iconOnly aria-label="Search"><SearchIcon /></Btn>
          <Btn variant="text" iconOnly aria-label="Search"><SearchIcon /></Btn>
          <Btn variant="primary" iconOnly shape="circle" aria-label="Search"><SearchIcon /></Btn>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Loading"
        description="Set loading to show a spinner; the button auto-disables while loading."
        code={`<Button variant="primary" loading>Submitting</Button>
<Button variant="default" loading>Submitting</Button>
<Button variant="primary" danger loading>Deleting</Button>`}
      >
        <div className={styles.row}>
          <Btn variant="primary" loading>Submitting</Btn>
          <Btn variant="default" loading>Submitting</Btn>
          <Btn variant="primary" danger loading>Deleting</Btn>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Disabled"
        description="Standard HTML disabled — non-interactive, non-focusable."
        code={`<Button variant="primary" disabled>Primary</Button>
<Button variant="default" disabled>Default</Button>
<Button variant="dashed" disabled>Dashed</Button>`}
      >
        <div className={styles.row}>
          <Btn variant="primary" disabled>Primary</Btn>
          <Btn variant="default" disabled>Default</Btn>
          <Btn variant="dashed" disabled>Dashed</Btn>
          <Btn variant="text" disabled>Text</Btn>
          <Btn variant="link" disabled>Link</Btn>
        </div>
      </ComponentPreview>

      <PropsTable rows={propRows} />
    </AppShell>
  );
}
