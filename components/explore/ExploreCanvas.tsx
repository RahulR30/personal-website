"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Sparkles,
  RotateCcw,
  LayoutList,
  CornerDownLeft,
  Briefcase,
} from "lucide-react";
import { type ProfileItem } from "@/lib/profile";
import { streamMatch } from "@/lib/streamMatch";
import ExploreNode from "./ExploreNode";

const examples = [
  "Quant researcher who validates signals properly",
  "Backend engineer for high-throughput data",
  "Strong math and ML fundamentals",
  "Someone who's shipped to production",
];

// Fixed design-space for the graph; scaled to fit whatever width we get so the
// arrow geometry can be computed in plain pixels.
const W = 1340;
const H = 900;
const CX = W / 2;
const CY = H / 2;
// Spread must clear the hub: RX > HUB_HW + NODE_HW, or the side arrows
// collapse to nothing because the cards are already touching.
const RX = 500; // horizontal spread of the constellation
const RY = 322; // vertical spread

const NODE_HW = 130; // node card half-width
const NODE_HH = 96; // approx half-height, for arrow trimming
const HUB_HW = 268; // centre hub half-width (w-[536px] / 2)
const HUB_HH = 118; // hub is taller once "the read" is showing

/** Where the ray from `from` to `to` exits an axis-aligned box of half-size
 *  (hw, hh) centred on `from`. Used to start/end arrows at the card edges
 *  rather than at their centres. */
function edgeOffset(dx: number, dy: number, hw: number, hh: number) {
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const tx = Math.abs(ux) < 1e-6 ? Infinity : hw / Math.abs(ux);
  const ty = Math.abs(uy) < 1e-6 ? Infinity : hh / Math.abs(uy);
  const t = Math.min(tx, ty);
  return { ux, uy, t };
}

function nodePositions(count: number) {
  // Spread evenly around the full circle, starting at the top.
  return Array.from({ length: count }, (_, i) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / count;
    return { x: CX + RX * Math.cos(angle), y: CY + RY * Math.sin(angle) };
  });
}

type Phase = "idle" | "loading" | "streaming" | "results";

export default function ExploreCanvas({ onExit }: { onExit: () => void }) {
  const [query, setQuery] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [summary, setSummary] = useState("");
  const [items, setItems] = useState<ProfileItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Guards against an earlier, slower response overwriting a later one when
  // searches are fired in quick succession (e.g. clicking an example, then
  // typing). Only the most recent request is allowed to commit state.
  const requestSeq = useRef(0);

  // Scale the fixed-size graph down to whatever width is available.
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      setScale(Math.max(0.5, Math.min(1, w / W)));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const search = async (q: string) => {
    const trimmed = q.trim();
    if (trimmed.length < 3 || phase === "loading" || phase === "streaming") return;

    const seq = ++requestSeq.current;
    setQuery(trimmed);
    setPhase("loading");
    setError(null);
    setItems([]);
    setSummary("");
    setExpandedId(null);

    const failure = await streamMatch(trimmed, {
      onSummary: (delta) => {
        if (seq !== requestSeq.current) return; // superseded
        // First token is the cue to switch out of the loading state.
        setPhase("streaming");
        setSummary((prev) => prev + delta);
      },
      onItems: (found) => {
        if (seq !== requestSeq.current) return;
        setItems(found);
        setPhase("results");
      },
    });

    if (seq !== requestSeq.current) return;
    if (failure) {
      setError(failure);
      setPhase("idle");
    }
  };

  const reset = () => {
    setPhase("idle");
    setQuery("");
    setSummary("");
    setItems([]);
    setError(null);
  };

  const busy = phase === "loading" || phase === "streaming";
  const showResults = phase === "results" && items.length > 0;
  const positions = nodePositions(items.length || 1);

  // The hub: search box, plus the generated read once results land.
  const hub = (
    <div className="w-[min(536px,92vw)]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          search(query);
        }}
      >
        <div className="relative">
          <motion.div
            animate={
              phase === "loading"
                ? { opacity: [0.45, 1, 0.45], scale: [1, 1.03, 1] }
                : { opacity: 0.45, scale: 1 }
            }
            transition={{ duration: 1.5, repeat: phase === "loading" ? Infinity : 0 }}
            className="absolute -inset-[3px] rounded-2xl bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 blur-[7px]"
          />
          <div className="relative flex items-center bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl">
            <Search size={18} className="ml-4 text-zinc-400 shrink-0" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              maxLength={400}
              autoFocus
              aria-label="Describe the role you're hiring for"
              placeholder="What kind of candidate are you looking for?"
              className="flex-1 min-w-0 bg-transparent px-3 py-3.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none"
            />
            <button
              type="submit"
              disabled={busy || query.trim().length < 3}
              className="mr-2 inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-zinc-900 dark:bg-indigo-600 rounded-xl hover:bg-zinc-700 dark:hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
            >
              {busy ? "Mapping…" : <>Map<CornerDownLeft size={12} /></>}
            </button>
          </div>
        </div>
      </form>

      <AnimatePresence>
        {summary && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-3 rounded-xl border border-indigo-200/70 dark:border-indigo-800/50 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md p-4 shadow-lg"
          >
            <div className="flex items-center gap-1.5 mb-1.5">
              <Sparkles size={12} className="text-indigo-500 shrink-0" />
              <span className="text-[10px] font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                The read
              </span>
            </div>
            <p className="text-[12px] text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {summary}
              {phase === "streaming" && (
                <motion.span
                  animate={{ opacity: [1, 0.15, 1] }}
                  transition={{ duration: 0.9, repeat: Infinity }}
                  className="ml-0.5 inline-block w-[2px] h-[0.9em] translate-y-[1px] bg-indigo-500"
                />
              )}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    // Above the site navbar (z-50) so the classic chrome doesn't bleed through.
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-[#fafafa] dark:bg-[#0a0a0c]">
      {/* Ambient field */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.14, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-1/2 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.17) 0%, rgba(139,92,246,0.07) 45%, transparent 70%)",
          }}
        />
      </div>

      {/* Controls */}
      <div className="fixed top-5 right-5 z-30 flex items-center gap-2">
        {phase === "results" && (
          <button
            onClick={reset}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-zinc-500 dark:text-zinc-400 bg-white/85 dark:bg-zinc-900/85 backdrop-blur border border-zinc-200 dark:border-zinc-800 rounded-lg hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            <RotateCcw size={13} />
            New search
          </button>
        )}
        <Link
          href="/recruiter"
          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-white/85 dark:bg-zinc-900/85 backdrop-blur border border-indigo-200 dark:border-indigo-800/60 rounded-lg hover:border-indigo-400 dark:hover:border-indigo-600 transition-colors"
        >
          <Briefcase size={13} />
          Recruiter view
        </Link>
        <button
          onClick={onExit}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-zinc-600 dark:text-zinc-300 bg-white/85 dark:bg-zinc-900/85 backdrop-blur border border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
        >
          <LayoutList size={13} />
          Classic view
        </button>
      </div>

      {/* ---------- Desktop: constellation ---------- */}
      {/* pb gives an expanded card room to grow into scrollable space */}
      <div ref={wrapRef} className="hidden lg:block w-full pb-48">
        <div
          style={{ height: H * scale }}
          className="relative w-full flex items-start justify-center"
        >
          <div
            style={{
              width: W,
              height: H,
              transform: `scale(${scale})`,
              transformOrigin: "top center",
            }}
            className="relative shrink-0"
          >
            {/* Arrows, drawn beneath the cards */}
            <svg className="absolute inset-0 pointer-events-none" width={W} height={H}>
              <defs>
                <marker
                  id="node-arrow"
                  markerWidth="9"
                  markerHeight="9"
                  refX="8"
                  refY="4.5"
                  orient="auto"
                >
                  <path
                    d="M0,0.5 L8.5,4.5 L0,8.5 z"
                    className="fill-indigo-400/70 dark:fill-indigo-500/70"
                  />
                </marker>
              </defs>
              {showResults &&
                positions.slice(0, items.length).map((p, i) => {
                  const dx = p.x - CX;
                  const dy = p.y - CY;
                  const { ux, uy } = edgeOffset(dx, dy, HUB_HW, HUB_HH);
                  const start = edgeOffset(dx, dy, HUB_HW, HUB_HH);
                  const end = edgeOffset(dx, dy, NODE_HW, NODE_HH);
                  const x1 = CX + ux * start.t;
                  const y1 = CY + uy * start.t;
                  const x2 = p.x - ux * end.t;
                  const y2 = p.y - uy * end.t;
                  return (
                    <path
                      key={items[i].id}
                      d={`M ${x1} ${y1} L ${x2} ${y2}`}
                      fill="none"
                      strokeWidth={1.4}
                      markerEnd="url(#node-arrow)"
                      pathLength={1}
                      strokeDasharray={1}
                      className="stroke-indigo-400/70 dark:stroke-indigo-500/60"
                      style={{
                        strokeDashoffset: 1,
                        opacity: 0,
                        animation: `arrow-draw 0.55s ease-out ${0.15 + i * 0.09}s forwards`,
                      }}
                    />
                  );
                })}
            </svg>

            {/* Centre hub */}
            <div
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2 flex justify-center"
              style={{ left: CX, top: CY }}
            >
              {hub}
            </div>

            {/* Constellation nodes */}
            <AnimatePresence>
              {showResults &&
                items.map((item, i) => (
                  <motion.div
                    key={item.id}
                    // Expanded node lifts above both its neighbours and the hub
                    // so the full card is never clipped by them.
                    className={`absolute flex justify-center ${
                      expandedId === item.id ? "z-30" : "z-10"
                    }`}
                    style={{ left: positions[i].x, top: positions[i].y }}
                    initial={{ opacity: 0, scale: 0.5, x: "-50%", y: "-50%" }}
                    // Expanded cards grow downward from roughly where the
                    // collapsed card's top edge was. Centring them instead
                    // pushes tall cards off the top of the page, and overflow
                    // above the scroll container can't be scrolled to.
                    animate={{
                      opacity: 1,
                      scale: 1,
                      x: "-50%",
                      y: expandedId === item.id ? -NODE_HH : "-50%",
                    }}
                    exit={{ opacity: 0, scale: 0.6, x: "-50%", y: "-50%" }}
                    transition={{
                      type: "spring",
                      damping: 17,
                      stiffness: 200,
                      delay: 0.2 + i * 0.1,
                    }}
                  >
                    <ExploreNode
                      item={item}
                      drift={i}
                      expanded={expandedId === item.id}
                      onToggle={() =>
                        setExpandedId((prev) => (prev === item.id ? null : item.id))
                      }
                    />
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Idle affordances live under the hub */}
        {(phase === "idle" || phase === "loading") && (
          <div className="relative -mt-[34vh] flex flex-col items-center px-6 pb-16">
            <IdleExtras phase={phase} error={error} onPick={search} />
          </div>
        )}
      </div>

      {/* ---------- Mobile / tablet: stacked ---------- */}
      <div className="lg:hidden relative min-h-screen flex flex-col items-center px-5 py-24">
        <div className="w-full max-w-lg flex flex-col items-center">
          {hub}
          <div className="mt-4 w-full">
            <IdleExtras phase={phase} error={error} onPick={search} hide={phase !== "idle" && phase !== "loading"} />
          </div>
          <AnimatePresence>
            {showResults && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-8 w-full flex flex-col items-center gap-5"
              >
                {items.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 * i }}
                    className="flex flex-col items-center"
                  >
                    <span className="mb-2 h-6 w-px bg-indigo-300 dark:bg-indigo-700" />
                    <ExploreNode
                      item={item}
                      drift={i}
                      expanded={expandedId === item.id}
                      onToggle={() =>
                        setExpandedId((prev) => (prev === item.id ? null : item.id))
                      }
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {phase === "results" && items.length === 0 && (
        <p className="fixed bottom-10 inset-x-0 text-center text-sm text-zinc-400">
          Nothing matched directly — try describing the role differently.
        </p>
      )}
    </div>
  );
}

function IdleExtras({
  phase,
  error,
  onPick,
  hide,
}: {
  phase: Phase;
  error: string | null;
  onPick: (q: string) => void;
  hide?: boolean;
}) {
  if (hide) return null;
  return (
    <>
      {phase === "loading" ? (
        <div className="flex flex-col items-center gap-2.5 mt-2">
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={{ y: [0, -7, 0], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.15 }}
                className="w-2 h-2 rounded-full bg-indigo-500"
              />
            ))}
          </div>
          <p className="text-xs text-zinc-400">Mapping the constellation…</p>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-2">
          {examples.map((ex) => (
            <button
              key={ex}
              onClick={() => onPick(ex)}
              className="px-3 py-1.5 text-xs text-zinc-500 dark:text-zinc-400 bg-white/70 dark:bg-zinc-900/60 backdrop-blur border border-zinc-200 dark:border-zinc-800 rounded-full hover:border-indigo-300 dark:hover:border-indigo-600 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {ex}
            </button>
          ))}
        </div>
      )}
      {error && (
        <p className="mt-3 text-center text-sm text-rose-600 dark:text-rose-400">{error}</p>
      )}
    </>
  );
}
