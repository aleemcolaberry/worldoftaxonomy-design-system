import type { ReactNode } from 'react';
import { useRepo, formatCount, relativeTime, type RepoLanguage } from '../../lib/useRepo';
import styles from './RepoStats.module.css';

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  CSS: '#563d7c',
  HTML: '#e34c26',
  Shell: '#89e051',
  Python: '#3572A5',
};

function langColor(name: string, i: number): string {
  if (LANG_COLORS[name]) return LANG_COLORS[name];
  // Fallback: cyan ramp
  const ramp = ['var(--color-cyan-500)', 'var(--color-cyan-700)', 'var(--color-zinc-400)', 'var(--color-zinc-600)'];
  return ramp[i % ramp.length];
}

const StarIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 2 14.6 8.6 22 9.3l-5.5 4.9L18 22l-6-3.6L6 22l1.5-7.8L2 9.3l7.4-.7L12 2Z" />
  </svg>
);
const ForkIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="6" cy="6" r="3" /><circle cx="18" cy="6" r="3" /><circle cx="12" cy="18" r="3" />
    <path d="M6 9v3a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V9M12 15v0" />
  </svg>
);
const EyeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />
  </svg>
);
const PrIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M6 9v6M15 6h3a2 2 0 0 1 2 2v7" /><polyline points="18 9 15 6 18 3" />
  </svg>
);
const CommitIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="3" /><line x1="3" y1="12" x2="9" y2="12" /><line x1="15" y1="12" x2="21" y2="12" />
  </svg>
);

export default function RepoStats() {
  const { data, loading, error } = useRepo();

  if (loading) {
    return (
      <div className={`${styles.wrap} ${styles.skeleton}`} aria-busy>
        <div className={styles.skelRow} />
        <div className={styles.skelRow} />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={styles.wrap}>
        <p className={styles.errorNote}>
          Couldn&apos;t load repo stats{error ? `: ${error}` : '.'}{' '}
          <a href="https://github.com/aleemcolaberry/worldoftaxonomy-design-system" target="_blank" rel="noreferrer">
            View on GitHub →
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.statRow}>
        <Stat icon={<StarIcon />} value={formatCount(data.stars)} label="stars" />
        <Stat icon={<ForkIcon />} value={formatCount(data.forks)} label="forks" />
        <Stat icon={<EyeIcon />} value={formatCount(data.watchers)} label="watching" />
        <Stat icon={<PrIcon />} value={String(data.openIssues)} label="open" />
      </div>

      {data.languages.length > 0 && (
        <div className={styles.langBlock}>
          <div className={styles.langBar} role="img" aria-label="Language breakdown">
            {data.languages.map((l, i) => (
              <span
                key={l.name}
                className={styles.langSeg}
                style={{ width: `${l.pct}%`, background: langColor(l.name, i) }}
                title={`${l.name} ${l.pct}%`}
              />
            ))}
          </div>
          <div className={styles.langLegend}>
            {data.languages.slice(0, 4).map((l: RepoLanguage, i) => (
              <span key={l.name} className={styles.langItem}>
                <span className={styles.langDot} style={{ background: langColor(l.name, i) }} aria-hidden />
                {l.name} <span className={styles.langPct}>{l.pct}%</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {data.lastCommit && (
        <a className={styles.commit} href={data.lastCommit.url} target="_blank" rel="noreferrer">
          <span className={styles.commitIcon}><CommitIcon /></span>
          <span className={styles.commitMsg}>{data.lastCommit.message}</span>
          <span className={styles.commitMeta}>
            {data.lastCommit.author} · {relativeTime(data.lastCommit.date)}
          </span>
        </a>
      )}
    </div>
  );
}

function Stat({ icon, value, label }: { icon: ReactNode; value: string; label: string }) {
  return (
    <span className={styles.stat}>
      <span className={styles.statIcon}>{icon}</span>
      <span className={styles.statValue}>{value}</span>
      <span className={styles.statLabel}>{label}</span>
    </span>
  );
}
