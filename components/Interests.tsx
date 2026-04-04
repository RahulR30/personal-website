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
    emoji: "🍳",
    title: "Cooking & Family",
    color: "from-rose-50 to-red-50 dark:from-rose-950/30 dark:to-red-950/30",
    border: "border-rose-200/60 dark:border-rose-800/40",
    tag: "Home cooking · Quality time",
    description:
      "Cooking is one of my favorite ways to unwind — there's something satisfying about starting with raw ingredients and ending with something that brings people together. Some of my best memories are around the dinner table with family, and I try to recreate that feeling as often as I can.",
  },
  {
    emoji: "🌿",
    title: "The Outdoors",
    color: "from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30",
    border: "border-emerald-200/60 dark:border-emerald-800/40",
    tag: "Hiking · Travel · Fresh air",
    description:
      "Getting outside is how I reset. Whether it's a hike, a walk, or just being somewhere new, time outdoors keeps me grounded. I love to travel and explore — there's always something interesting about the way different places look and feel.",
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
            The things I care about when I step away from the screen.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
