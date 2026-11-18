import Image from "next/image";
import { cx } from "@/lib/cx";
import { Placeholder } from "./placeholder";

export type Placement = "inset" | "bleed-left" | "bleed-right";

type ImageFrameProps = {
  src?: string | null;
  alt: string;
  /** CSS aspect ratio, e.g. "4 / 5". Also used in the placeholder label. */
  ratio: string;
  /** inset: framed by the margins. bleed-*: runs to that viewport edge; the text keeps its margins. */
  placement?: Placement;
  /** Renders are always labelled. Pass the place for the catalogue-style caption box. */
  visualisation?: { place: string; lead?: string } | false;
  caption?: string;
  priority?: boolean;
  sizes?: string;
  /** Black-and-white for atmosphere. Use sparingly; wood stays in colour. */
  mono?: boolean;
  className?: string;
};

/** Photo, render or placeholder with a fixed ratio and an optional "Visualisation" caption box. */
export function ImageFrame({
  src,
  alt,
  ratio,
  placement = "inset",
  visualisation = false,
  caption,
  priority,
  sizes = "(min-width: 1024px) 60vw, 100vw",
  mono = false,
  className,
}: ImageFrameProps) {
  const ratioLabel = ratio.replace(/\s/g, "");
  return (
    <figure
      className={cx(
        "relative",
        placement === "bleed-left" && "-ml-[var(--outer)]",
        placement === "bleed-right" && "-mr-[var(--outer)]",
        className,
      )}
    >
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: ratio }}>
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className={cx("object-cover", mono && "grayscale")}
          />
        ) : (
          <Placeholder fill label={`Asset pending · ${ratioLabel}`} />
        )}
      </div>
      {visualisation ? (
        <VisualisationCaption
          place={visualisation.place}
          lead={visualisation.lead}
        />
      ) : null}
      {caption ? (
        <figcaption
          className={cx(
            "t-meta mt-3",
            placement === "bleed-left" && "pl-[var(--outer)]",
            placement === "bleed-right" && "pr-[var(--outer)]",
          )}
        >
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

/**
 * Label for renders. Quiet by default: a small line under or on the image, so a render never
 * shouts. Every render on the site carries one. Replace renders with project photos when they exist.
 * "box" is the catalogue's terracotta box, kept for print-like layouts only.
 */
export function VisualisationCaption({
  place,
  lead = "Visualisation",
  variant = "quiet",
  className,
}: {
  place: string;
  lead?: string;
  variant?: "quiet" | "box";
  edge?: "left" | "left-bleed";
  className?: string;
}) {
  if (variant === "box") {
    return (
      <p
        className={cx(
          "absolute bottom-6 left-0 z-10 max-w-[18rem] bg-terracotta-deep py-3 pr-5 pl-4 text-[0.875rem] leading-snug text-paper lg:bottom-10 lg:pl-6",
          className,
        )}
      >
        A visualisation of an ongoing PilihKayu project in: <strong className="block font-semibold">{place}</strong>
      </p>
    );
  }
  return (
    <p
      className={cx(
        "absolute right-3 bottom-3 z-10 bg-espresso/70 px-2.5 py-1 text-[0.75rem] font-medium tracking-[0.02em] text-paper/90",
        className,
      )}
    >
      {lead} · {place}
    </p>
  );
}
