"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Download, Users, Code2, BookOpen } from "lucide-react";
import FadeIn from "./FadeIn";

// Grouped by what the tool is for, with a line of evidence for each group.
// Deliberately no self-assigned ratings — the experience section is the evidence.
const skillGroups = [
  {
    label: "Languages",
    items: ["C++", "Python", "C", "C#", "Java", "JavaScript", "TypeScript"],
    context: "C# in production at Wayfair; C++ and Python across coursework and research.",
  },
  {
    label: "Quantitative & ML",
    items: ["PyTorch", "TensorFlow", "pandas", "NumPy", "SciPy", "Matplotlib", "Transformers", "LangChain"],
    context: "Time-series modeling on 1-second market bars; RAG pipelines; numerical simulation.",
  },
  {
    label: "Data & Infrastructure",
    items: ["BigQuery", "Apache Kafka", "Docker", "Git", "Node / Express", "React", "Google Colab"],
    context: "Streaming and warehouse pipelines handling 5M+ events per day.",
  },
];

// Mathematics first — it is the coursework quant recruiters scan for.
const coursework = [
  {
    label: "Mathematics & Theory",
    courses: [
      "Matrix Methods for Machine Learning",
      "Linear Algebra",
      "Multivariable Calculus",
      "Discrete Structures",
      "Principles of Mathematics",
      "Theory of Computation",
    ],
  },
  {
    label: "Computer Science",
    courses: [
      "Algorithms & Data Structures",
      "Artificial Intelligence",
      "Programming in C++",
      "Object-Oriented Design",
      "Computer Systems",
    ],
  },
];

const experience = [
  {
    role: "Software Engineer Co-op — Order Experience Financials & Integration",
    company: "Wayfair",
    period: "Jul 2026 — Dec 2026",
    current: true,
    bullets: [
      "Replaced legacy Kafka pipelines with direct BigQuery writes in C#, reducing ingestion-to-query latency across 5M+ daily order events.",
      "Built OX UI features to query outstanding balance data, letting 10+ teams self-serve and removing recurring engineering requests.",
      "Built reusable tax-calculation infrastructure supporting multi-entity fee logic across backend services, launched with North Carolina's White Goods Disposal Fee and designed to onboard future state fees without added backend work.",
    ],
  },
  {
    role: "ML Research Assistant — Market Data Modeling",
    company: "Northeastern University, Algorithms & Theory Research Group",
    period: "Jan 2026 — Present",
    current: true,
    bullets: [
      "Engineered a PyTorch temporal nowcasting model (shared GRU + cross-sectional attention) on 3 months of 1-second bar NIFTY data.",
      "Used spot-futures lead-lag structure to correct for stale prices, reaching a walk-forward R² of 0.28 vs. 0.21 for a Ridge baseline.",
      "Constructed a cross-validation training framework to verify model scalability across noisy high-frequency environments.",
    ],
  },
  {
    role: "Teaching Assistant — Discrete Structures",
    company: "Northeastern University, Khoury College",
    period: "May 2026 — Jul 2026",
    current: false,
    bullets: [
      "Held office hours covering logic, proof techniques, combinatorics, graph theory, and asymptotic analysis.",
      "Graded assignments and exams, providing individualized support on foundational discrete mathematics.",
    ],
  },
  {
    role: "Teaching Assistant — Data Science Foundations",
    company: "Northeastern University, Khoury College",
    period: "Jan 2026 — May 2026",
    current: false,
    bullets: [
      "Ran weekly office hours covering core ML concepts (kNN, linear regression) for 200+ sophomores and juniors.",
      "Graded weekly assignments and exams for 200+ students with detailed Python-focused feedback.",
    ],
  },
  {
    role: "Software Engineering Intern",
    company: "Hypatia AI",
    period: "May 2024 — Aug 2024",
    current: false,
    bullets: [
      "Built differential-equation simulations in Python (SciPy/NumPy) to model insulin dynamics from glucose data.",
      "Integrated Python backend functions into iOS/Android apps to process CGM data in real time.",
    ],
  },
  {
    role: "Research Assistant",
    company: "Allayee Lab — USC Keck School of Medicine",
    period: "Apr 2023 — May 2024",
    current: false,
    bullets: [
      "Built a pipeline to parse and normalize 30M+ rows of high-dimensional Genome-Wide Association Studies data for statistical analysis.",
      "Refactored Pheweb modules into an interactive visualization tool for USC researchers to explore large-scale genetic associations.",
    ],
  },
];

const activities = [
  {
    type: "single" as const,
    role: "Director of Technology",
    org: "Northeastern Blockchain",
    period: "Jan 2026 — Present",
    bullets: [
      "Lead a React frontend rebuild and architecture update of the club's web platform with a team of 5 engineers.",
      "Designed curriculum and lead workshops for 40+ underclassmen on smart-contract development and blockchain fundamentals.",
    ],
  },
  {
    type: "progression" as const,
    org: "Northeastern AI (AINU)",
    roles: [
      {
        role: "Director of Technology",
        period: "Apr 2026 — Present",
        bullets: [
          "Created a technical ML track connecting a cohort of students with professors for hands-on academic research.",
          "Lead all technical teams across Northeastern AI, overseeing project direction and delivery, and host hands-on mathematics and ML workshops.",
        ],
      },
      {
        role: "Tech Lead",
        period: "Mar 2026 — Apr 2026",
        bullets: [
          "Led development of Semantic Contract Diff — an NLP tool distinguishing substantive legal changes from superficial text edits.",
        ],
      },
      {
        role: "Machine Learning Engineer",
        period: "Sep 2025 — Feb 2026",
        bullets: [
          "Built end-to-end ML pipelines for industry partners in Python and PyTorch, covering training, hyperparameter optimization, and systematic performance evaluation.",
        ],
      },
    ],
  },
];

const education = [
  {
    degree: "B.S. Computer Science",
    school: "Northeastern University",
    location: "Boston, MA",
    period: "Expected Dec 2027",
    detail: "3.9 / 4.0 GPA · Dean's List (All Semesters)",
  },
];

// Shared subsection header used by all subsections
function SubsectionHeader({ icon: Icon, title }: { icon: React.ElementType; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-6">
      <Icon size={18} className="text-indigo-500" />
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{title}</h3>
    </div>
  );
}

// Shared bullet list used by experience entries and activity roles
function BulletList({ bullets }: { bullets: string[] }) {
  return (
    <ul className="space-y-1.5">
      {bullets.map((b, i) => (
        <li key={i} className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed flex gap-2">
          <span className="text-indigo-400 mt-1 shrink-0">–</span>
          <span>{b}</span>
        </li>
      ))}
    </ul>
  );
}

// Shared timeline entry wrapper — consistent hover, dot, and border across all sections
function TimelineEntry({ current, children }: { current?: boolean; children: React.ReactNode }) {
  return (
    <motion.div
      whileHover={{ x: 4 }}
      transition={{ duration: 0.2 }}
      className="relative pl-5 border-l-2 border-zinc-200 dark:border-zinc-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors duration-200"
    >
      <div
        className={`absolute -left-[5px] top-1.5 w-2 h-2 rounded-full ${
          current ? "bg-emerald-500" : "bg-indigo-400"
        }`}
      />
      {children}
    </motion.div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-2.5 py-1 text-xs font-medium bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 rounded-lg shadow-sm hover:border-indigo-300 dark:hover:border-indigo-600 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-150 cursor-default">
      {children}
    </span>
  );
}

export default function Resume() {
  return (
    <section id="resume" className="py-28 px-6 bg-zinc-50/60 dark:bg-zinc-900/40">
      <div className="max-w-5xl mx-auto">
        <FadeIn className="mb-16 text-center">
          <p className="text-xs font-semibold tracking-widest text-indigo-500 uppercase mb-3">Resume</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Experience &amp; background
          </h2>
          <p className="mt-4 text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
            Research, production engineering, and the coursework behind them.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-10">
            <FadeIn>
              <SubsectionHeader icon={Code2} title="Technical Skills" />
              <div className="space-y-6">
                {skillGroups.map((group) => (
                  <div key={group.label}>
                    <p className="text-xs font-semibold tracking-widest text-zinc-500 dark:text-zinc-400 uppercase mb-2.5">
                      {group.label}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-2.5">
                      {group.items.map((tag) => (
                        <Pill key={tag}>{tag}</Pill>
                      ))}
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-500 leading-relaxed">
                      {group.context}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <SubsectionHeader icon={BookOpen} title="Coursework" />
              <div className="space-y-5">
                {coursework.map((group) => (
                  <div key={group.label}>
                    <p className="text-xs font-semibold tracking-widest text-zinc-500 dark:text-zinc-400 uppercase mb-2.5">
                      {group.label}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {group.courses.map((course) => (
                        <Pill key={course}>{course}</Pill>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <SubsectionHeader icon={GraduationCap} title="Education" />
              <div className="space-y-4">
                {education.map((edu, i) => (
                  <TimelineEntry key={i}>
                    <p className="text-xs text-zinc-400 font-medium mb-1">{edu.period}</p>
                    <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{edu.degree}</h4>
                    <p className="text-sm text-indigo-500 dark:text-indigo-400 font-medium">{edu.school} · {edu.location}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">{edu.detail}</p>
                  </TimelineEntry>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Right column */}
          <div className="lg:col-span-3 space-y-10">
            <FadeIn delay={0.1}>
              <SubsectionHeader icon={Briefcase} title="Experience" />
              <div className="space-y-6">
                {experience.map((job, i) => (
                  <TimelineEntry key={i} current={job.current}>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-xs text-zinc-400 font-medium">{job.period}</p>
                      {job.current && (
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                          Current
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{job.role}</h4>
                    <p className="text-sm text-indigo-500 dark:text-indigo-400 font-medium mb-2">{job.company}</p>
                    <BulletList bullets={job.bullets} />
                  </TimelineEntry>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <SubsectionHeader icon={Users} title="Activities" />
              <div className="space-y-6">
                {activities.map((act, i) => {
                  if (act.type === "single") {
                    return (
                      <TimelineEntry key={i} current>
                        <p className="text-xs text-zinc-400 font-medium mb-1">{act.period}</p>
                        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{act.role}</h4>
                        <p className="text-sm text-indigo-500 dark:text-indigo-400 font-medium mb-2">{act.org}</p>
                        <BulletList bullets={act.bullets} />
                      </TimelineEntry>
                    );
                  }

                  // Progression entry — each role rendered as a flat TimelineEntry
                  return (
                    <div key={i} className="space-y-6">
                      {act.roles.map((r, j) => (
                        <TimelineEntry key={j} current={j === 0}>
                          <p className="text-xs text-zinc-400 font-medium mb-1">{r.period}</p>
                          <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{r.role}</h4>
                          <p className="text-sm text-indigo-500 dark:text-indigo-400 font-medium mb-2">{act.org}</p>
                          <BulletList bullets={r.bullets} />
                        </TimelineEntry>
                      ))}
                    </div>
                  );
                })}
              </div>
            </FadeIn>

            <FadeIn delay={0.25}>
              <a
                href="/resume.pdf"
                download="RaoRahul_Resume.pdf"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-zinc-900 dark:bg-indigo-600 rounded-xl hover:bg-zinc-700 dark:hover:bg-indigo-500 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <Download size={15} />
                Download resume (PDF)
              </a>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
