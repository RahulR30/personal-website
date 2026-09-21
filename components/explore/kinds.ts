import type { ProfileItem } from "@/lib/profile";

/** Per-kind styling shared by the canvas nodes and the detail panel. */
export const kindMeta: Record<
  ProfileItem["kind"],
  { label: string; badge: string; dot: string; glow: string }
> = {
  experience: {
    label: "Experience",
    badge: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300",
    dot: "bg-indigo-500",
    glow: "group-hover:shadow-[0_0_28px_-6px_rgba(99,102,241,0.55)]",
  },
  project: {
    label: "Project",
    badge: "bg-cyan-100 text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-300",
    dot: "bg-cyan-500",
    glow: "group-hover:shadow-[0_0_28px_-6px_rgba(6,182,212,0.55)]",
  },
  activity: {
    label: "Leadership",
    badge: "bg-violet-100 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300",
    dot: "bg-violet-500",
    glow: "group-hover:shadow-[0_0_28px_-6px_rgba(139,92,246,0.55)]",
  },
  education: {
    label: "Education",
    badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300",
    dot: "bg-emerald-500",
    glow: "group-hover:shadow-[0_0_28px_-6px_rgba(16,185,129,0.55)]",
  },
};
