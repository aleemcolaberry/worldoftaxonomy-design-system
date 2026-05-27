import { useState } from 'react';
import AppShell from '../../components/AppShell/AppShell';
import PageIntro from '../../components/PageIntro/PageIntro';
import ComponentPreview from '../../components/ComponentPreview/ComponentPreview';
import PropsTable, { type PropRow } from '../../components/PropsTable/PropsTable';
import Radio, { RadioGroup } from '../../components/Radio/Radio';

const props: PropRow[] = [
  { name: 'value', type: 'string', required: true, description: 'Unique value sent to the parent RadioGroup.' },
  { name: 'label', type: 'ReactNode', description: 'Label rendered to the right of the dot.' },
  { name: 'description', type: 'ReactNode', description: 'Optional secondary line below the label.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Non-interactive, dimmed.' },
];

const groupProps: PropRow[] = [
  { name: 'name', type: 'string', description: 'Form field name shared by all child radios.' },
  { name: 'value / defaultValue', type: 'string', description: 'Selected value (controlled or uncontrolled).' },
  { name: 'onChange', type: '(value: string) => void', description: 'Fires with the newly-selected value.' },
  { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'vertical'", description: 'Stacking direction.' },
];

export default function RadioPage() {
  const [tier, setTier] = useState('pro');
  return (
    <AppShell>
      <PageIntro
        eyebrow="Components · Forms"
        title="Radio"
        lede="Single-select form control. Wrap in a RadioGroup to share a name and bind a value."
      />

      <ComponentPreview
        title="Group"
        description="Three mutually-exclusive options bound to a single value."
        code={`const [tier, setTier] = useState('pro');
return (
  <RadioGroup name="tier" value={tier} onChange={setTier}>
    <Radio value="free" label="Free" description="1k nodes, community support." />
    <Radio value="pro" label="Pro" description="100k nodes, email support." />
    <Radio value="team" label="Team" description="Unlimited, SSO, audit logs." />
  </RadioGroup>
);`}
      >
        <RadioGroup name="tier" value={tier} onChange={setTier}>
          <Radio value="free" label="Free" description="1k nodes, community support." />
          <Radio value="pro" label="Pro" description="100k nodes, email support." />
          <Radio value="team" label="Team" description="Unlimited, SSO, audit logs." />
        </RadioGroup>
      </ComponentPreview>

      <ComponentPreview
        title="Horizontal"
        description="Use for short labels — e.g. a yes/no/maybe."
        code={`<RadioGroup name="answer" defaultValue="yes" orientation="horizontal">
  <Radio value="yes" label="Yes" />
  <Radio value="no" label="No" />
  <Radio value="maybe" label="Maybe" />
</RadioGroup>`}
      >
        <RadioGroup name="answer" defaultValue="yes" orientation="horizontal">
          <Radio value="yes" label="Yes" />
          <Radio value="no" label="No" />
          <Radio value="maybe" label="Maybe" />
        </RadioGroup>
      </ComponentPreview>

      <PropsTable rows={props} title="Radio props" />
      <PropsTable rows={groupProps} title="RadioGroup props" />
    </AppShell>
  );
}
