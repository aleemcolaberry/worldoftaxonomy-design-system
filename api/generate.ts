/**
 * /api/generate — Vercel serverless function.
 *
 * Takes a free-form user prompt and returns a JSON tree of WoT components
 * that the client renders via renderTree(). The Anthropic API key stays
 * on the server.
 *
 * Uses prompt caching on the (long) system manifest so each generation
 * costs ~one short prompt's worth of tokens after the first call.
 */
import Anthropic from '@anthropic-ai/sdk';
import { manifestForSystemPrompt } from '../src/lib/manifest';

export const config = { runtime: 'nodejs' };

const MODEL = 'claude-haiku-4-5-20251001';

const TREE_RULES = `
You are the UI generator for the WoT AI Design System.

Given a short prompt from a designer, return a JSON object describing the UI to render.

Schema:
  {
    "tag": "<HTML tag or WoT component name>",
    "props": { ... optional },
    "children": <string | TreeNode | (TreeNode | string)[] | null>
  }

Rules:
1. Output ONLY a single valid JSON object. No prose, no markdown fences, no commentary before or after.
2. The root node is usually a layout container — pick "section" or "div" or "form".
3. Use WoT components for all interactive / styled UI. Buttons MUST be the Button component, never <button>. Inputs MUST be Input, etc.
4. Use HTML tags only for layout (div, section, header, etc.) and inline text (h1–h6, p, strong, em, br, ul, ol, li, a).
5. For Card layouts, use the Card subcomponents (CardHeader, CardTitle, CardDescription, CardBody, CardFooter).
6. For Select, pass an "options" prop that is an ARRAY of { value, label, disabled? }.
7. For icon-only buttons (iconOnly: true), set "aria-label" and pass an SVG element as children using lowercase "svg", "path", "circle", "rect", "line" etc. NOTE: those SVG tags are not in the HTML whitelist, so prefer omitting icons unless explicitly asked.
8. Keep designs concise — avoid more than ~30 nodes total. Favor real content over Lorem Ipsum.
9. The primary action of any surface should use Button variant="primary".
10. Use one tone (success / warning / error) at most per surface, plus the primary cyan accent.

Available components and HTML tags follow:

${manifestForSystemPrompt()}

Remember: respond with ONLY the JSON object.
`.trim();

// Standard Web Request → Web Response (works on Vercel Node runtime).
export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed.' }, 405);
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return json({
      error:
        'ANTHROPIC_API_KEY is not configured. Set it on the Vercel project (Settings → Environment Variables) and redeploy.',
    }, 500);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Request body must be JSON: { "prompt": "..." }' }, 400);
  }

  const prompt =
    body && typeof body === 'object' && 'prompt' in body
      ? String((body as { prompt: unknown }).prompt ?? '').trim()
      : '';

  if (!prompt) {
    return json({ error: 'Missing prompt.' }, 400);
  }
  if (prompt.length > 2000) {
    return json({ error: 'Prompt is too long (max 2000 chars).' }, 400);
  }

  const client = new Anthropic({ apiKey });

  try {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 2048,
      // Cache the long manifest. After the first call within a 5-min window,
      // subsequent calls pay only for the (small) input message + output.
      system: [
        {
          type: 'text',
          text: TREE_RULES,
          cache_control: { type: 'ephemeral' },
        },
      ],
      messages: [{ role: 'user', content: prompt }],
    });

    const text = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === 'text')
      .map((b) => b.text)
      .join('\n')
      .trim();

    const tree = extractJson(text);
    if (!tree) {
      return json(
        {
          error: 'Model did not return parseable JSON.',
          raw: text.slice(0, 4000),
          usage: response.usage,
        },
        502
      );
    }

    return json({
      tree,
      raw: text,
      usage: response.usage,
      model: MODEL,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return json({ error: `Anthropic call failed: ${message}` }, 502);
  }
}

function json(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}

/**
 * Extract the first balanced JSON object from a string. Handles cases where
 * the model wraps output in ```json fences despite being told not to.
 */
function extractJson(text: string): unknown | null {
  if (!text) return null;

  const fenceMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fenceMatch ? fenceMatch[1] : text;

  const trimmed = candidate.trim();
  // Find the first { and the matching closing }.
  const start = trimmed.indexOf('{');
  if (start < 0) return null;

  let depth = 0;
  let inString = false;
  let escape = false;
  for (let i = start; i < trimmed.length; i++) {
    const ch = trimmed[i];
    if (escape) { escape = false; continue; }
    if (ch === '\\') { escape = true; continue; }
    if (ch === '"') { inString = !inString; continue; }
    if (inString) continue;
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) {
        try {
          return JSON.parse(trimmed.slice(start, i + 1));
        } catch {
          return null;
        }
      }
    }
  }
  return null;
}
