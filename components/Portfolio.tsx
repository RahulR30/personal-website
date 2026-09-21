"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import FadeIn from "./FadeIn";

const projects = [
  {
    title: "Legal Document Intelligence Pipeline",
    badge: "85% latency cut",
    description:
      "Retrieval-Augmented Generation system over complex legal corpora, combining semantic vector search with chunking strategies tuned to document structure to extract structured domain insights. Tuning the embedding and retrieval indexing improved answer relevance and cut query latency by 85% on large document sets.",
    tags: ["Python", "PyTorch", "Transformers", "LangChain", "Vector DBs"],
    github: "",
    live: "",
    light: "from-sky-50 to-cyan-50",
    dark: "dark:from-sky-950/30 dark:to-cyan-950/30",
    accent: "bg-sky-500",
  },
  {
    title: "Evolutionary Network Flow Optimization",
    badge: "📄 Published",
    description:
      "Novel graph-theoretic algorithm to maximize airline network flow under topological constraints, quantifying the impact of adding or removing nodes on overall network throughput. Published in the Curieux Academic Journal and awarded 1st place at the Greater San Diego Science and Engineering Fair.",
    tags: ["Python", "Graph Theory", "Optimization", "Research"],
    github: "",
    live: "",
    light: "from-emerald-50 to-teal-50",
    dark: "dark:from-emerald-950/30 dark:to-teal-950/30",
    accent: "bg-emerald-500",
  },
  {
    title: "Optimum Hacknet",
    badge: "🏆 1st Place",
    description:
      "Decentralized file-transfer system built on Optimum's mump2p infrastructure using random linear network coding for reliable transmission over lossy links. Integrated Go components behind a service proxy and worked with Optimum's engineering team to resolve network-latency issues.",
    tags: ["Go", "RLNC", "gRPC", "P2P Networks"],
    github: "",
    live: "",
    light: "from-amber-50 to-orange-50",
    dark: "dark:from-amber-950/30 dark:to-orange-950/30",
    accent: "bg-amber-500",
  },
  {
    title: "Semantic Contract Diff",
    badge: null,
    description:
      "NLP tool that uses semantic analysis to distinguish substantive legal changes from superficial text edits in contract documents — surfacing what actually changed in meaning, not just in wording. Built as Tech Lead on the Northeastern AI dev team.",
    tags: ["NLP", "Semantic Analysis", "Python", "Streamlit"],
    github: "",
    live: "https://semanticcontractdiff.streamlit.app/",
    light: "from-indigo-50 to-violet-50",
    dark: "dark:from-indigo-950/30 dark:to-violet-950/30",
    accent: "bg-indigo-500",
  },
  {
    title: "Adaptive Facial Expression Recognition",
    badge: "73.7% test acc.",
    description:
      "Game-based learning tool helping neurodivergent children recognize facial expressions from real human faces. Trained a CNN in PyTorch on FER2013Plus and benchmarked it against Vision Transformers, then optimized the input pipeline to eliminate dead time between epochs.",
    tags: ["PyTorch", "CNN", "Vision Transformers", "Computer Vision"],
    github: "",
    live: "",
    light: "from-rose-50 to-pink-50",
    dark: "dark:from-rose-950/30 dark:to-pink-950/30",
    accent: "bg-rose-500",
  },
  {
    title: "AlgoTutorAI",
    badge: null,
    description:
      "Context-aware tutoring engine built on the Ollama API that gives logic-based critiques of student algorithm solutions rather than handing over answers. Backed by a REST API with automated data seeding, containerized with Docker for environment parity.",
    tags: ["Docker", "Ollama API", "REST API", "Python"],
    github: "https://github.com/RahulR30/AlgoTutorAI",
    live: "",
    light: "from-violet-50 to-purple-50",
    dark: "dark:from-violet-950/30 dark:to-purple-950/30",
    accent: "bg-violet-500",
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <FadeIn className="mb-16 text-center">
          <p className="text-xs font-semibold tracking-widest text-indigo-500 uppercase mb-3">Projects</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Things I&apos;ve built
          </h2>
          <p className="mt-4 text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto">
            Published research, a hackathon win, and systems work — mostly
            problems where the modeling and the engineering were both the hard part.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <FadeIn key={project.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={`relative group rounded-2xl p-6 bg-gradient-to-br ${project.light} ${project.dark} border border-zinc-200/60 dark:border-zinc-700/60 shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col`}
              >
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-2 h-2 rounded-full ${project.accent} mt-1.5`} />
                  {project.badge && (
                    <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-300 bg-white/80 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 px-2.5 py-1 rounded-full">
                      {project.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">{project.title}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-5 flex-1">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs font-medium bg-white/70 dark:bg-zinc-800/70 border border-zinc-200/80 dark:border-zinc-700/80 text-zinc-600 dark:text-zinc-400 rounded-lg"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                    >
                      <Github size={14} />
                      Code
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                    >
                      <ExternalLink size={14} />
                      Live demo
                    </a>
                  )}
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-12 text-center" delay={0.2}>
          <a
            href="https://github.com/RahulR30"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 border border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500 px-5 py-2.5 rounded-xl bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all duration-200 shadow-sm"
          >
            <Github size={16} />
            See more on GitHub
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
