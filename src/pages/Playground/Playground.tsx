import { useState, type ReactNode } from 'react';
import AppShell from '../../components/AppShell/AppShell';
import Btn from '../../components/Button/Button';
import Group from '../../components/ButtonGroup/ButtonGroup';
import CodeBlock from '../../components/CodeBlock/CodeBlock';
import Input from '../../components/Input/Input';
import Checkbox from '../../components/Checkbox/Checkbox';
import { Notice } from '../../components/Toast/Toast';
import styles from './Playground.module.css';

interface Preset {
  id: string;
  prompt: string;
  description: string;
  preview: ReactNode;
  code: string;
}

const presets: Preset[] = [
  {
    id: 'sign-in',
    prompt: 'Build a sign-in form',
    description: 'A two-field auth form with a primary CTA and a secondary link.',
    preview: <SignInPreview />,
    code: `<form>
  <Input label="Email" type="email" placeholder="aleem@example.com" />
  <Input label="Password" type="password" placeholder="••••••••" />
  <Checkbox label="Remember me" defaultChecked />
  <Button variant="primary" block>Sign in</Button>
  <a href="#forgot">Forgot password?</a>
</form>`,
  },
  {
    id: 'toolbar',
    prompt: 'Build a formatting toolbar',
    description: 'A segmented control with text-formatting actions.',
    preview: <ToolbarPreview />,
    code: `<ButtonGroup compact>
  <Button iconOnly aria-label="Bold"><BoldIcon /></Button>
  <Button iconOnly aria-label="Italic"><ItalicIcon /></Button>
  <Button iconOnly aria-label="Underline"><UnderlineIcon /></Button>
  <Button iconOnly aria-label="Strike"><StrikeIcon /></Button>
</ButtonGroup>`,
  },
  {
    id: 'modal',
    prompt: 'Build a delete-confirmation modal',
    description: 'A modal with a destructive primary action and a neutral cancel.',
    preview: <ModalPreview />,
    code: `<Modal title="Delete project?" >
  <p>This action can't be undone. The project and all its nodes will be removed.</p>
  <ButtonGroup>
    <Button variant="default">Cancel</Button>
    <Button variant="primary" danger>Delete project</Button>
  </ButtonGroup>
</Modal>`,
  },
  {
    id: 'notif',
    prompt: 'Build a notification stack',
    description: 'Stacked toast-style notifications, each in a different tone.',
    preview: <NotifPreview />,
    code: `<Stack>
  <Notice tone="success" title="Saved" body="Your changes were saved." />
  <Notice tone="info" title="Indexing" body="1,284 nodes synced." />
  <Notice tone="warning" title="Stale data" body="Refresh to see latest." />
  <Notice tone="error" title="Sync failed" body="Retry in a moment." />
</Stack>`,
  },
  {
    id: 'pricing',
    prompt: 'Build a pricing card grid',
    description: 'Three pricing tiers with a highlighted middle card.',
    preview: <PricingPreview />,
    code: `<div className="pricing-grid">
  <PricingCard tier="Free" price="$0" cta="Get started" />
  <PricingCard tier="Pro" price="$24" cta="Upgrade" highlight />
  <PricingCard tier="Team" price="$96" cta="Talk to sales" />
</div>`,
  },
  {
    id: 'cta',
    prompt: 'Build a hero CTA section',
    description: 'A centered hero with headline, lede, and two CTAs.',
    preview: <HeroPreview />,
    code: `<section className="hero">
  <h1>A living taxonomy of the world's knowledge.</h1>
  <p>Map every concept, link every node, query through MCP.</p>
  <ButtonGroup>
    <Button variant="primary" size="lg">Start mapping</Button>
    <Button variant="default" size="lg">Read the spec</Button>
  </ButtonGroup>
</section>`,
  },
];

export default function Playground() {
  const [selectedId, setSelectedId] = useState(presets[0].id);
  const [draft, setDraft] = useState('');
  const selected = presets.find((p) => p.id === selectedId) ?? presets[0];

  return (
    <AppShell fluid>
      <div className={styles.layout}>
        <aside className={styles.chat}>
          <div className={styles.chatHead}>
            <h1 className={styles.title}>Playground</h1>
            <p className={styles.subtitle}>
              Prompt → UI, composed entirely from WoT primitives.
            </p>
            <p className={styles.demoBanner}>
              <strong>Demo mode</strong> — six canned prompts below. The real
              LLM integration (Claude + a Vercel serverless function) ships in
              Phase 3b.
            </p>
          </div>

          <div className={styles.promptList}>
            <h3 className={styles.section}>Try a prompt</h3>
            {presets.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedId(p.id)}
                className={
                  selectedId === p.id
                    ? `${styles.promptBtn} ${styles.promptBtnActive}`
                    : styles.promptBtn
                }
              >
                <span className={styles.promptDot} aria-hidden />
                <span>
                  <span className={styles.promptLabel}>{p.prompt}</span>
                  <span className={styles.promptDesc}>{p.description}</span>
                </span>
              </button>
            ))}
          </div>

          <div className={styles.inputArea}>
            <div className={styles.inputLabel}>Your prompt (preview only)</div>
            <textarea
              className={styles.input}
              placeholder="Describe a UI… e.g. 'a settings page with three sections'"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={3}
            />
            <Btn variant="primary" block disabled>
              Generate (demo)
            </Btn>
            <p className={styles.note}>
              Input is captured locally but no model is called. Pick a preset
              above to see the rendered output.
            </p>
          </div>
        </aside>

        <section className={styles.preview}>
          <div className={styles.previewHead}>
            <div>
              <span className={styles.previewEyebrow}>Output</span>
              <h2 className={styles.previewTitle}>{selected.prompt}</h2>
            </div>
            <Group>
              <Btn variant="default" size="sm" disabled>Edit</Btn>
              <Btn variant="default" size="sm" disabled>Variations</Btn>
              <Btn variant="primary" size="sm" disabled>Save</Btn>
            </Group>
          </div>

          <div className={styles.canvas}>
            {selected.preview}
          </div>

          <div className={styles.codeWrap}>
            <CodeBlock code={selected.code} language="tsx" title="Generated JSX" />
          </div>
        </section>
      </div>
    </AppShell>
  );
}

/* ───────── Preset previews ───────── */

function SignInPreview() {
  return (
    <form className={styles.signIn} onSubmit={(e) => e.preventDefault()}>
      <h3 className={styles.formTitle}>Sign in</h3>
      <Input label="Email" type="email" placeholder="aleem@example.com" />
      <Input label="Password" type="password" placeholder="••••••••" />
      <Checkbox label="Remember me" defaultChecked />
      <Btn variant="primary" block size="md">Sign in</Btn>
      <a href="#forgot" className={styles.link}>Forgot password?</a>
    </form>
  );
}

function ToolbarPreview() {
  const Icon = ({ d }: { d: string }) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={d} />
    </svg>
  );
  return (
    <Group compact>
      <Btn variant="default" iconOnly aria-label="Bold"><Icon d="M6 4h8a4 4 0 0 1 0 8H6zm0 8h9a4 4 0 0 1 0 8H6z" /></Btn>
      <Btn variant="default" iconOnly aria-label="Italic"><Icon d="M19 4h-9M14 20H5M15 4 9 20" /></Btn>
      <Btn variant="default" iconOnly aria-label="Underline"><Icon d="M6 3v8a6 6 0 0 0 12 0V3M4 21h16" /></Btn>
      <Btn variant="default" iconOnly aria-label="Strikethrough"><Icon d="M16 4H9a3 3 0 0 0-2.83 4M14 12a4 4 0 1 1 0 8H6M4 12h16" /></Btn>
      <Btn variant="default" iconOnly aria-label="Code"><Icon d="m16 18 6-6-6-6M8 6l-6 6 6 6" /></Btn>
    </Group>
  );
}

function ModalPreview() {
  return (
    <div className={styles.modalCard}>
      <header>
        <h3 className={styles.modalTitle}>Delete project?</h3>
      </header>
      <p className={styles.modalBody}>
        This action can&apos;t be undone. The project and all 1,284 nodes
        will be permanently removed from the taxonomy graph.
      </p>
      <Group>
        <Btn variant="default">Cancel</Btn>
        <Btn variant="primary" danger>Delete project</Btn>
      </Group>
    </div>
  );
}

function NotifPreview() {
  const notices: Array<{ tone: 'success' | 'info' | 'warning' | 'error'; title: string; body: string }> = [
    { tone: 'success', title: 'Saved', body: 'Your changes were saved to the live graph.' },
    { tone: 'info', title: 'Indexing complete', body: '1,284 new nodes synced.' },
    { tone: 'warning', title: 'Stale data', body: 'Refresh to see the latest taxonomy.' },
    { tone: 'error', title: 'Sync failed', body: 'Could not reach upstream — retrying in 12 s.' },
  ];
  return (
    <div className={styles.notifStack}>
      {notices.map((n) => (
        <Notice key={n.tone} tone={n.tone} title={n.title} body={n.body} />
      ))}
    </div>
  );
}

function PricingPreview() {
  const tiers = [
    { tier: 'Free', price: '$0', cta: 'Get started', features: ['1 graph', 'Up to 1k nodes', 'Community support'] },
    { tier: 'Pro', price: '$24', cta: 'Upgrade', features: ['Unlimited graphs', 'Up to 100k nodes', 'Email support'], highlight: true },
    { tier: 'Team', price: '$96', cta: 'Talk to sales', features: ['Unlimited everything', 'SSO + audit logs', 'Priority support'] },
  ];
  return (
    <div className={styles.pricingGrid}>
      {tiers.map((t) => (
        <div
          key={t.tier}
          className={t.highlight ? `${styles.pricingCard} ${styles.pricingCardHi}` : styles.pricingCard}
        >
          {t.highlight && <span className={styles.pricingFlag}>Most popular</span>}
          <h3>{t.tier}</h3>
          <p className={styles.pricingPrice}>{t.price}<span>/mo</span></p>
          <ul>
            {t.features.map((f) => <li key={f}>{f}</li>)}
          </ul>
          <Btn variant={t.highlight ? 'primary' : 'default'} block>{t.cta}</Btn>
        </div>
      ))}
    </div>
  );
}

function HeroPreview() {
  return (
    <div className={styles.hero}>
      <h2 className={styles.heroTitle}>A living taxonomy of the world&apos;s knowledge.</h2>
      <p className={styles.heroLede}>
        Map every concept, link every node, query through MCP. WoT turns
        knowledge graphs into something an AI agent can actually navigate.
      </p>
      <Group>
        <Btn variant="primary" size="lg">Start mapping</Btn>
        <Btn variant="default" size="lg">Read the spec</Btn>
      </Group>
    </div>
  );
}
