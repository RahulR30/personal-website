import { GoogleGenAI } from "@google/genai";

// Gemini Flash on the free tier — no billing account required.
// Override with GEMINI_MODEL if this alias is retired (Google does rotate these;
// a retired alias returns 404 with the replacement named in the message).
export const MODEL = process.env.GEMINI_MODEL ?? "gemini-3.6-flash";

export const MAX_QUERY_CHARS = 400;

export function getClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  return apiKey ? new GoogleGenAI({ apiKey }) : null;
}

/** Best-effort in-memory limiter, one bucket per key (usually an IP).
 *  Serverless instances don't share memory, so this caps abuse per instance
 *  rather than globally — enough for a personal site, and it keeps a single
 *  instance inside the free tier's requests-per-minute ceiling. */
const WINDOW_MS = 60_000;
const buckets = new Map<string, number[]>();

export function rateLimited(key: string, maxPerWindow = 8): boolean {
  const now = Date.now();
  const recent = (buckets.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  buckets.set(key, recent);

  if (buckets.size > 500) {
    for (const [k, times] of buckets) {
      if (times.every((t) => now - t >= WINDOW_MS)) buckets.delete(k);
    }
  }
  return recent.length > maxPerWindow;
}

export function clientIp(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
}
