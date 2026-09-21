"use client";

import { useState, useEffect, useLayoutEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import ExploreCanvas from "./ExploreCanvas";
import { CLASSIC_HASH } from "@/lib/routes";

// Runs before paint in the browser, plain effect on the server (where layout
// effects warn). Closing the overlay here means `/#classic` never flashes the
// canvas before showing the classic page.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Wraps the classic page. The canvas opens over it by default, so the
 *  classic content stays server-rendered in the DOM (crawlers and no-JS
 *  visitors still get everything) while visitors land on the interactive view.
 *
 *  `/#classic` deep-links straight to the classic page, which gives the
 *  scrolling site a real URL other pages can link to. */
export default function ExploreShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);

  useIsomorphicLayoutEffect(() => {
    if (window.location.hash === CLASSIC_HASH) setOpen(false);
  }, []);

  const showClassic = () => {
    setOpen(false);
    window.history.replaceState(null, "", CLASSIC_HASH);
  };

  const showExplore = () => {
    setOpen(true);
    window.history.replaceState(null, "", window.location.pathname);
  };

  // Lock background scroll only while the canvas covers the page.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") showClassic();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Support back/forward between the two views.
  useEffect(() => {
    const onHashChange = () => setOpen(window.location.hash !== CLASSIC_HASH);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <>
      {children}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
          >
            <ExploreCanvas onExit={showClassic} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Way back in, once dismissed */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            onClick={showExplore}
            className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-indigo-600 rounded-full shadow-lg shadow-indigo-600/25 hover:bg-indigo-500 transition-colors"
          >
            <Sparkles size={15} />
            Explore
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
