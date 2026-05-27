import { useState } from 'react';
import AppShell from '../../components/AppShell/AppShell';
import Btn from '../../components/Button/Button';
import CodeBlock from '../../components/CodeBlock/CodeBlock';
import { renderNode, type TreeNode } from '../../lib/renderTree';
import styles from './Playground.module.css';

interface PromptSuggestion {
  id: string;
  label: string;
  description: string;
  prompt: string;
}

const suggestions: PromptSuggestion[] = [
  {
    id: 'sign-in',
    label: 'Sign-in form',
    description: 'Email + password with a Remember me checkbox.',
    prompt: 'A clean sign-in form with email, password, a "Remember me" checkbox, a primary "Sign in" button, and a small "Forgot password?" link underneath.',
  },
  {
    id: 'toolbar',
    label: 'Formatting toolbar',
    description: 'Segmented control with text-formatting actions.',
    prompt: 'A compact horizontal toolbar of icon buttons: bold, italic, underline, strikethrough, and code. Use default-variant buttons in a compact ButtonGroup.',
  },
  {
    id: 'delete-modal',
    label: 'Delete confirmation',
    description: 'Modal-style card with a destructive primary CTA.',
    prompt: 'A confirmation card titled "Delete project?" with a body explaining the action is irreversible, and a footer with two buttons: Cancel (default) and Delete project (primary, danger).',
  },
  {
    id: 'pricing',
    label: 'Pricing grid',
    description: 'Three pricing tiers with one highlighted.',
    prompt: 'Three pricing cards side-by-side: Free ($0), Pro ($24, highlighted with the accent), Team ($96). Each card has a title, price, three feature bullets, and a primary CTA button.',
  },
  {
    id: 'settings',
    label: 'Settings panel',
    description: 'Form section with mixed input types.',
    prompt: 'A settings panel inside a Card. Title "Notifications". Includes: a Select for delivery channel (Email / In-app / SMS), a RadioGroup for frequency (Real-time / Daily / Weekly digest), two Checkboxes (Mentions, System alerts), and a footer with Cancel + Save buttons.',
  },
  {
    id: 'hero',
    label: 'Hero CTA',
    description: 'Centered hero with headline and two CTAs.',
    prompt: 'A centered hero section. Headline: "A living taxonomy of the world\'s knowledge." Lede paragraph below. Two large buttons in a horizontal group: "Start mapping" (primary) and "Read the spec" (default).',
  },
];

interface GenerationState {
  status: 'idle' | 'loading' | 'success' | 'error';
  tree?: TreeNode;
  raw?: string;
  error?: string;
  usage?: { input_tokens?: number; output_tokens?: number; cache_read_input_tokens?: number; cache_creation_input_tokens?: number };
  prompt?: string;
  ms?: number;
}

export default function Playground() {
  const [draft, setDraft] = useState('');
  const [state, setState] = useState<GenerationState>({ status: 'idle' });

  const generate = async () => {
    const prompt = draft.trim();
    if (!prompt || state.status === 'loading') return;
    setState({ status: 'loading', prompt });
    const t0 = performance.now();
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const ms = performance.now() - t0;
      const data = await res.json();
      if (!res.ok) {
        setState({
          status: 'error',
          error: data?.error ?? `Request failed (${res.status})`,
          raw: data?.raw,
          prompt,
          ms,
        });
        return;
      }
      setState({
        status: 'success',
        tree: data.tree,
        raw: data.raw,
        usage: data.usage,
        prompt,
        ms,
      });
    } catch (err) {
      setState({
        status: 'error',
        error: err instanceof Error ? err.message : 'Network error',
        prompt,
        ms: performance.now() - t0,
      });
    }
  };

  const pickSuggestion = (s: PromptSuggestion) => {
    setDraft(s.prompt);
  };

  return (
    <AppShell fluid>
      <div className={styles.layout}>
        <aside className={styles.chat}>
          <div className={styles.chatHead}>
            <h1 className={styles.title}>Playground</h1>
            <p className={styles.subtitle}>
              Prompt → UI, composed entirely from WoT primitives.
            </p>
            <p className={styles.banner}>
              <strong>Live</strong> · Powered by Claude Haiku via a Vercel
              serverless function. The Anthropic API key stays on the server.
            </p>
          </div>

          <div className={styles.promptList}>
            <h3 className={styles.section}>Try a prompt</h3>
            {suggestions.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => pickSuggestion(s)}
                className={styles.promptBtn}
              >
                <span className={styles.promptDot} aria-hidden />
                <span>
                  <span className={styles.promptLabel}>{s.label}</span>
                  <span className={styles.promptDesc}>{s.description}</span>
                </span>
              </button>
            ))}
          </div>

          <div className={styles.inputArea}>
            <div className={styles.inputLabel}>Your prompt</div>
            <textarea
              className={styles.input}
              placeholder="Describe a UI… e.g. 'a settings page with three sections'"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') generate();
              }}
              rows={4}
              disabled={state.status === 'loading'}
            />
            <Btn
              variant="primary"
              block
              onClick={generate}
              loading={state.status === 'loading'}
              disabled={!draft.trim() || state.status === 'loading'}
            >
              {state.status === 'loading' ? 'Generating' : 'Generate'}
            </Btn>
            <p className={styles.note}>
              ⌘/Ctrl + Enter to submit. The system prompt with the WoT
              manifest is cached, so each generation is cheap and fast.
            </p>
          </div>
        </aside>

        <section className={styles.preview}>
          <div className={styles.previewHead}>
            <div>
              <span className={styles.previewEyebrow}>Output</span>
              <h2 className={styles.previewTitle}>
                {state.prompt ? truncate(state.prompt, 64) : 'Pick a suggestion or type a prompt'}
              </h2>
            </div>
            {state.usage && (
              <div className={styles.usage}>
                <UsageStat label="in" value={state.usage.input_tokens} />
                <UsageStat label="out" value={state.usage.output_tokens} />
                {(state.usage.cache_read_input_tokens ?? 0) > 0 && (
                  <UsageStat label="cached" value={state.usage.cache_read_input_tokens} highlight />
                )}
                {typeof state.ms === 'number' && (
                  <UsageStat label="ms" value={Math.round(state.ms)} />
                )}
              </div>
            )}
          </div>

          <div className={styles.canvas}>
            {state.status === 'idle' && <EmptyState />}
            {state.status === 'loading' && <LoadingState />}
            {state.status === 'error' && <ErrorState error={state.error ?? 'Unknown error'} raw={state.raw} />}
            {state.status === 'success' && state.tree && (
              <div className={styles.generated}>
                {renderNode(state.tree, 'root')}
              </div>
            )}
          </div>

          {state.status === 'success' && state.raw && (
            <div className={styles.codeWrap}>
              <CodeBlock code={tryPretty(state.raw)} language="json" title="Generated JSON tree" />
            </div>
          )}
        </section>
      </div>
    </AppShell>
  );
}

function UsageStat({ label, value, highlight = false }: { label: string; value?: number; highlight?: boolean }) {
  if (value == null) return null;
  return (
    <span className={`${styles.usageStat} ${highlight ? styles.usageStatHi : ''}`}>
      <span className={styles.usageVal}>{value}</span>
      <span className={styles.usageLabel}>{label}</span>
    </span>
  );
}

function EmptyState() {
  return (
    <div className={styles.empty}>
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
      <p>Pick a suggestion on the left or type a prompt below.</p>
    </div>
  );
}

function LoadingState() {
  return (
    <div className={styles.empty}>
      <span className={styles.spinner} aria-hidden />
      <p>Calling Claude…</p>
    </div>
  );
}

function ErrorState({ error, raw }: { error: string; raw?: string }) {
  return (
    <div className={styles.errorBox} role="alert">
      <strong>Generation failed</strong>
      <p>{error}</p>
      {raw && <pre className={styles.errorRaw}>{raw}</pre>}
    </div>
  );
}

function truncate(s: string, n: number) {
  return s.length > n ? `${s.slice(0, n - 1)}…` : s;
}

function tryPretty(text: string): string {
  try {
    return JSON.stringify(JSON.parse(text), null, 2);
  } catch {
    return text;
  }
}
