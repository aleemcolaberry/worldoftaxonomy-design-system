import AppShell from '../../components/AppShell/AppShell';
import PageIntro from '../../components/PageIntro/PageIntro';
import ComponentPreview from '../../components/ComponentPreview/ComponentPreview';
import Btn from '../../components/Button/Button';
import Group from '../../components/ButtonGroup/ButtonGroup';

export default function ButtonCompactPage() {
  return (
    <AppShell>
      <PageIntro
        eyebrow="Components"
        title="Button Compact"
        lede="A compact group merges adjacent button borders into a single hairline. Use it for toolbars, segmented controls, or tightly-bound action sets where the choices form one logical unit."
      />

      <ComponentPreview
        title="Compact horizontal"
        description="Three actions joined as one unit — outer corners keep their radius, internal seams are squared."
        code={`<ButtonGroup compact>
  <Button variant="primary">Cut</Button>
  <Button variant="primary">Copy</Button>
  <Button variant="primary">Paste</Button>
</ButtonGroup>`}
      >
        <Group compact>
          <Btn variant="primary">Cut</Btn>
          <Btn variant="primary">Copy</Btn>
          <Btn variant="primary">Paste</Btn>
        </Group>
      </ComponentPreview>

      <ComponentPreview
        title="Default variant"
        description="Same compaction over outline buttons — the classic segmented-control look."
        code={`<ButtonGroup compact>
  <Button variant="default">Day</Button>
  <Button variant="default">Week</Button>
  <Button variant="default">Month</Button>
  <Button variant="default">Year</Button>
</ButtonGroup>`}
      >
        <Group compact>
          <Btn variant="default">Day</Btn>
          <Btn variant="default">Week</Btn>
          <Btn variant="default">Month</Btn>
          <Btn variant="default">Year</Btn>
        </Group>
      </ComponentPreview>

      <ComponentPreview
        title="Compact vertical"
        description="Compaction stacked — dock-style menus or floating side toolbars."
        code={`<ButtonGroup orientation="vertical" compact>
  <Button variant="default">Up</Button>
  <Button variant="default">Center</Button>
  <Button variant="default">Down</Button>
</ButtonGroup>`}
      >
        <Group orientation="vertical" compact>
          <Btn variant="default">Up</Btn>
          <Btn variant="default">Center</Btn>
          <Btn variant="default">Down</Btn>
        </Group>
      </ComponentPreview>

      <ComponentPreview
        title="Sizes"
        description="Compact groups respect the child button sizes."
        code={`<ButtonGroup compact><Button size="sm" variant="default">SM</Button>…</ButtonGroup>
<ButtonGroup compact><Button size="md" variant="default">MD</Button>…</ButtonGroup>
<ButtonGroup compact><Button size="lg" variant="default">LG</Button>…</ButtonGroup>`}
      >
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          <Group compact>
            <Btn size="sm" variant="default">SM</Btn>
            <Btn size="sm" variant="default">SM</Btn>
            <Btn size="sm" variant="default">SM</Btn>
          </Group>
          <Group compact>
            <Btn size="md" variant="default">MD</Btn>
            <Btn size="md" variant="default">MD</Btn>
            <Btn size="md" variant="default">MD</Btn>
          </Group>
          <Group compact>
            <Btn size="lg" variant="default">LG</Btn>
            <Btn size="lg" variant="default">LG</Btn>
            <Btn size="lg" variant="default">LG</Btn>
          </Group>
        </div>
      </ComponentPreview>
    </AppShell>
  );
}
