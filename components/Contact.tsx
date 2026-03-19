"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Github, Linkedin, CheckCircle } from "lucide-react";
import FadeIn from "./FadeIn";

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/RahulR30", handle: "github.com/RahulR30" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/rahul-rao-755b46236/", handle: "linkedin.com/in/rahul-rao" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <FadeIn className="mb-16 text-center">
          <p className="text-xs font-semibold tracking-widest text-indigo-500 uppercase mb-3">Contact</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Let&apos;s work together
          </h2>
          <p className="mt-4 text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
            Have a project in mind, want to collaborate, or just want to say hi? My inbox is always open.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <FadeIn className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center gap-4 py-20 text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center">
                    <CheckCircle size={28} className="text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Message sent!</h3>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-xs">
                    Thanks for reaching out — I&apos;ll get back to you within a day or two.
                  </p>
                  <button onClick={() => setSent(false)} className="mt-2 text-sm text-indigo-500 hover:underline">
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Name</label>
                      <input
                        id="name" name="name" type="text" required
                        value={form.name} onChange={handleChange} placeholder="Your name"
                        className="w-full px-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-700 focus:border-indigo-400 transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Email</label>
                      <input
                        id="email" name="email" type="email" required
                        value={form.email} onChange={handleChange} placeholder="your@email.com"
                        className="w-full px-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-700 focus:border-indigo-400 transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Message</label>
                    <textarea
                      id="message" name="message" rows={6} required
                      value={form.message} onChange={handleChange}
                      placeholder="Tell me about your project, opportunity, or just say hi..."
                      className="w-full px-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-700 focus:border-indigo-400 transition-all resize-none"
                    />
                  </div>
                  <motion.button
                    type="submit" disabled={sending}
                    whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-zinc-900 dark:bg-indigo-600 rounded-xl hover:bg-zinc-700 dark:hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
                  >
                    {sending ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Sending…
                      </>
                    ) : (
                      <><Send size={15} />Send message</>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </FadeIn>

          <FadeIn className="lg:col-span-2" delay={0.1} direction="left">
            <div className="space-y-8">
              <div>
                <p className="text-xs font-semibold tracking-widest text-zinc-400 uppercase mb-2">Email</p>
                <a href="mailto:rao.rahul1@northeastern.edu" className="text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors break-all">
                  rao.rahul1@northeastern.edu
                </a>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-widest text-zinc-400 uppercase mb-2">Based in</p>
                <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Boston, MA</p>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-widest text-zinc-400 uppercase mb-2">Availability</p>
                <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Open to co-ops, internships & research roles</p>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-widest text-zinc-400 uppercase mb-4">Find me on</p>
                <div className="space-y-3">
                  {socials.map(({ icon: Icon, label, href, handle }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                      <div className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-800 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/40 border border-zinc-200 dark:border-zinc-700 group-hover:border-indigo-200 dark:group-hover:border-indigo-700 flex items-center justify-center transition-all duration-150 shrink-0">
                        <Icon size={16} className="text-zinc-600 dark:text-zinc-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-zinc-400">{label}</p>
                        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">{handle}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-24 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
        <p>© {new Date().getFullYear()} Rahul Rao. All rights reserved.</p>
        <p>Built with Next.js & Tailwind CSS</p>
      </div>
    </section>
  );
}
