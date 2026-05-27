import { useState } from 'react';
import AppShell from '../../components/AppShell/AppShell';
import PageIntro from '../../components/PageIntro/PageIntro';
import ComponentPreview from '../../components/ComponentPreview/ComponentPreview';
import PropsTable, { type PropRow } from '../../components/PropsTable/PropsTable';
import Checkbox from '../../components/Checkbox/Checkbox';

const props: PropRow[] = [
  { name: 'label', type: 'ReactNode', description: 'Label rendered to the right of the box.' },
  { name: 'description', type: 'ReactNode', description: 'Optional secondary line below the label.' },
  { name: 'checked / defaultChecked', type: 'boolean', description: 'Standard React form patterns supported.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Non-interactive, dimmed.' },
];

export default function CheckboxPage() {
  const [checked, setChecked] = useState(true);
  return (
    <AppShell>
      <PageIntro
        eyebrow="Components · Forms"
        title="Checkbox"
        lede="A boolean control with label and optional description. Cyan check on selection."
      />

      <ComponentPreview
        title="Default"
        description="Click anywhere on the row to toggle."
        code={`<Checkbox label="Subscribe to release notes" />`}
      >
        <Checkbox
          label="Subscribe to release notes"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
      </ComponentPreview>

      <ComponentPreview
        title="With description"
        description="Pair a checkbox with a longer secondary line."
        code={`<Checkbox
  label="Allow analytics"
  description="Collect anonymous usage data to improve the system. We never sell or share it."
/>`}
      >
        <Checkbox
          label="Allow analytics"
          description="Collect anonymous usage data to improve the system. We never sell or share it."
        />
      </ComponentPreview>

      <ComponentPreview
        title="States"
        description="Default, checked, disabled, disabled-checked."
        code={`<Checkbox label="Default" />
<Checkbox label="Checked" defaultChecked />
<Checkbox label="Disabled" disabled />
<Checkbox label="Disabled checked" disabled defaultChecked />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Checkbox label="Default" />
          <Checkbox label="Checked" defaultChecked />
          <Checkbox label="Disabled" disabled />
          <Checkbox label="Disabled checked" disabled defaultChecked />
        </div>
      </ComponentPreview>

      <PropsTable rows={props} />
    </AppShell>
  );
}
