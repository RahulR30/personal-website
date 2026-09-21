import type { Metadata } from "next";
import RecruiterScreen from "@/components/RecruiterScreen";

export const metadata: Metadata = {
  title: "Rahul Rao — Summary for Recruiters",
  description:
    "A one-page summary: quantitative research on high-frequency market data, production data engineering at Wayfair, availability, and contact details.",
  // A link shared directly with recruiters — keep it out of search results.
  robots: { index: false, follow: false },
};

export default function RecruiterPage() {
  return <RecruiterScreen />;
}
