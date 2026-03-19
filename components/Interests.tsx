"use client";

import { motion } from "framer-motion";
import FadeIn from "./FadeIn";

const interests = [
  {
    emoji: "🏀",
    title: "Basketball",
    color: "from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30",
    border: "border-orange-200/60 dark:border-orange-800/40",
    tag: "AAU · Varsity · D3 recruited",
    description:
      "Basketball has been a huge part of my life. I played varsity in high school and competed in AAU for San Diego Sol, where I was recruited by multiple Division III programs. The discipline, teamwork, and resilience that basketball demands are things I try to bring into everything I do.",
  },
  {
    emoji: "📈",
    title: "Financial Technology",
    color: "from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30",
    border: "border-emerald-200/60 dark:border-emerald-800/40",
    tag: "Quant aspirations · FinTech",
    description:
      "I'm deeply fascinated by the intersection of software and financial markets. My long-term aspiration is to become a quantitative researcher — applying mathematical modeling, statistics, and machine learning to understand and navigate complex market dynamics. I love the idea that code can be used to find signal in noise at massive scale.",
  },
  {
    emoji: "🤖",
    title: "Machine Learning for Global Impact",
    color: "from-indigo-50 to-violet-50 dark:from-indigo-950/30 dark:to-violet-950/30",
    border: "border-indigo-200/60 dark:border-indigo-800/40",
    tag: "AI · Systems Biology · Climate",
    description:
      "Beyond the technical craft, I'm drawn to machine learning as a lever for tackling some of the world's most pressing challenges — from precision medicine and genomics to climate systems and resource allocation. My work in ML pipelines and past research in bioinformatics has deepened my belief that the best algorithms are the ones that matter to people.",
  },
];

export default function Interests() {
  return (
    <section id="interests" className="py-28 px-6 bg-zinc-50/60 dark:bg-zinc-900/40">
      <div className="max-w-5xl mx-auto">
        <FadeIn className="mb-16 text-center">
          <p className="text-xs font-semibold tracking-widest text-indigo-500 uppercase mb-3">Interests</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Beyond the code
          </h2>
          <p className="mt-4 text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
            The things I care about outside of work — and sometimes, the things that inspire it.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {interests.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={`rounded-2xl p-6 bg-gradient-to-br ${item.color} border ${item.border} shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col`}
              >
                <div className="text-3xl mb-4">{item.emoji}</div>
                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                  {item.title}
                </h3>
                <span className="inline-block mb-4 text-xs font-medium text-zinc-500 dark:text-zinc-400 bg-white/60 dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-zinc-700/70 px-2.5 py-1 rounded-full">
                  {item.tag}
                </span>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed flex-1">
                  {item.description}
                </p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
