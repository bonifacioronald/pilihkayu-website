import { Fraunces, Inter } from "next/font/google";

/**
 * Display face. The brand font is Recoleta (licensed). Until the web licence files are in
 * assets/brand/fonts, Fraunces (the spec's free alternative) stands in, set to its softest
 * style to sit close to Recoleta. To switch: replace this with next/font/local pointing at
 * the Recoleta .woff2 files, keeping the variable name --font-display.
 */
export const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["SOFT"],
  display: "swap",
});

export const body = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});
