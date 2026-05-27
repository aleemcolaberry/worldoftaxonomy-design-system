import AppShell from '../../components/AppShell/AppShell';
import PageIntro from '../../components/PageIntro/PageIntro';
import ComponentPreview from '../../components/ComponentPreview/ComponentPreview';
import PropsTable, { type PropRow } from '../../components/PropsTable/PropsTable';
import Btn from '../../components/Button/Button';
import Group from '../../components/ButtonGroup/ButtonGroup';
import styles from './ButtonGroup.module.css';

const propRows: PropRow[] = [
  { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Stacking direction for children.' },
  { name: 'compact', type: 'boolean', default: 'false', description: 'Merge adjacent button borders into a single hairline (toolbar / segmented-control look).' },
  { name: 'children', type: 'ReactNode', required: true, description: 'One or more Button elements.' },
];

export default function ButtonGroupPage() {
  return (
    <AppShell>
      <PageIntro
        eyebrow="Components"
        title="Button Group"
        lede="Cluster related actions. Default spacing keeps each button visually distinct; compact mode is documented separately."
      />

      <ComponentPreview
        title="Horizontal"
        description="Default spacing — buttons keep their own borders and rounded corners."
        code={`<ButtonGroup>
  <Button variant="primary">Save</Button>
  <Button variant="default">Cancel</Button>
  <Button variant="default">Reset</Button>
</ButtonGroup>`}
      >
        <Group>
          <Btn variant="primary">Save</Btn>
          <Btn variant="default">Cancel</Btn>
          <Btn variant="default">Reset</Btn>
        </Group>
      </ComponentPreview>

      <ComponentPreview
        title="Vertical"
        description="Same component, stacked. Useful for side-panel menus or floating toolbars."
        code={`<ButtonGroup orientation="vertical">
  <Button variant="default">First</Button>
  <Button variant="default">Second</Button>
  <Button variant="default">Third</Button>
</ButtonGroup>`}
      >
        <Group orientation="vertical">
          <Btn variant="default">First</Btn>
          <Btn variant="default">Second</Btn>
          <Btn variant="default">Third</Btn>
        </Group>
      </ComponentPreview>

      <ComponentPreview
        title="Mixed variants"
        description="The group is layout-only; children can mix variants freely."
        code={`<ButtonGroup>
  <Button variant="primary">Save</Button>
  <Button variant="primary" danger>Delete</Button>
  <Button variant="text">Cancel</Button>
</ButtonGroup>`}
      >
        <Group>
          <Btn variant="primary">Save</Btn>
          <Btn variant="primary" danger>Delete</Btn>
          <Btn variant="text">Cancel</Btn>
        </Group>
      </ComponentPreview>

      <PropsTable rows={propRows} />
    </AppShell>
  );
}
