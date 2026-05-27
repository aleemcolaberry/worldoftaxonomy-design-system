import AppShell from '../../components/AppShell/AppShell';
import PageIntro from '../../components/PageIntro/PageIntro';
import ComponentPreview from '../../components/ComponentPreview/ComponentPreview';
import PropsTable, { type PropRow } from '../../components/PropsTable/PropsTable';
import Card, { CardHeader, CardTitle, CardDescription, CardBody, CardFooter } from '../../components/Card/Card';
import Btn from '../../components/Button/Button';

const props: PropRow[] = [
  { name: 'variant', type: "'default' | 'elevated' | 'outline'", default: "'default'", description: 'Surface treatment: bordered (default), shadow (elevated), or transparent body (outline).' },
  { name: 'interactive', type: 'boolean', default: 'false', description: 'Adds hover lift + cyan border. Pair with onClick or wrap in a Link.' },
  { name: 'accent', type: 'boolean', default: 'false', description: 'Adds a cyan top-border accent stripe.' },
];

export default function CardPage() {
  return (
    <AppShell>
      <PageIntro
        eyebrow="Components · Surface"
        title="Card"
        lede="A surface for grouping related content. Compose Header, Title, Description, Body, and Footer subcomponents — or pass arbitrary children."
      />

      <ComponentPreview
        title="Default"
        description="Header + body + footer slots."
        code={`<Card>
  <CardHeader>
    <CardTitle>Taxonomy node</CardTitle>
  </CardHeader>
  <CardBody>
    <CardDescription>schema://wot/v1/edge — 1,284 nodes synced.</CardDescription>
  </CardBody>
  <CardFooter>
    <Button variant="default">Cancel</Button>
    <Button variant="primary">Open</Button>
  </CardFooter>
</Card>`}
      >
        <div style={{ width: 360 }}>
          <Card>
            <CardHeader>
              <CardTitle>Taxonomy node</CardTitle>
            </CardHeader>
            <CardBody>
              <CardDescription>schema://wot/v1/edge — 1,284 nodes synced.</CardDescription>
            </CardBody>
            <CardFooter>
              <Btn variant="default">Cancel</Btn>
              <Btn variant="primary">Open</Btn>
            </CardFooter>
          </Card>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Variants"
        description="Default / Elevated / Outline."
        code={`<Card variant="default">…</Card>
<Card variant="elevated">…</Card>
<Card variant="outline">…</Card>`}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, width: '100%' }}>
          {(['default', 'elevated', 'outline'] as const).map((v) => (
            <Card key={v} variant={v}>
              <CardBody>
                <CardTitle>{v}</CardTitle>
                <CardDescription>Lorem ipsum dolor sit.</CardDescription>
              </CardBody>
            </Card>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Accent + interactive"
        description="Accent adds a cyan top stripe; interactive adds hover affordances for click targets."
        code={`<Card accent interactive onClick={…}>
  <CardBody>
    <CardTitle>Open dashboard</CardTitle>
    <CardDescription>Real-time graph metrics, latency, sync errors.</CardDescription>
  </CardBody>
</Card>`}
      >
        <div style={{ width: 360 }}>
          <Card accent interactive role="button" tabIndex={0}>
            <CardBody>
              <CardTitle>Open dashboard</CardTitle>
              <CardDescription>Real-time graph metrics, latency, sync errors.</CardDescription>
            </CardBody>
          </Card>
        </div>
      </ComponentPreview>

      <PropsTable rows={props} />
    </AppShell>
  );
}
