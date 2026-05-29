import { useEffect, useState } from 'react';

export interface RepoLanguage {
  name: string;
  bytes: number;
  pct: number;
}

export interface RepoData {
  description: string | null;
  htmlUrl: string;
  stars: number;
  forks: number;
  watchers: number;
  openIssues: number;
  pushedAt: string | null;
  defaultBranch: string;
  languages: RepoLanguage[];
  lastCommit: { message: string; date: string; author: string; url: string } | null;
}

interface RepoState {
  data: RepoData | null;
  loading: boolean;
  error: string | null;
}

// Module-level memo so the Topbar and the landing page share one fetch.
let cached: RepoData | null = null;
let inflight: Promise<RepoData> | null = null;

async function load(): Promise<RepoData> {
  if (cached) return cached;
  if (inflight) return inflight;
  inflight = fetch('/api/repo')
    .then(async (res) => {
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? `Request failed (${res.status})`);
      cached = data as RepoData;
      return cached;
    })
    .finally(() => {
      inflight = null;
    });
  return inflight;
}

export function useRepo(): RepoState {
  const [state, setState] = useState<RepoState>({
    data: cached,
    loading: !cached,
    error: null,
  });

  useEffect(() => {
    if (cached) {
      setState({ data: cached, loading: false, error: null });
      return;
    }
    let active = true;
    load()
      .then((data) => active && setState({ data, loading: false, error: null }))
      .catch((err) =>
        active && setState({ data: null, loading: false, error: String(err.message ?? err) })
      );
    return () => {
      active = false;
    };
  }, []);

  return state;
}

/** Compact star formatter: 1234 → "1.2k". */
export function formatCount(n: number): string {
  if (n < 1000) return String(n);
  return `${(n / 1000).toFixed(n < 10000 ? 1 : 0)}k`;
}

/** "3 hours ago" style relative time. */
export function relativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return '';
  const diff = Date.now() - then;
  const sec = Math.round(diff / 1000);
  const min = Math.round(sec / 60);
  const hr = Math.round(min / 60);
  const day = Math.round(hr / 24);
  if (sec < 60) return 'just now';
  if (min < 60) return `${min} min ago`;
  if (hr < 24) return `${hr} hour${hr === 1 ? '' : 's'} ago`;
  if (day < 30) return `${day} day${day === 1 ? '' : 's'} ago`;
  const mo = Math.round(day / 30);
  if (mo < 12) return `${mo} month${mo === 1 ? '' : 's'} ago`;
  const yr = Math.round(mo / 12);
  return `${yr} year${yr === 1 ? '' : 's'} ago`;
}
