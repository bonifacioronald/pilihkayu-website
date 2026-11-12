import { Fraunces, Inter } from "next/font/google";

/** Display face: Fraunces in its softest style (brand decision, 12 Nov 2026). */
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
