"use client";

import { useState } from "react";
import { Search, Sparkles, CornerDownLeft } from "lucide-react";
import { type ProfileItem } from "@/lib/profile";
import { streamMatch } from "@/lib/streamMatch";

const examples = [
  "C++ and low-latency data systems",
  "Quant researcher who can validate a signal properly",
  "Backend intern comfortable with streaming pipelines",
  "Someone with strong linear algebra and ML fundamentals",
];

const kindLabel: Record<ProfileItem["kind"], string> = {
  experience: "Experience",
  project: "Project",
  activity: "Leadership",
  education: "Education",
};

type Result = { summary: string; items: ProfileItem[] };

export default function RecruiterSearch() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  const runSearch = async (q: string) => {
    const trimmed = q.trim();
    if (trimmed.length < 3 || loading) return;

    setLoading(true);
    setError(null);
    setResult({ summary: "", items: [] });

    const failure = await streamMatch(trimmed, {
      onSummary: (delta) =>
        setResult((prev) => ({
          summary: (prev?.summary ?? "") + delta,
          items: prev?.items ?? [],
        })),
      onItems: (items) =>
        setResult((prev) => ({ summary: prev?.summary ?? "", items })),
    });

    setLoading(false);
    if (failure) {
      setError(failure);
      setResult(null);
    }
  };

  return (
    <section className="mb-12">
      <label
        htmlFor="recruiter-search"
        className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3"
      >
        Tell me what you&apos;re looking for
      </label>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          runSearch(query);
        }}
      >
        <div className="relative">
          <Search
            size={17}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
          />
          <input
            id="recruiter-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            maxLength={400}
            placeholder="e.g. we need someone strong in C++ and low-latency data"
            className="w-full pl-11 pr-28 py-3.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-700 focus:border-indigo-400 transition-all"
          />
          <button
            type="submit"
            disabled={loading || query.trim().length < 3}
            className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-zinc-900 dark:bg-indigo-600 rounded-lg hover:bg-zinc-700 dark:hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Matching…" : <>Match<CornerDownLeft size={12} /></>}
          </button>
        </div>
      </form>

      {/* Example prompts */}
      {!result && !loading && (
        <div className="mt-3 flex flex-wrap gap-2">
          {examples.map((ex) => (
            <button
              key={ex}
              onClick={() => {
                setQuery(ex);
                runSearch(ex);
              }}
              className="px-2.5 py-1 text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-lg hover:border-indigo-300 dark:hover:border-indigo-600 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {ex}
            </button>
          ))}
        </div>
      )}

      {loading && !result?.summary && (
        <div className="mt-4 flex items-center gap-2.5 text-sm text-zinc-500 dark:text-zinc-400">
          <span className="w-3.5 h-3.5 border-2 border-indigo-300 border-t-indigo-600 rounded-full animate-spin" />
          Matching against Rahul&apos;s background…
        </div>
      )}

      {error && (
        <p className="mt-4 text-sm text-rose-600 dark:text-rose-400">{error}</p>
      )}

      {result && (result.summary || result.items.length > 0) && (
        <div className="mt-5 rounded-2xl border border-indigo-200/70 dark:border-indigo-800/50 bg-indigo-50/50 dark:bg-indigo-950/20 overflow-hidden">
          <div className="p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={14} className="text-indigo-500 shrink-0" />
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                How Rahul maps to that
              </span>
            </div>
            <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {result.summary}
            </p>
          </div>

          {result.items.length > 0 && (
            <div className="border-t border-indigo-200/70 dark:border-indigo-800/50 divide-y divide-indigo-200/60 dark:divide-indigo-800/40">
              {result.items.map((item) => (
                <article key={item.id} className="p-5 sm:p-6 bg-white/70 dark:bg-zinc-900/50">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 mb-1.5">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-500 dark:text-indigo-400">
                      {kindLabel[item.kind]}
                    </span>
                    <span className="text-xs text-zinc-400">{item.period}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {item.title}
                  </h3>
                  <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400 mb-2">
                    {item.org}
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {item.summary}
                  </p>
                </article>
              ))}
            </div>
          )}

          <div className="px-5 sm:px-6 py-3 bg-white/70 dark:bg-zinc-900/50 border-t border-indigo-200/70 dark:border-indigo-800/50">
            <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
              Summary is generated, grounded strictly in the verified background
              below — the detail cards are Rahul&apos;s own text, unedited.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
