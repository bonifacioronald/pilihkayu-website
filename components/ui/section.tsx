import Image from "next/image";
import { cx } from "@/lib/cx";
import { Placeholder } from "./placeholder";

export type Tone = "espresso" | "paper" | "oxblood" | "image";
export type Texture = "none" | "grid" | "grain";

type SectionProps = {
  tone?: Tone;
  texture?: Texture;
  id?: string;
  className?: string;
  /** Vertical padding: "section" (96/160), "tight" (64/96) or "none". */
  spacing?: "section" | "tight" | "none";
  /** Background photo for tone "image". Without one, a labelled placeholder ground shows. */
  image?: { src: string; alt: string };
  children: React.ReactNode;
  "aria-labelledby"?: string;
};

/** A full-width band. The tone sets ground and text colours for everything inside. */
export function Section({
  tone = "espresso",
  texture = "none",
  id,
  className,
  spacing = "section",
  image,
  children,
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={rest["aria-labelledby"]}
      className={cx(
        `tone-${tone}`,
        texture === "grid" && "texture-grid",
        texture === "grain" && "texture-grain",
        spacing === "section" && "section-y",
        spacing === "tight" && "py-16 lg:py-24",
        tone === "image" && "relative isolate",
        className,
      )}
    >
      {tone === "image" ? (
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          {image ? (
            <Image src={image.src} alt="" fill sizes="100vw" className="object-cover" />
          ) : (
            <Placeholder fill label="Asset pending · background photo" />
          )}
          {/* Espresso at 78 % keeps paper text above 4.5:1 on any photo. */}
          <div className="absolute inset-0 bg-espresso/78" />
        </div>
      ) : null}
      {children}
    </section>
  );
}

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cx("container-page", className)}>{children}</div>;
}

/** 4 / 8 / 12 columns with the page gutter. Place children with col-span utilities. */
export function Grid({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cx("grid-page", className)}>{children}</div>;
}

/** Thin gold rule. "short" is the 64 px divider used under contact blocks. */
export function GoldRule({ short = false, className }: { short?: boolean; className?: string }) {
  return (
    <hr
      className={cx("border-0 border-t border-[var(--rule)]", short ? "w-16" : "w-full", className)}
    />
  );
}
