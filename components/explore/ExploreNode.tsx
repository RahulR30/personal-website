"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CornerDownLeft, Sparkles, ChevronDown } from "lucide-react";
import type { ProfileItem } from "@/lib/profile";
import { kindMeta } from "./kinds";

type Turn = { question: string; answer?: string; error?: string };

/** A constellation node: the fact, plus its own ask box so a recruiter can
 *  interrogate that one item without leaving the graph. Clicking the card
 *  expands it to the full, unclipped detail. */
export default function ExploreNode({
  item,
  drift = 0,
  expanded = false,
  onToggle,
}: {
  item: ProfileItem;
  drift?: number;
  expanded?: boolean;
  onToggle?: () => void;
}) {
  const [question, setQuestion] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [pending, setPending] = useState(false);
  const meta = kindMeta[item.kind];

  const ask = async (q: string) => {
    const trimmed = q.trim();
    if (trimmed.length < 3 || pending) return;

    setQuestion("");
    setPending(true);
    setTurns((prev) => [...prev, { question: trimmed }]);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId: item.id, question: trimmed }),
      });
      const data = await res.json();
      setTurns((prev) =>
        prev.map((t, i) =>
          i === prev.length - 1
            ? {
                ...t,
                ...(res.ok ? { answer: data.answer } : { error: data.error }),
              }
            : t,
        ),
      );
    } catch {
      setTurns((prev) =>
        prev.map((t, i) =>
          i === prev.length - 1
            ? { ...t, error: "Couldn't reach the server." }
            : t,
        ),
      );
    } finally {
      setPending(false);
    }
  };

  return (
    // Two elements on purpose: the outer one owns the repeating float, the
    // inner one owns size. Putting framer's `layout` on the same element as an
    // infinite `y` keyframe makes it re-measure every frame, which shows up as
    // the card pulsing between sizes after you collapse it.
    <motion.div
      animate={expanded ? { y: 0 } : { y: [0, -5, 0] }}
      transition={
        expanded
          ? { duration: 0.2 }
          : { duration: 5 + drift * 0.6, repeat: Infinity, ease: "easeInOut" }
      }
    >
      <div
        className={`group rounded-2xl border bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md shadow-lg transition-[width,border-color] duration-300 ease-out ${
          expanded
            ? "w-[320px] border-indigo-400 dark:border-indigo-600 ring-2 ring-indigo-500/20"
            : "w-[260px] border-zinc-200 dark:border-zinc-800 hover:border-indigo-300 dark:hover:border-indigo-700"
        } ${meta.glow}`}
      >
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={expanded}
          className="w-full text-left p-4 cursor-pointer"
        >
          <div className="flex items-center gap-1.5 mb-2">
            <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
            <span
              className={`px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider rounded ${meta.badge}`}
            >
              {meta.label}
            </span>
            <span className="ml-auto text-[10px] text-zinc-400 truncate">
              {item.period}
            </span>
            <ChevronDown
              size={13}
              className={`shrink-0 text-zinc-400 transition-transform ${expanded ? "rotate-180" : ""}`}
            />
          </div>

          <h3
            className={`text-[13px] font-semibold text-zinc-900 dark:text-zinc-100 leading-snug ${
              expanded ? "" : "line-clamp-2"
            }`}
          >
            {item.title}
          </h3>
          <p
            className={`mt-0.5 text-[11px] font-medium text-indigo-600 dark:text-indigo-400 ${
              expanded ? "" : "truncate"
            }`}
          >
            {item.org}
          </p>
          <p
            className={`mt-2 text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed ${
              expanded ? "" : "line-clamp-3"
            }`}
          >
            {item.summary}
          </p>

          {expanded && (
            <div className="mt-3 flex flex-wrap gap-1">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-1.5 py-0.5 text-[10px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {!expanded && (
            <span className="mt-2 inline-block text-[10px] font-medium text-zinc-400 group-hover:text-indigo-500 transition-colors">
              Click to expand
            </span>
          )}
        </button>

        {/* Answers accumulate inline, growing the node */}
        <AnimatePresence initial={false}>
          {turns.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className={`px-4 pb-1 space-y-2.5 overflow-y-auto ${
                expanded ? "max-h-80" : "max-h-52"
              }`}
            >
              {turns.map((turn, i) => (
                <div
                  key={i}
                  className="pt-2 border-t border-zinc-100 dark:border-zinc-800"
                >
                  <p className="text-[11px] font-semibold text-zinc-800 dark:text-zinc-200">
                    {turn.question}
                  </p>
                  {turn.answer && (
                    <div className="mt-1 flex gap-1.5">
                      <Sparkles
                        size={11}
                        className="text-indigo-500 shrink-0 mt-0.5"
                      />
                      <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {turn.answer}
                      </p>
                    </div>
                  )}
                  {turn.error && (
                    <p className="mt-1 text-[11px] text-rose-600 dark:text-rose-400">
                      {turn.error}
                    </p>
                  )}
                  {!turn.answer && !turn.error && (
                    <span className="mt-1.5 inline-block w-3 h-3 border-2 border-indigo-300 border-t-indigo-600 rounded-full animate-spin" />
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Per-node ask box */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            ask(question);
          }}
          className="p-3 pt-2 border-t border-zinc-100 dark:border-zinc-800"
        >
          <div className="relative">
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              maxLength={400}
              placeholder="Ask about this…"
              aria-label={`Ask about ${item.title}`}
              className="w-full pl-3 pr-8 py-1.5 text-[11px] text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 bg-zinc-50 dark:bg-zinc-800/70 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-700 transition-all"
            />
            <button
              type="submit"
              disabled={pending || question.trim().length < 3}
              aria-label="Send question"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1 rounded text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <CornerDownLeft size={12} />
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
