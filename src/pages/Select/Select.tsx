import AppShell from '../../components/AppShell/AppShell';
import PageIntro from '../../components/PageIntro/PageIntro';
import ComponentPreview from '../../components/ComponentPreview/ComponentPreview';
import PropsTable, { type PropRow } from '../../components/PropsTable/PropsTable';
import Select from '../../components/Select/Select';

const props: PropRow[] = [
  { name: 'label', type: 'string', description: 'Field label rendered above the select.' },
  { name: 'helper', type: 'string', description: 'Helper text below the field.' },
  { name: 'error', type: 'string', description: 'Error message; promotes to error state.' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Field height.' },
  { name: 'options', type: 'SelectOption[]', description: 'Array of {value, label, disabled?}. Alternatively pass <option> children.' },
  { name: 'placeholder', type: 'string', description: 'Shown when no value is selected.' },
  { name: 'optional', type: 'boolean', default: 'false', description: 'Marks the field as optional in the label.' },
];

const tiers = [
  { value: 'free', label: 'Free' },
  { value: 'pro', label: 'Pro' },
  { value: 'team', label: 'Team' },
  { value: 'enterprise', label: 'Enterprise', disabled: true },
];

export default function SelectPage() {
  return (
    <AppShell>
      <PageIntro
        eyebrow="Components · Forms"
        title="Select"
        lede="A styled wrapper around native <select>. Keeps OS-native option lists for accessibility and platform polish; adds the WoT border, focus ring, and chevron."
      />

      <ComponentPreview
        title="Default"
        description="Pass an options array for a typed config-driven select."
        code={`<Select
  label="Plan"
  options={[
    { value: 'free', label: 'Free' },
    { value: 'pro', label: 'Pro' },
    { value: 'team', label: 'Team' },
    { value: 'enterprise', label: 'Enterprise', disabled: true },
  ]}
  defaultValue="pro"
/>`}
      >
        <div style={{ width: 280 }}>
          <Select label="Plan" options={tiers} defaultValue="pro" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Sizes"
        description="Three control heights matching Input."
        code={`<Select size="sm" placeholder="Small" options={…} />
<Select size="md" placeholder="Medium" options={…} />
<Select size="lg" placeholder="Large" options={…} />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 280 }}>
          <Select size="sm" placeholder="Pick a plan" options={tiers} />
          <Select size="md" placeholder="Pick a plan" options={tiers} />
          <Select size="lg" placeholder="Pick a plan" options={tiers} />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With helper & error"
        description="Same field affordances as Input."
        code={`<Select label="Plan" helper="You can change this anytime." options={…} />
<Select label="Plan" error="Pick a plan to continue." options={…} placeholder="No selection" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
          <Select label="Plan" helper="You can change this anytime." options={tiers} defaultValue="free" />
          <Select label="Plan" error="Pick a plan to continue." options={tiers} placeholder="No selection" />
        </div>
      </ComponentPreview>

      <PropsTable rows={props} />
    </AppShell>
  );
}
