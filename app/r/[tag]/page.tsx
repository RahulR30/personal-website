import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RecruiterScreen from "@/components/RecruiterScreen";

export const metadata: Metadata = {
  title: "Rahul Rao — Summary for Recruiters",
  description:
    "A one-page summary: quantitative research on high-frequency market data, production data engineering at Wayfair, availability, and contact details.",
  // Never index these — they're private, per-application links.
  robots: { index: false, follow: false },
};

/** Per-application tracking links: /r/janestreet, /r/citadel, ...
 *
 *  Identical to /recruiter, but each tag is a distinct PATH, and Vercel Web
 *  Analytics reports paths on every plan. Query strings (?utm_source=...) are
 *  only broken out with the Web Analytics Plus add-on, so paths are the way to
 *  get per-application attribution on the free tier.
 *
 *  The tag is never rendered — it exists purely as an analytics marker, so a
 *  recruiter opening the link sees exactly the same page as /recruiter.
 */
const VALID_TAG = /^[a-z0-9][a-z0-9-]{0,31}$/;

export default async function TaggedRecruiterPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;

  // Reject anything that isn't a simple slug, so stray or probing URLs 404
  // instead of creating junk rows in the analytics Pages panel.
  if (!VALID_TAG.test(tag)) notFound();

  return <RecruiterScreen />;
}
