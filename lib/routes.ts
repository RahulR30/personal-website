/** Shared route constants.
 *
 * Kept in its own module (rather than alongside the explore components) so
 * pages can link to the classic view without importing the whole explore
 * canvas bundle.
 *
 * The site has three views but only two routes: `/` renders the interactive
 * explore canvas over the classic page, and `#classic` deep-links past it.
 */
/** Canonical origin, used for metadataBase, Open Graph, JSON-LD, sitemap and
 *  robots. Keep it pointed at a domain that actually resolves — a canonical
 *  URL on a dead domain tells search engines the real home is unreachable.
 *
 *  Change this single constant when a custom domain is attached. */
export const SITE_URL = "https://personal-website-virid-omega-84.vercel.app";

export const CLASSIC_HASH = "#classic";

export const routes = {
  explore: "/",
  classic: `/${CLASSIC_HASH}`,
  recruiter: "/recruiter",
} as const;
