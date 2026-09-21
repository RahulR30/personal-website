import Link from "next/link";
import { Sparkles, LayoutList, Briefcase } from "lucide-react";
import { routes } from "@/lib/routes";

const destinations = [
  {
    href: routes.explore,
    icon: Sparkles,
    title: "Explore interactively",
    body: "Describe a role and see the matching parts of Rahul's background map out.",
  },
  {
    href: routes.classic,
    icon: LayoutList,
    title: "Full site",
    body: "The classic page — research, experience, projects, and contact details.",
  },
  {
    href: routes.recruiter,
    icon: Briefcase,
    title: "Recruiter view",
    body: "A one-page summary: availability, proof points, and a resume download.",
  },
];

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-lg">
        <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500 mb-3">
          404
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          That page doesn&apos;t exist
        </h1>
        <p className="mt-3 text-zinc-500 dark:text-zinc-400">
          It may have moved. Here&apos;s everything else on the site.
        </p>

        <div className="mt-8 space-y-px bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden">
          {destinations.map(({ href, icon: Icon, title, body }) => (
            <Link
              key={href}
              href={href}
              className="group flex items-start gap-3.5 bg-white dark:bg-zinc-900 p-5 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors"
            >
              <span className="mt-0.5 w-8 h-8 shrink-0 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-800/50 flex items-center justify-center">
                <Icon size={15} className="text-indigo-500" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {title}
                </span>
                <span className="mt-0.5 block text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {body}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
