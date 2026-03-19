"use client";

import { motion } from "framer-motion";
import { FlaskConical, Lock } from "lucide-react";
import FadeIn from "./FadeIn";

const projects = [
  {
    field: "Quantitative Finance · Machine Learning",
    status: "Active",
    title: "Temporal Dynamics in Financial Time Series",
    abstract:
      "Investigating predictive relationships between financial instruments across time using machine learning methods. This work focuses on identifying and modeling asymmetric information propagation in market data, with the goal of building a principled framework for understanding how signals evolve and interact over time.",
    methods: ["Time Series Analysis", "ML Modeling", "Statistical Inference", "Python"],
    note: "Details withheld — work in progress.",
  },
];

export default function Research() {
  return (
    <section id="research" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <FadeIn className="mb-16 text-center">
          <p className="text-xs font-semibold tracking-widest text-indigo-500 uppercase mb-3">Research</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Current work
          </h2>
          <p className="mt-4 text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
            Active research at the intersection of machine learning and quantitative methods.
            Details are intentionally limited while work is in progress.
          </p>
        </FadeIn>

        <div className="max-w-2xl mx-auto">
          {projects.map((proj, i) => (
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
                      <FlaskConical size={17} className="text-indigo-500" />
                    </div>
                    <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 leading-tight">
                      {proj.field}
                    </p>
                  </div>
                  <span className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {proj.status}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                  {proj.title}
                </h3>

                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                  {proj.abstract}
                </p>

                {/* Methods */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {proj.methods.map((m) => (
                    <span
                      key={m}
                      className="px-2.5 py-1 text-xs font-medium bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 rounded-lg"
                    >
                      {m}
                    </span>
                  ))}
                </div>

                {/* Confidentiality note */}
                <div className="flex items-center gap-2 text-xs text-zinc-400 dark:text-zinc-500 border-t border-zinc-200 dark:border-zinc-700/60 pt-4">
                  <Lock size={12} className="shrink-0" />
                  <span>{proj.note}</span>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
