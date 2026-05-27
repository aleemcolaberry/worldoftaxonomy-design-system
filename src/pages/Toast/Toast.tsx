import AppShell from '../../components/AppShell/AppShell';
import PageIntro from '../../components/PageIntro/PageIntro';
import ComponentPreview from '../../components/ComponentPreview/ComponentPreview';
import PropsTable, { type PropRow } from '../../components/PropsTable/PropsTable';
import { Notice, useToast } from '../../components/Toast/Toast';
import Btn from '../../components/Button/Button';

const props: PropRow[] = [
  { name: 'title', type: 'string', required: true, description: 'Bold one-line title at the top of the toast.' },
  { name: 'body', type: 'string', description: 'Optional supporting line below the title.' },
  { name: 'tone', type: "'success' | 'info' | 'warning' | 'error'", default: "'info'", description: 'Visual tone — sets the left border + dot color.' },
  { name: 'duration', type: 'number', default: '4000', description: 'Auto-dismiss after N milliseconds. Pass 0 to make sticky.' },
];

function ToastDemo() {
  const { push } = useToast();
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
      <Btn variant="default" onClick={() => push({ tone: 'success', title: 'Saved', body: 'Your changes were saved to the live graph.' })}>Success</Btn>
      <Btn variant="default" onClick={() => push({ tone: 'info', title: 'Indexing complete', body: '1,284 new nodes synced.' })}>Info</Btn>
      <Btn variant="default" onClick={() => push({ tone: 'warning', title: 'Stale data', body: 'Refresh to see latest.' })}>Warning</Btn>
      <Btn variant="default" onClick={() => push({ tone: 'error', title: 'Sync failed', body: 'Could not reach upstream — retrying.' })}>Error</Btn>
    </div>
  );
}

export default function ToastPage() {
  return (
    <AppShell>
      <PageIntro
        eyebrow="Components · Feedback"
        title="Toast"
        lede="Transient notifications that stack in a fixed-position viewport. Trigger via useToast() inside a ToastProvider. The same visual is available inline as a Notice."
      />

      <ComponentPreview
        title="Toast queue"
        description="Click each button to push a toast. Toasts auto-dismiss after 4 s by default; they stack in the bottom-right of the viewport."
        code={`function MyComponent() {
  const { push } = useToast();
  return (
    <Button onClick={() => push({
      tone: 'success',
      title: 'Saved',
      body: 'Your changes were saved.',
    })}>Save</Button>
  );
}

// Wrap app once: <ToastProvider><App /></ToastProvider>`}
      >
        <ToastDemo />
      </ComponentPreview>

      <ComponentPreview
        title="Inline Notice"
        description="The same visual without the floating viewport — embed in pages or cards."
        code={`<Notice tone="success" title="Saved" body="Your changes were saved." />
<Notice tone="warning" title="Stale data" body="Refresh to see latest." />
<Notice tone="error" title="Sync failed" body="Retry in a moment." />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 360 }}>
          <Notice tone="success" title="Saved" body="Your changes were saved." />
          <Notice tone="info" title="Indexing" body="1,284 nodes synced." />
          <Notice tone="warning" title="Stale data" body="Refresh to see latest." />
          <Notice tone="error" title="Sync failed" body="Retry in a moment." />
        </div>
      </ComponentPreview>

      <PropsTable rows={props} title="Toast input props (push)" />
    </AppShell>
  );
}
