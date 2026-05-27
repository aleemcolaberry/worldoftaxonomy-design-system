import { useState } from 'react';
import AppShell from '../../components/AppShell/AppShell';
import PageIntro from '../../components/PageIntro/PageIntro';
import ComponentPreview from '../../components/ComponentPreview/ComponentPreview';
import PropsTable, { type PropRow } from '../../components/PropsTable/PropsTable';
import Input from '../../components/Input/Input';

const props: PropRow[] = [
  { name: 'label', type: 'string', description: 'Field label rendered above the input.' },
  { name: 'helper', type: 'string', description: 'Helper text below the field. Hidden when an error is set.' },
  { name: 'error', type: 'string', description: 'Error message; promotes the field to error state.' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Field height: 28 / 36 / 44 px.' },
  { name: 'prefix', type: 'ReactNode', description: 'Inline content rendered on the left (icon, label, currency).' },
  { name: 'suffix', type: 'ReactNode', description: 'Inline content rendered on the right.' },
  { name: 'optional', type: 'boolean', default: 'false', description: 'Marks the field as optional in the label.' },
];

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
  </svg>
);

export default function InputPage() {
  const [val, setVal] = useState('');
  return (
    <AppShell>
      <PageIntro
        eyebrow="Components · Forms"
        title="Input"
        lede="A text field with optional label, helper text, error state, prefix and suffix slots. Forwards refs and spreads native input attributes."
      />

      <ComponentPreview
        title="Default"
        description="Label + placeholder. The most common case."
        code={`<Input label="Email" placeholder="aleem@example.com" />`}
      >
        <div style={{ width: 280 }}>
          <Input label="Email" placeholder="aleem@example.com" value={val} onChange={(e) => setVal(e.target.value)} />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Sizes"
        description="Three control heights — pair with the same size on buttons in the same form."
        code={`<Input size="sm" placeholder="Small" />
<Input size="md" placeholder="Medium" />
<Input size="lg" placeholder="Large" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 280 }}>
          <Input size="sm" placeholder="Small" />
          <Input size="md" placeholder="Medium" />
          <Input size="lg" placeholder="Large" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With helper & error"
        description="Helper renders by default; an error message replaces it and reddens the border."
        code={`<Input label="Email" helper="We'll only use this for sign-in." />
<Input label="Email" error="Enter a valid email address." defaultValue="not-an-email" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
          <Input label="Email" helper="We'll only use this for sign-in." placeholder="aleem@example.com" />
          <Input label="Email" error="Enter a valid email address." defaultValue="not-an-email" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Prefix & suffix"
        description="Inline slots accept any node — icons, currency labels, unit suffixes."
        code={`<Input label="Search" prefix={<SearchIcon />} placeholder="Search nodes…" />
<Input label="Price" prefix="$" suffix="USD" defaultValue="240" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
          <Input label="Search" prefix={<SearchIcon />} placeholder="Search nodes…" />
          <Input label="Price" prefix="$" suffix="USD" defaultValue="240" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Disabled & optional"
        description="Standard HTML disabled. Optional marks the field as not required in the label."
        code={`<Input label="Email" optional placeholder="Optional, but recommended" />
<Input label="Email" defaultValue="aleem@example.com" disabled />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
          <Input label="Email" optional placeholder="Optional, but recommended" />
          <Input label="Email" defaultValue="aleem@example.com" disabled />
        </div>
      </ComponentPreview>

      <PropsTable rows={props} />
    </AppShell>
  );
}
