import { useState, type ReactNode } from 'react';
import CodeBlock from '../CodeBlock/CodeBlock';
import styles from './ComponentPreview.module.css';

export interface ComponentPreviewProps {
  /** Visual rendering of the example. */
  children: ReactNode;
  /** Source code displayed in the Code tab. */
  code: string;
  language?: string;
  /** Optional title above the preview. */
  title?: string;
  /** Optional brief description. */
  description?: string;
  /** Center contents in the preview surface (default true). */
  center?: boolean;
}

export default function ComponentPreview({
  children,
  code,
  language = 'tsx',
  title,
  description,
  center = true,
}: ComponentPreviewProps) {
  const [tab, setTab] = useState<'preview' | 'code'>('preview');

  return (
    <section className={styles.wrap} aria-labelledby={title ? slug(title) : undefined}>
      {(title || description) && (
        <header className={styles.head}>
          {title && <h3 id={slug(title)} className={styles.title}>{title}</h3>}
          {description && <p className={styles.desc}>{description}</p>}
        </header>
      )}
      <div className={styles.tabs} role="tablist">
        <button
          role="tab"
          aria-selected={tab === 'preview'}
          className={tab === 'preview' ? `${styles.tab} ${styles.tabActive}` : styles.tab}
          onClick={() => setTab('preview')}
        >
          Preview
        </button>
        <button
          role="tab"
          aria-selected={tab === 'code'}
          className={tab === 'code' ? `${styles.tab} ${styles.tabActive}` : styles.tab}
          onClick={() => setTab('code')}
        >
          Code
        </button>
      </div>
      {tab === 'preview' ? (
        <div className={center ? `${styles.preview} ${styles.previewCenter}` : styles.preview}>
          {children}
        </div>
      ) : (
        <div className={styles.codeWrap}>
          <CodeBlock code={code} language={language} />
        </div>
      )}
    </section>
  );
}

function slug(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
