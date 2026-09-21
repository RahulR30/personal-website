"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import {
  Download,
  Mail,
  Github,
  Linkedin,
  ArrowRight,
  Check,
  Sparkles,
  LayoutList,
} from "lucide-react";
import RecruiterSearch from "./RecruiterSearch";
import { routes } from "@/lib/routes";

export type Role = "quant" | "swe";

// Facts that hold regardless of which role is being pitched. These are the
// fields recruiters screen on first, so they sit above the pitch.
const facts = [
  { label: "Available", value: "Summer 2027" },
  { label: "Graduating", value: "Dec 2027" },
  { label: "GPA", value: "3.9 / 4.0" },
  { label: "Based in", value: "Boston, MA" },
];

type Pitch = {
  tab: string;
  headline: string;
  thesis: string;
  points: {
    metric: string;
    metricLabel: string;
    claim: string;
    evidence: string;
  }[];
  stack: string[];
};

const pitches: Record<Role, Pitch> = {
  quant: {
    tab: "Quant Research & Trading",
    headline: "Research with a real baseline, and the engineering to run it.",
    thesis:
      "I spend my time on two things: modeling high-frequency market data in Northeastern's Algorithms & Theory group, and building production data infrastructure at Wayfair. Most students have one or the other. The combination is what makes me useful on a desk — I can find the signal and then make it run.",
    points: [
      {
        metric: "0.28",
        metricLabel: "walk-forward R²",
        claim: "I benchmark honestly against a linear baseline.",
        evidence:
          "Built a PyTorch temporal nowcasting model — a GRU encoder shared across instruments plus cross-sectional attention — on three months of 1-second NIFTY spot and futures bars. It reaches a walk-forward R² of 0.28 against 0.21 for a Ridge baseline. Validated out-of-sample throughout, with no in-sample tuning on the evaluation windows. I can tell you where it breaks as easily as where it works.",
      },
      {
        metric: "1s",
        metricLabel: "bar resolution",
        claim: "The edge came from microstructure, not a bigger network.",
        evidence:
          "The lift over the baseline came from exploiting spot-futures lead-lag structure to correct for stale prices — recovering information that a contemporaneous fit on the spot leg alone discards. I reach for the market structure before I reach for more parameters.",
      },
      {
        metric: "5M+",
        metricLabel: "events per day",
        claim: "I can build the systems, not just the notebook.",
        evidence:
          "At Wayfair I replaced legacy Kafka pipelines with direct BigQuery writes in C#, cutting ingestion-to-query latency across 5M+ daily order events. Research that can't run at speed against real data doesn't make money.",
      },
      {
        metric: "200+",
        metricLabel: "students taught",
        claim: "The math is coursework, not self-study.",
        evidence:
          "Matrix Methods for Machine Learning, Linear Algebra, Multivariable Calculus, Principles of Mathematics (proof-based), Theory of Computation, Discrete Structures — 3.9 GPA, Dean's List every semester. I've also TA'd Data Science Foundations and Discrete Structures for 200+ students, which is a decent proxy for whether I can explain my own work.",
      },
    ],
    stack: ["Python", "C++", "PyTorch", "pandas", "NumPy", "SciPy", "Time Series", "Walk-Forward CV", "Market Microstructure"],
  },
  swe: {
    tab: "Software Engineering",
    headline: "Already shipping in production, at meaningful scale.",
    thesis:
      "I'm a software engineer at Wayfair working on order financials infrastructure, and an ML research assistant at Northeastern modeling high-frequency market data. I've shipped code that handles millions of events a day, and I build things intended to be extended by the next person rather than rewritten.",
    points: [
      {
        metric: "5M+",
        metricLabel: "events per day",
        claim: "I've replaced real infrastructure, not just added to it.",
        evidence:
          "On Wayfair's Order Experience Financials & Integration team I replaced legacy Kafka pipelines with direct BigQuery writes in C#, reducing ingestion-to-query latency across 5M+ daily order events. Working in an existing production system with real constraints, not a greenfield side project.",
      },
      {
        metric: "10+",
        metricLabel: "teams unblocked",
        claim: "I design for the change that comes after mine.",
        evidence:
          "Built reusable tax-calculation infrastructure supporting multi-entity fee logic across backend services — launched with North Carolina's White Goods Disposal Fee and deliberately designed so future state fees onboard with no additional backend work. Separately shipped OX UI features letting 10+ teams self-serve balance data, removing a recurring stream of engineering requests.",
      },
      {
        metric: "85%",
        metricLabel: "latency reduction",
        claim: "I go deep outside of work, too.",
        evidence:
          "Built a Retrieval-Augmented Generation pipeline over dense legal corpora, where tuning the embedding and retrieval indexing cut query latency by 85% on large document sets. Won 1st place at Optimum Hacknet building a decentralized file-transfer system using random linear network coding. Published graph-theory research on network flow optimization.",
      },
      {
        metric: "3.9",
        metricLabel: "GPA / 4.0",
        claim: "Strong fundamentals, and I can explain them.",
        evidence:
          "C++, Python, C, C#, Java, and TypeScript across coursework and production. Algorithms & Data Structures, Object-Oriented Design, Computer Systems, Theory of Computation. Dean's List every semester, and TA for 200+ students in Data Science Foundations and Discrete Structures.",
      },
    ],
    stack: ["C#", "Python", "C++", "TypeScript", "React", "BigQuery", "Apache Kafka", "Docker", "Node / Express", "Git"],
  },
};

export default function RecruiterView() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const initial: Role = searchParams.get("role") === "swe" ? "swe" : "quant";
  const [role, setRole] = useState<Role>(initial);

  const pitch = pitches[role];

  const selectRole = (next: Role) => {
    setRole(next);
    // Keep the URL shareable so a link can be pinned to a specific pitch.
    // Must stay on the current path — hardcoding /recruiter would throw away
    // the /r/<tag> tracking link the visitor arrived on.
    router.replace(`${pathname}?role=${next}`, { scroll: false });
  };

  return (
    <div className="min-h-screen px-6 py-14 sm:py-20">
      <div className="max-w-3xl mx-auto">
        {/* Cross-links: every view is reachable from every other */}
        <nav className="mb-8 flex flex-wrap items-center gap-2">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60 rounded-lg hover:border-indigo-400 dark:hover:border-indigo-600 transition-colors"
          >
            <Sparkles size={13} />
            Explore interactively
          </Link>
          <Link
            href={routes.classic}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 rounded-lg hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors"
          >
            <LayoutList size={13} />
            Full site
          </Link>
        </nav>

        {/* Identity */}
        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Rahul Rao
          </h1>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400">
            B.S. Computer Science, Northeastern University · Khoury College
          </p>
        </header>

        {/* Screening facts */}
        <dl className="mb-12 grid grid-cols-2 sm:grid-cols-4 gap-px bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
          {facts.map((f) => (
            <div key={f.label} className="bg-white dark:bg-zinc-900 px-4 py-3.5">
              <dt className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                {f.label}
              </dt>
              <dd className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {f.value}
              </dd>
            </div>
          ))}
        </dl>

        <RecruiterSearch />

        {/* Role switch */}
        <div className="mb-10">
          <div className="mb-6 h-px bg-zinc-200 dark:bg-zinc-800" />
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">
            I&apos;m interviewing for
          </p>
          <div
            role="tablist"
            aria-label="Select role"
            className="inline-flex p-1 gap-1 bg-zinc-100 dark:bg-zinc-800/80 rounded-xl"
          >
            {(Object.keys(pitches) as Role[]).map((key) => (
              <button
                key={key}
                role="tab"
                aria-selected={role === key}
                onClick={() => selectRole(key)}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-150 ${
                  role === key
                    ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-sm"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                }`}
              >
                {pitches[key].tab}
              </button>
            ))}
          </div>
        </div>

        {/* The pitch */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight leading-snug text-zinc-900 dark:text-zinc-100 mb-4">
            {pitch.headline}
          </h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {pitch.thesis}
          </p>
        </section>

        {/* Proof points */}
        <section className="mb-12 space-y-px bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden">
          {pitch.points.map((p) => (
            <div
              key={p.claim}
              className="bg-white dark:bg-zinc-900 p-6 sm:p-7 flex flex-col sm:flex-row gap-5"
            >
              <div className="sm:w-28 shrink-0">
                <div className="font-mono text-2xl font-semibold tracking-tight text-indigo-600 dark:text-indigo-400 tabular-nums">
                  {p.metric}
                </div>
                <div className="text-[11px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mt-0.5 leading-tight">
                  {p.metricLabel}
                </div>
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1.5 flex items-start gap-2">
                  <Check size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                  {p.claim}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {p.evidence}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* Stack */}
        <section className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">
            Most relevant stack
          </p>
          <div className="flex flex-wrap gap-2">
            {pitch.stack.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 text-xs font-medium bg-zinc-50 dark:bg-zinc-800/70 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 rounded-lg"
              >
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* Actions */}
        <section className="flex flex-wrap items-center gap-3 mb-10">
          <a
            href="/resume.pdf"
            download="RaoRahul_Resume.pdf"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-zinc-900 dark:bg-indigo-600 rounded-xl hover:bg-zinc-700 dark:hover:bg-indigo-500 transition-colors duration-150 shadow-sm"
          >
            <Download size={15} />
            Resume (PDF)
          </a>
          <a
            href="mailto:rao.rahul1@northeastern.edu"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors duration-150 shadow-sm"
          >
            <Mail size={15} />
            rao.rahul1@northeastern.edu
          </a>
          <a
            href="https://www.linkedin.com/in/rahul-rao-755b46236/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="p-2.5 rounded-xl text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-150"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="https://github.com/RahulR30"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="p-2.5 rounded-xl text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-150"
          >
            <Github size={18} />
          </a>
        </section>

        <footer className="pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <Link
            href={routes.classic}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            See the full site — projects, research detail, and background
            <ArrowRight size={14} />
          </Link>
        </footer>
      </div>
    </div>
  );
}
