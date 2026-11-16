/** Colour tokens mirrored from app/globals.css, for the style guide's contrast table. */
export const colors = {
  espresso: { hex: "#2B1A12", role: "Default page ground. Most sections." },
  paper: { hex: "#F4EDE3", role: "Text on dark. Alternate ground for some sections only." },
  stone: { hex: "#B0A08F", role: "Secondary text on dark: spec values, captions, meta." },
  gold: { hex: "#B8863B", role: "Labels, taglines, step markers, rules, certification accents. Lines only on paper." },
  oxblood: { hex: "#6E2A2A", role: "Closing call-to-action block only. Never a button on dark." },
  terracotta: { hex: "#C1592C", role: "Text-free blocks: the section-tag bar." },
  "terracotta-deep": { hex: "#A3461F", role: "Blocks holding small text: the Visualisation caption." },
  neutral: { hex: "#5A3A28", role: "Secondary text and labels on paper." },
} as const;

function luminance(hex: string) {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const [r, g, b] = c.map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrast(a: string, b: string) {
  const [x, y] = [luminance(a), luminance(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
}

/** The pairs the system uses, with what each is allowed to carry. */
export const contrastPairs: Array<{ fg: keyof typeof colors; bg: keyof typeof colors; use: string; min: number }> = [
  { fg: "paper", bg: "espresso", use: "Primary text on dark", min: 4.5 },
  { fg: "stone", bg: "espresso", use: "Secondary text on dark", min: 4.5 },
  { fg: "gold", bg: "espresso", use: "Labels, taglines, small text", min: 4.5 },
  { fg: "espresso", bg: "paper", use: "Primary text on paper", min: 4.5 },
  { fg: "neutral", bg: "paper", use: "Secondary text on paper", min: 4.5 },
  { fg: "paper", bg: "oxblood", use: "Text on the CTA block", min: 4.5 },
  { fg: "paper", bg: "terracotta-deep", use: "Visualisation caption text", min: 4.5 },
  { fg: "espresso", bg: "gold", use: "Button hover on dark", min: 4.5 },
  { fg: "terracotta", bg: "espresso", use: "Large text only (24 px+)", min: 3 },
  { fg: "gold", bg: "paper", use: "Lines only, never text", min: 0 },
  { fg: "gold", bg: "oxblood", use: "Rules and icons only", min: 0 },
];
