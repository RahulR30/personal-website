"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Linkedin, Mail, ArrowDown, FileText, Briefcase } from "lucide-react";

const socials = [
  { icon: Github, href: "https://github.com/RahulR30", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/rahul-rao-755b46236/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:rao.rahul1@northeastern.edu", label: "Email" },
];

// Headline credentials — the first thing a recruiter should be able to scan.
const stats = [
  { value: "3.9", unit: "/4.0", label: "GPA · Dean's List, all semesters" },
  { value: "0.28", unit: " R²", label: "Walk-forward, vs 0.21 Ridge baseline" },
  { value: "5M+", unit: "/day", label: "Order events in production at Wayfair" },
  { value: "Dec", unit: " 2027", label: "Graduation · B.S. Computer Science" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Hero() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-28 overflow-hidden"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.08, 1], rotate: [0, 6, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, -8, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)" }}
        />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-3xl w-full mx-auto text-center"
      >
        <motion.div variants={item} className="mb-8 flex flex-col items-center gap-2">
          <span className="px-4 py-1.5 text-xs font-semibold tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-800/50 rounded-full uppercase">
            Summer 2027 · Quant Research · Trading · Software Engineering
          </span>
          <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500 tracking-wider">
            Northeastern University · Boston, MA
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6 text-zinc-900 dark:text-zinc-100"
        >
          Hi, I&apos;m{" "}
          <span className="gradient-text">Rahul Rao</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="text-lg sm:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-10"
        >
          I do two things right now: model high-frequency market data as an ML
          research assistant in Northeastern&apos;s Algorithms &amp; Theory group,
          and build production data infrastructure as a software engineer at
          Wayfair. Both come down to getting signal out of messy data at scale.
        </motion.p>

        <motion.div
          variants={item}
          className="flex flex-wrap items-center justify-center gap-3 mb-8"
        >
          <Link
            href="/recruiter"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-500 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Briefcase size={15} />
            Recruiter view
          </Link>
          <a
            href="#research"
            onClick={(e) => { e.preventDefault(); document.querySelector("#research")?.scrollIntoView({ behavior: "smooth" }); }}
            className="px-6 py-3 text-sm font-semibold text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 rounded-xl hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Read the research
          </a>
          <a
            href="/resume.pdf"
            download="RaoRahul_Resume.pdf"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl hover:border-zinc-400 dark:hover:border-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <FileText size={15} />
            Resume (PDF)
          </a>
        </motion.div>

        <motion.p
          variants={item}
          className="text-xs text-zinc-400 dark:text-zinc-500 mb-14"
        >
          Hiring? <Link href="/recruiter" className="text-indigo-500 dark:text-indigo-400 font-medium hover:underline">Recruiter view</Link> has a one-page summary — describe the role in plain English and it shows the relevant work.
        </motion.p>

        {/* Credential strip */}
        <motion.dl
          variants={item}
          className="grid grid-cols-2 md:grid-cols-4 gap-px mb-14 bg-zinc-200/70 dark:bg-zinc-800 border border-zinc-200/70 dark:border-zinc-800 rounded-2xl overflow-hidden"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white dark:bg-zinc-900/80 px-4 py-5 text-center"
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 font-mono">
                  {stat.value}
                  <span className="text-base text-zinc-400 dark:text-zinc-500">{stat.unit}</span>
                </span>
                <span className="mt-1.5 block text-[11px] leading-snug text-zinc-500 dark:text-zinc-400">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </motion.dl>

        <motion.div variants={item} className="flex items-center justify-center gap-4">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="p-2.5 rounded-xl text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-150"
            >
              <Icon size={20} />
            </a>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-zinc-400 dark:text-zinc-600"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
