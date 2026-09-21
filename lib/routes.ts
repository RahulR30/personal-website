/** Shared route constants.
 *
 * Kept in its own module (rather than alongside the explore components) so
 * pages can link to the classic view without importing the whole explore
 * canvas bundle.
 *
 * The site has three views but only two routes: `/` renders the interactive
 * explore canvas over the classic page, and `#classic` deep-links past it.
 */
export const CLASSIC_HASH = "#classic";

export const routes = {
  explore: "/",
  classic: `/${CLASSIC_HASH}`,
  recruiter: "/recruiter",
} as const;
