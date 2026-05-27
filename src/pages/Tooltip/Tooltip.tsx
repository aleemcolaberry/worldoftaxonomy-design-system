import AppShell from '../../components/AppShell/AppShell';
import PageIntro from '../../components/PageIntro/PageIntro';
import ComponentPreview from '../../components/ComponentPreview/ComponentPreview';
import PropsTable, { type PropRow } from '../../components/PropsTable/PropsTable';
import Tooltip from '../../components/Tooltip/Tooltip';
import Btn from '../../components/Button/Button';

const props: PropRow[] = [
  { name: 'content', type: 'ReactNode', required: true, description: 'What gets shown inside the tooltip bubble.' },
  { name: 'children', type: 'ReactElement', required: true, description: 'A single anchor element. Hover or focus reveals the tooltip.' },
  { name: 'side', type: "'top' | 'right' | 'bottom' | 'left'", default: "'top'", description: 'Position relative to the anchor.' },
];

export default function TooltipPage() {
  return (
    <AppShell>
      <PageIntro
        eyebrow="Components · Overlay"
        title="Tooltip"
        lede="A small text label that appears on hover or keyboard focus of its anchor. CSS-only — no portals, no positioning libraries, no JavaScript."
      />

      <ComponentPreview
        title="Sides"
        description="Pass side to control where the tooltip appears."
        code={`<Tooltip content="Add a new node" side="top"><Button>Top</Button></Tooltip>
<Tooltip content="Add a new node" side="right"><Button>Right</Button></Tooltip>
<Tooltip content="Add a new node" side="bottom"><Button>Bottom</Button></Tooltip>
<Tooltip content="Add a new node" side="left"><Button>Left</Button></Tooltip>`}
      >
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', padding: '40px 0' }}>
          <Tooltip content="Add a new node" side="top"><Btn variant="default">Top</Btn></Tooltip>
          <Tooltip content="Add a new node" side="right"><Btn variant="default">Right</Btn></Tooltip>
          <Tooltip content="Add a new node" side="bottom"><Btn variant="default">Bottom</Btn></Tooltip>
          <Tooltip content="Add a new node" side="left"><Btn variant="default">Left</Btn></Tooltip>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With icon buttons"
        description="The most common use — supplement icon-only buttons with their label."
        code={`<Tooltip content="Search">
  <Button variant="default" iconOnly aria-label="Search"><SearchIcon /></Button>
</Tooltip>`}
      >
        <div style={{ display: 'flex', gap: 12, padding: '32px 0' }}>
          <Tooltip content="Search">
            <Btn variant="default" iconOnly aria-label="Search">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
              </svg>
            </Btn>
          </Tooltip>
          <Tooltip content="Settings">
            <Btn variant="default" iconOnly aria-label="Settings">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </Btn>
          </Tooltip>
          <Tooltip content="Delete this node">
            <Btn variant="default" danger iconOnly aria-label="Delete">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6 18 20a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              </svg>
            </Btn>
          </Tooltip>
        </div>
      </ComponentPreview>

      <PropsTable rows={props} />
    </AppShell>
  );
}
