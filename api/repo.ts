/**
 * /api/repo — Vercel serverless function.
 *
 * Returns normalized GitHub repo stats for the landing page. Uses
 * GITHUB_TOKEN if configured (raises the rate limit + works for private
 * repos); falls back to unauthenticated requests otherwise.
 */
export const config = { runtime: 'nodejs' };

const OWNER = 'aleemcolaberry';
const REPO = 'worldoftaxonomy-design-system';
const GH = 'https://api.github.com';

interface RepoResponse {
  description: string | null;
  htmlUrl: string;
  stars: number;
  forks: number;
  watchers: number;
  openIssues: number;
  pushedAt: string | null;
  defaultBranch: string;
  languages: Array<{ name: string; bytes: number; pct: number }>;
  lastCommit: { message: string; date: string; author: string; url: string } | null;
}

export default async function handler(_request: Request): Promise<Response> {
  const token = process.env.GITHUB_TOKEN;
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'wot-design-system',
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const [repoRes, commitsRes, langRes] = await Promise.all([
      fetch(`${GH}/repos/${OWNER}/${REPO}`, { headers }),
      fetch(`${GH}/repos/${OWNER}/${REPO}/commits?per_page=1`, { headers }),
      fetch(`${GH}/repos/${OWNER}/${REPO}/languages`, { headers }),
    ]);

    if (!repoRes.ok) {
      return json({ error: `GitHub returned ${repoRes.status} for the repo.` }, 502);
    }

    const repo = (await repoRes.json()) as Record<string, unknown>;

    // Languages → percentages
    let languages: RepoResponse['languages'] = [];
    if (langRes.ok) {
      const langMap = (await langRes.json()) as Record<string, number>;
      const total = Object.values(langMap).reduce((a, b) => a + b, 0) || 1;
      languages = Object.entries(langMap)
        .map(([name, bytes]) => ({ name, bytes, pct: Math.round((bytes / total) * 1000) / 10 }))
        .sort((a, b) => b.bytes - a.bytes);
    }

    // Latest commit
    let lastCommit: RepoResponse['lastCommit'] = null;
    if (commitsRes.ok) {
      const commits = (await commitsRes.json()) as Array<Record<string, any>>;
      const c = commits[0];
      if (c) {
        lastCommit = {
          message: String(c.commit?.message ?? '').split('\n')[0],
          date: String(c.commit?.author?.date ?? ''),
          author: String(c.commit?.author?.name ?? c.author?.login ?? 'unknown'),
          url: String(c.html_url ?? ''),
        };
      }
    }

    const payload: RepoResponse = {
      description: (repo.description as string) ?? null,
      htmlUrl: (repo.html_url as string) ?? `https://github.com/${OWNER}/${REPO}`,
      stars: (repo.stargazers_count as number) ?? 0,
      forks: (repo.forks_count as number) ?? 0,
      watchers: (repo.subscribers_count as number) ?? (repo.watchers_count as number) ?? 0,
      openIssues: (repo.open_issues_count as number) ?? 0,
      pushedAt: (repo.pushed_at as string) ?? null,
      defaultBranch: (repo.default_branch as string) ?? 'main',
      languages,
      lastCommit,
    };

    return json(payload, 200, {
      // Cache at the edge for 5 min, allow stale for an hour while revalidating.
      'Cache-Control': 's-maxage=300, stale-while-revalidate=3600',
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return json({ error: `Failed to reach GitHub: ${message}` }, 502);
  }
}

function json(payload: unknown, status = 200, extraHeaders: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', ...extraHeaders },
  });
}
