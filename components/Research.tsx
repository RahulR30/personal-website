"use client";

import { motion } from "framer-motion";
import { FlaskConical, Lock, Briefcase, Calendar, Globe, Brain } from "lucide-react";
import FadeIn from "./FadeIn";

const items = [
  {
    type: "work" as const,
    field: "Software Engineering · E-Commerce",
    status: "Upcoming",
    statusStyle: "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800/50",
    dotStyle: "bg-indigo-500",
    icon: Briefcase,
    title: "Software Engineer Co-op — Wayfair",
    abstract:
      "Joining Wayfair's Supply Chain & Retail Technology team in Boston for a six-month co-op. Will be working on engineering problems at the intersection of e-commerce infrastructure, supply chain logistics, and retail systems — applying software engineering to large-scale, data-driven platforms.",
    tags: ["Supply Chain Systems", "Retail Technology", "Boston, MA", "Jul – Dec 2026"],
    note: "Starting July 2026.",
  },
  {
    type: "work" as const,
    field: "Computer Vision · Artificial Intelligence",
    status: "Active",
    statusStyle: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/50",
    dotStyle: "bg-emerald-500 animate-pulse",
    icon: Brain,
    title: "Adaptive Facial Expression Recognition",
    abstract:
      "Building a game-based learning tool to help neurodivergent children recognize facial expressions using real human faces. Implemented a CNN in PyTorch trained on FER2013Plus (73.67% test accuracy) and explored Vision Transformers for higher performance. Also optimized the training data pipeline to eliminate dead time between epochs.",
    tags: ["PyTorch", "CNN", "Vision Transformer", "Computer Vision", "CS4100"],
    note: "CS4100 · Foundations of AI · Northeastern University",
  },
  {
    type: "work" as const,
    field: "Web Development · Leadership",
    status: "Active",
    statusStyle: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/50",
    dotStyle: "bg-emerald-500 animate-pulse",
    icon: Globe,
    title: "Northeastern Blockchain — Web Platform",
    abstract:
      "Leading a student developer team to build and maintain the Northeastern Blockchain organization's web presence. Coordinating agile sprints, conducting code reviews, and designing curriculum for smart contract workshops.",
    tags: ["React", "TypeScript", "Agile", "Web3"],
    note: "Technology Lead · Northeastern Blockchain · Through Apr 2026",
  },
  {
    type: "research" as const,
    field: "Quantitative Finance · High-Frequency Trading",
    status: "Active",
    statusStyle: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/50",
    dotStyle: "bg-emerald-500 animate-pulse",
    icon: FlaskConical,
    title: "Lead-Lag Dynamics in Equity Markets",
    abstract:
      "Researching temporal relationships between financial instruments and how information propagates across correlated assets at short time horizons. Exploring whether these dynamics can be identified and acted on systematically.",
    tags: ["Quantitative Finance", "High-Frequency Data", "Python"],
    note: "Details withheld — work in progress.",
  },
];

export default function Research() {
  return (
    <section id="research" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <FadeIn className="mb-16 text-center">
          <p className="text-xs font-semibold tracking-widest text-indigo-500 uppercase mb-3">Current Work</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            What I&apos;m working on
          </h2>
          <p className="mt-4 text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
            Active research and upcoming work — where I&apos;m spending my time right now.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <FadeIn key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-2xl p-8 bg-gradient-to-br from-slate-50 to-zinc-50 dark:from-zinc-900 dark:to-slate-900/50 border border-zinc-200/60 dark:border-zinc-700/60 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-800/50 flex items-center justify-center shrink-0">
                        <Icon size={17} className="text-indigo-500" />
                      </div>
                      <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 leading-tight">
                        {item.field}
                      </p>
                    </div>
                    <span className={`shrink-0 flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold border rounded-full ${item.statusStyle}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${item.dotStyle}`} />
                      {item.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                    {item.title}
                  </h3>

                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                    {item.abstract}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-xs font-medium bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer note */}
                  <div className="flex items-center gap-2 text-xs text-zinc-400 dark:text-zinc-500 border-t border-zinc-200 dark:border-zinc-700/60 pt-4">
                    {item.type === "work" ? <Calendar size={12} className="shrink-0" /> : <Lock size={12} className="shrink-0" />}
                    <span>{item.note}</span>
                  </div>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
