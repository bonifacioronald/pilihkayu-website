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
          edge={placement === "bleed-right" ? "left" : placement === "bleed-left" ? "left-bleed" : "left"}
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
 * Terracotta caption box for renders (catalogue p.8, p.13). Deep terracotta keeps
 * paper text at 5.23:1. Every render on the site carries one.
 */
export function VisualisationCaption({
  place,
  lead = "A visualisation of an ongoing PilihKayu project in:",
  edge = "left",
  className,
}: {
  place: string;
  lead?: string;
  edge?: "left" | "left-bleed";
  className?: string;
}) {
  return (
    <p
      className={cx(
        "absolute bottom-6 z-10 max-w-[18rem] bg-terracotta-deep py-3 pr-5 text-[0.875rem] leading-snug text-paper lg:bottom-10 lg:max-w-[20rem] lg:py-4 lg:text-[0.9375rem]",
        edge === "left-bleed" ? "left-0 pl-[var(--outer)]" : "left-0 pl-4 lg:pl-6",
        className,
      )}
    >
      {lead} <strong className="block font-semibold">{place}</strong>
    </p>
  );
}
