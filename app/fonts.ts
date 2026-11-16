import { Inter } from "next/font/google";
import localFont from "next/font/local";

/**
 * Display face: Fraunces (brand decision, 12 Nov 2026), light weight at optical size 144,
 * soft and wonky off. Self-hosted as one static instance (17 KB, latin) from Google Fonts
 * (SIL Open Font License), so the headline paints fast and keeps its display cut.
 * Only weight 300 exists: titles are never bold.
 */
export const display = localFont({
  variable: "--font-fraunces",
  src: [{ path: "./fonts/fraunces-300-opsz144-latin.woff2", weight: "300", style: "normal" }],
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

/** Not preloaded: the headline face loads first so the largest text paints sooner. */
export const body = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});
