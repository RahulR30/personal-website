"use client";

import { motion } from "framer-motion";
import { FlaskConical, Briefcase, Calendar, Globe, TrendingUp } from "lucide-react";
import FadeIn from "./FadeIn";

// The headline result — shown as a small table so the baseline comparison is
// impossible to miss. Quant readers look for the baseline before the number.
const benchmark = [
  { model: "Shared GRU + cross-sectional attention", r2: "0.28", primary: true },
  { model: "Ridge regression (baseline)", r2: "0.21", primary: false },
];

const method = [
  {
    label: "Data",
    body: "Three months of 1-second bars on NIFTY spot and futures — a noisy, high-frequency regime where most signal is microstructure.",
  },
  {
    label: "Model",
    body: "A temporal nowcasting model in PyTorch: a GRU encoder shared across instruments, plus cross-sectional attention so each name can condition on the rest of the panel.",
  },
  {
    label: "Signal",
    body: "Exploits spot-futures lead-lag structure to correct for stale prices, recovering information that a contemporaneous fit on the spot leg alone discards.",
  },
  {
    label: "Validation",
    body: "Walk-forward cross-validation throughout — no in-sample tuning on the evaluation windows — with a framework built to re-test scalability as the data regime changes.",
  },
];

const items = [
  {
    field: "Software Engineering · E-Commerce Infrastructure",
    status: "Active",
    statusStyle:
      "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/50",
    dotStyle: "bg-emerald-500 animate-pulse",
    icon: Briefcase,
    title: "Order Experience Financials — Wayfair",
    abstract:
      "Six-month co-op on the OX Financials & Integration team. Replaced legacy Kafka pipelines with direct BigQuery writes in C#, cutting ingestion-to-query latency across 5M+ daily order events, and built reusable multi-entity tax-calculation infrastructure now serving several backend services.",
    tags: ["C#", "BigQuery", "Apache Kafka", "Distributed Data", "5M+ events/day"],
    note: "Jul – Dec 2026 · Boston, MA",
  },
  {
    field: "Technical Leadership · Applied ML",
    status: "Active",
    statusStyle:
      "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/50",
    dotStyle: "bg-emerald-500 animate-pulse",
    icon: Globe,
    title: "Director of Technology — Northeastern AI & Blockchain",
    abstract:
      "Leading technical direction across two organizations: a React platform rebuild with a team of 5 engineers, a new ML research track pairing students with faculty, and workshops on mathematics, ML, and smart-contract development for 40+ underclassmen.",
    tags: ["React", "TypeScript", "ML Pipelines", "Curriculum Design"],
    note: "Sep 2025 – Present · Northeastern University",
  },
];

export default function Research() {
  return (
    <section id="research" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <FadeIn className="mb-16 text-center">
          <p className="text-xs font-semibold tracking-widest text-indigo-500 uppercase mb-3">Current Work</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Research &amp; engineering
          </h2>
          <p className="mt-4 text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto">
            Two tracks in parallel — quantitative research on intraday market
            data, and production engineering on systems that move millions of
            events a day.
          </p>
        </FadeIn>

        {/* Featured research */}
        <FadeIn>
          <article className="rounded-2xl border border-indigo-200/70 dark:border-indigo-800/50 bg-gradient-to-br from-indigo-50/70 to-violet-50/50 dark:from-indigo-950/30 dark:to-violet-950/20 shadow-sm overflow-hidden">
            <div className="p-8 sm:p-10">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-white dark:bg-zinc-900 border border-indigo-100 dark:border-indigo-800/50 flex items-center justify-center shrink-0">
                    <TrendingUp size={17} className="text-indigo-500" />
                  </div>
                  <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 leading-tight">
                    Quantitative Research · High-Frequency Data
                  </p>
                </div>
                <span className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold border rounded-full text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Active
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-2">
                Temporal Nowcasting with Lead-Lag Structure
              </h3>
              <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-6">
                ML Research Assistant · Northeastern Algorithms &amp; Theory Research Group · Jan 2026 – Present
              </p>

              {/* Result table */}
              <div className="mb-8 rounded-xl bg-white/80 dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-700/60 overflow-hidden">
                <div className="px-5 py-3 border-b border-zinc-200/80 dark:border-zinc-700/60 flex items-baseline justify-between">
                  <span className="text-xs font-semibold tracking-widest text-zinc-500 dark:text-zinc-400 uppercase">
                    Out-of-sample performance
                  </span>
                  <span className="text-xs text-zinc-400 font-mono">walk-forward R²</span>
                </div>
                {benchmark.map((row) => (
                  <div
                    key={row.model}
                    className="px-5 py-3.5 flex items-center justify-between gap-4 border-b last:border-b-0 border-zinc-100 dark:border-zinc-800"
                  >
                    <span
                      className={`text-sm ${
                        row.primary
                          ? "font-semibold text-zinc-900 dark:text-zinc-100"
                          : "text-zinc-500 dark:text-zinc-400"
                      }`}
                    >
                      {row.model}
                    </span>
                    <span
                      className={`font-mono text-lg tabular-nums shrink-0 ${
                        row.primary
                          ? "font-semibold text-indigo-600 dark:text-indigo-400"
                          : "text-zinc-400 dark:text-zinc-500"
                      }`}
                    >
                      {row.r2}
                    </span>
                  </div>
                ))}
              </div>

              {/* Method breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mb-8">
                {method.map((m) => (
                  <div key={m.label}>
                    <p className="text-xs font-semibold tracking-widest text-indigo-500 uppercase mb-1.5">
                      {m.label}
                    </p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{m.body}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {["PyTorch", "GRU", "Attention", "Time Series", "Walk-Forward CV", "Market Microstructure", "pandas / NumPy"].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-xs font-medium bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 rounded-lg"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </FadeIn>

        {/* Supporting work */}
        <FadeIn className="mt-16 mb-8" delay={0.1}>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Engineering &amp; leadership
          </h3>
          <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
            The other half of what I&apos;m doing right now.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <FadeIn key={item.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="h-full flex flex-col rounded-2xl p-6 bg-gradient-to-br from-slate-50 to-zinc-50 dark:from-zinc-900 dark:to-slate-900/50 border border-zinc-200/60 dark:border-zinc-700/60 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-800/50 flex items-center justify-center shrink-0">
                      <Icon size={17} className="text-indigo-500" />
                    </div>
                    <span className={`shrink-0 flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold border rounded-full ${item.statusStyle}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${item.dotStyle}`} />
                      {item.status}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 leading-tight mb-2">
                    {item.field}
                  </p>
                  <h4 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                    {item.title}
                  </h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-5 flex-1">
                    {item.abstract}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[11px] font-medium bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-zinc-400 dark:text-zinc-500 border-t border-zinc-200 dark:border-zinc-700/60 pt-4">
                    <Calendar size={12} className="shrink-0" />
                    <span>{item.note}</span>
                  </div>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn className="mt-10 flex items-start gap-2.5 text-xs text-zinc-400 dark:text-zinc-500" delay={0.2}>
          <FlaskConical size={13} className="shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Happy to walk through the modeling decisions, the failure modes, and
            what the baseline comparison does and doesn&apos;t establish — just reach out.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
