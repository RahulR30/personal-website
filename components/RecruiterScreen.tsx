import { Suspense } from "react";
import RecruiterView from "./RecruiterView";

/** Shared by /recruiter and the tagged /r/[tag] links so both stay identical.
 *  RecruiterView reads ?role= via useSearchParams, which needs a Suspense
 *  boundary or the static build fails. */
function Fallback() {
  return (
    <div className="min-h-screen px-6 py-14 sm:py-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Rahul Rao
        </h1>
        <p className="mt-2 text-zinc-500 dark:text-zinc-400">
          B.S. Computer Science, Northeastern University · Khoury College
        </p>
      </div>
    </div>
  );
}

export default function RecruiterScreen() {
  return (
    <Suspense fallback={<Fallback />}>
      <RecruiterView />
    </Suspense>
  );
}
