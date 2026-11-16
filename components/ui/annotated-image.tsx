import Image from "next/image";
import { cx } from "@/lib/cx";
import { Placeholder } from "./placeholder";

export type Annotation = {
  /** Point on the image, in % from the left and top. */
  x: number;
  y: number;
  label: string;
  /** Which band the label sits in on tablet and desktop. */
  side: "top" | "bottom";
  /** Horizontal label position in % (defaults to x). */
  labelX?: number;
};

const VB_W = 1000;
const BAND = 150;

/**
 * Detail image with thin leader lines pointing at features (moodboard 05, HPDG details).
 * Tablet and desktop: labels above and below, joined by leaders.
 * Phones: numbered markers on the image and a numbered list below.
 */
export function AnnotatedImage({
  src,
  alt,
  ratio = 3 / 2,
  annotations,
  className,
}: {
  src?: string | null;
  alt: string;
  /** Width ÷ height. */
  ratio?: number;
  annotations: Annotation[];
  className?: string;
}) {
  const imgH = VB_W / ratio;
  const H = imgH + BAND * 2;
  const pct = (v: number) => `${(v / H) * 100}%`;

  const image = (
    <div className="absolute inset-x-0" style={{ top: pct(BAND), height: pct(imgH) }}>
      {src ? (
        <Image src={src} alt={alt} fill sizes="(min-width:1024px) 60vw, 100vw" className="object-cover" />
      ) : (
        <Placeholder fill label={`Asset pending · ${ratio === 1.5 ? "3:2" : ratio.toFixed(2)}`} />
      )}
    </div>
  );

  return (
    <figure className={cx("w-full", className)}>
      {/* Tablet and desktop */}
      <div className="relative hidden md:block" style={{ aspectRatio: `${VB_W} / ${H}` }}>
        {image}
        <svg
          viewBox={`0 0 ${VB_W} ${H}`}
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full text-[var(--line)]"
          aria-hidden="true"
        >
          {annotations.map((a, i) => {
            const px = (a.x / 100) * VB_W;
            const py = BAND + (a.y / 100) * imgH;
            const lx = ((a.labelX ?? a.x) / 100) * VB_W;
            const ly = a.side === "top" ? BAND - 34 : BAND + imgH + 34;
            return (
              <g key={i}>
                <line x1={lx} y1={ly} x2={px} y2={py} stroke="currentColor" strokeWidth={1} vectorEffect="non-scaling-stroke" />
                <circle cx={px} cy={py} r={5} fill="currentColor" vectorEffect="non-scaling-stroke" />
              </g>
            );
          })}
        </svg>
        {annotations.map((a, i) => {
          const lx = a.labelX ?? a.x;
          return (
            <span
              key={i}
              className="absolute w-max max-w-[14rem] -translate-x-1/2 text-center text-[0.8125rem] leading-snug font-semibold tracking-[0.02em]"
              style={
                a.side === "top"
                  ? { left: `${lx}%`, bottom: `calc(100% - ${pct(BAND - 40)})` }
                  : { left: `${lx}%`, top: pct(BAND + imgH + 40) }
              }
            >
              {a.label}
            </span>
          );
        })}
      </div>

      {/* Phones */}
      <div className="md:hidden">
        <div className="relative" style={{ aspectRatio: String(ratio) }}>
          {src ? (
            <Image src={src} alt={alt} fill sizes="100vw" className="object-cover" />
          ) : (
            <Placeholder fill label="Asset pending" />
          )}
          {annotations.map((a, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="tabular absolute flex size-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold text-[0.75rem] font-semibold text-espresso"
              style={{ left: `${a.x}%`, top: `${a.y}%` }}
            >
              {i + 1}
            </span>
          ))}
        </div>
        <ol className="mt-4 space-y-2">
          {annotations.map((a, i) => (
            <li key={i} className="flex gap-3 text-[0.9375rem]">
              <span className="tabular w-5 shrink-0 font-semibold text-[var(--label)]">{i + 1}</span>
              <span>{a.label}</span>
            </li>
          ))}
        </ol>
      </div>
    </figure>
  );
}
