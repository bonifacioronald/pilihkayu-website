/**
 * Analytics events (docs/spec.md, Functions & data). Safe to call anywhere: does nothing until
 * Google Analytics has loaded (production only, NEXT_PUBLIC_GA_ID set in Vercel).
 */
type Params = Record<string, string | number | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", event, params);
}
