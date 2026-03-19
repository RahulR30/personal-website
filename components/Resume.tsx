"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, GraduationCap, Download, Users } from "lucide-react";
import FadeIn from "./FadeIn";

const skills = [
  { name: "Python", level: 92 },
  { name: "JavaScript / TypeScript", level: 88 },
  { name: "React / Next.js", level: 85 },
  { name: "Java / C / C++", level: 80 },
  { name: "Machine Learning (PyTorch / TensorFlow)", level: 78 },
  { name: "Docker / DevOps", level: 72 },
];

const techTags = [
  "Python", "JavaScript", "TypeScript", "Java", "C", "C++",
  "React", "Node.js / Express", "PyTorch", "TensorFlow",
  "pandas", "NumPy", "Matplotlib", "SciPy",
  "Git", "Docker", "Vercel", "Render", "REST APIs",
];

const experience = [
  {
    role: "Teaching Assistant — Data Science Foundations",
    company: "Northeastern University, Khoury College",
    period: "Jan 2026 — Present",
    description:
      "Hold weekly office hours on topics like kNN and linear regression. Grade assignments and exams for 200+ students, providing detailed feedback on data science concepts and Python implementation.",
  },
  {
    role: "Software Engineering Intern",
    company: "Hypatia AI",
    period: "May 2024 — Aug 2024",
    description:
      "Engineered differential equation simulations in Python (SciPy/NumPy) to model insulin dynamics from glucose data. Integrated Python backend functions into a mobile ecosystem (iOS/Android) enabling real-time CGM data processing.",
  },
  {
    role: "Research Assistant",
    company: "Allayee Lab — USC Keck School of Medicine",
    period: "Apr 2023 — May 2024",
    description:
      "Architected a scalable pipeline to parse and normalize 30M+ rows of GWAS data. Refactored Pheweb modules to build an interactive visualization platform for large-scale genetic interaction analysis.",
  },
];

const activities = [
  {
    type: "single" as const,
    role: "Technology Lead",
    org: "Northeastern Blockchain",
    period: "Jan 2026 — Present",
    bullets: [
      "Lead a developer team maintaining the organization's web presence using React, coordinating agile sprints and QA.",
      "Design curriculum and lead student workshops on smart contract development and blockchain fundamentals.",
    ],
  },
  {
    type: "progression" as const,
    org: "Northeastern AI (MLE Dev Team)",
    roles: [
      {
        role: "Tech Lead",
        period: "Mar 2026 — Present",
        promoted: true,
        bullets: [
          "Lead development of Semantic Contract Diff (SCD) — an NLP-powered tool that uses semantic analysis to distinguish substantive legal changes from superficial text edits in contract documents.",
          "Architect end-to-end ML pipelines for industry partners, implementing model training, hyperparameter optimization, and performance evaluation.",
        ],
      },
      {
        role: "Machine Learning Engineer",
        period: "Sep 2025 — Feb 2026",
        promoted: false,
        bullets: [
          "Built end-to-end ML pipelines for industry partners using Python and PyTorch, covering model training, hyperparameter optimization, and systematic performance evaluation.",
          "Delivered scalable codebases with detailed documentation to validate system efficiency for external organizations.",
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
    detail: "3.9 GPA · Dean's List (All Semesters)",
  },
];

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between items-center text-sm">
        <span className="font-medium text-zinc-700 dark:text-zinc-300">{name}</span>
        <span className="text-zinc-400 text-xs">{level}%</span>
      </div>
      <div className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] as const }}
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
        />
      </div>
    </div>
  );
}

export default function Resume() {
  return (
    <section id="resume" className="py-28 px-6 bg-zinc-50/60 dark:bg-zinc-900/40">
      <div className="max-w-5xl mx-auto">
        <FadeIn className="mb-16 text-center">
          <p className="text-xs font-semibold tracking-widest text-indigo-500 uppercase mb-3">Resume</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Skills & Experience
          </h2>
          <p className="mt-4 text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
            A snapshot of my technical skills, work history, and education.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left column */}
          <div className="space-y-10">
            <FadeIn>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-6">Proficiency</h3>
              <div className="space-y-5">
                {skills.map((skill, i) => (
                  <SkillBar key={skill.name} {...skill} delay={i * 0.08} />
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {techTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-xs font-medium bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 rounded-lg shadow-sm hover:border-indigo-300 dark:hover:border-indigo-600 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-150 cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="flex items-center gap-2 mb-6">
                <GraduationCap size={18} className="text-indigo-500" />
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Education</h3>
              </div>
              <div className="space-y-4">
                {education.map((edu, i) => (
                  <div key={i} className="relative pl-5 border-l-2 border-zinc-200 dark:border-zinc-700">
                    <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-indigo-400" />
                    <p className="text-xs text-zinc-400 font-medium mb-1">{edu.period}</p>
                    <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{edu.degree}</h4>
                    <p className="text-sm text-indigo-500 dark:text-indigo-400 font-medium">{edu.school} · {edu.location}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">{edu.detail}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Right column */}
          <div className="space-y-10">
            <FadeIn delay={0.1}>
              <div className="flex items-center gap-2 mb-6">
                <Briefcase size={18} className="text-indigo-500" />
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Experience</h3>
              </div>
              <div className="space-y-6">
                {experience.map((job, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                    className="relative pl-5 border-l-2 border-zinc-200 dark:border-zinc-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors duration-200"
                  >
                    <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                    <p className="text-xs text-zinc-400 font-medium mb-1">{job.period}</p>
                    <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{job.role}</h4>
                    <p className="text-sm text-indigo-500 dark:text-indigo-400 font-medium mb-2">{job.company}</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{job.description}</p>
                  </motion.div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="flex items-center gap-2 mb-6">
                <Users size={18} className="text-indigo-500" />
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Activities</h3>
              </div>
              <div className="space-y-6">
                {activities.map((act, i) => {
                  if (act.type === "single") {
                    return (
                      <motion.div
                        key={i}
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                        className="relative pl-5 border-l-2 border-zinc-200 dark:border-zinc-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors duration-200"
                      >
                        <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                        <p className="text-xs text-zinc-400 font-medium mb-1">{act.period}</p>
                        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{act.role}</h4>
                        <p className="text-sm text-indigo-500 dark:text-indigo-400 font-medium mb-2">{act.org}</p>
                        <ul className="space-y-1.5">
                          {act.bullets.map((b, j) => (
                            <li key={j} className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed flex gap-2">
                              <span className="text-indigo-400 mt-1 shrink-0">–</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    );
                  }

                  // Progression entry — multiple roles under one org
                  return (
                    <div key={i} className="relative pl-5 border-l-2 border-zinc-200 dark:border-zinc-700">
                      {/* Org header */}
                      <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-indigo-400" />
                      <p className="text-sm text-indigo-500 dark:text-indigo-400 font-semibold mb-4">{act.org}</p>

                      <div className="space-y-5">
                        {act.roles.map((r, j) => (
                          <motion.div
                            key={j}
                            whileHover={{ x: 4 }}
                            transition={{ duration: 0.2 }}
                            className="rounded-xl p-4 bg-white/60 dark:bg-zinc-800/40 border border-zinc-200/70 dark:border-zinc-700/60"
                          >
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{r.role}</h4>
                            </div>
                            <p className="text-xs text-zinc-400 font-medium mb-3">{r.period}</p>
                            <ul className="space-y-1.5">
                              {r.bullets.map((b, k) => (
                                <li key={k} className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed flex gap-2">
                                  <span className="text-indigo-400 mt-1 shrink-0">–</span>
                                  <span>{b}</span>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        ))}
                      </div>
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
