"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cx } from "@/lib/cx";

type Props = {
  id: string;
  name: string;
  finish: string;
  still: string;
  video: string;
  href: string;
  specs: Array<{ label: string; value: string }>;
  sizes?: string;
  /** Heading level for the finish name (h3 under a section h2, h2 under the page h1). */
  headingLevel?: "h2" | "h3";
};

/**
 * One flooring finish: the still is the main image; a short close-up film of the grain fades in
 * over it on hover (mouse) or while the card is centred on screen (touch). The film only loads
 * when first needed. Reduced motion: still only. The whole card opens the flooring page.
 */
export function FlooringCard({ id, name, finish, still, video, href, specs, sizes, headingLevel = "h3" }: Props) {
  const Heading = headingLevel;
  const ref = useRef<HTMLAnchorElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const [want, setWant] = useState(false);
  const [load, setLoad] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: hover)").matches) return; // mouse: handled by hover
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setWant(e.intersectionRatio > 0.8), { threshold: [0, 0.8, 1] });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = vid.current;
    if (want && !load) setLoad(true);
    if (!v) return;
    if (want) v.play().catch(() => {});
    else {
      v.pause();
      setShown(false);
    }
  }, [want, load]);

  const hover = (on: boolean) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: hover)").matches) setWant(on);
  };

  return (
    <Link
      ref={ref}
      href={href}
      id={`floor-${id}`}
      onMouseEnter={() => hover(true)}
      onMouseLeave={() => hover(false)}
      onFocus={() => hover(true)}
      onBlur={() => hover(false)}
      className="group block"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={still}
          alt={`${name} solid wood flooring, ${finish} finish`}
          fill
          sizes={sizes ?? "(min-width:1024px) 30vw, 78vw"}
          loading="eager"
          className="object-cover transition-transform duration-[1200ms] ease-brand [@media(hover:hover)]:group-hover:scale-[1.03]"
        />
        {load ? (
          <video
            ref={vid}
            src={video}
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            onPlaying={() => setShown(true)}
            className={cx(
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-[700ms] ease-brand",
              shown && want ? "opacity-100" : "opacity-0",
            )}
          />
        ) : null}
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <Heading className="t-heading">
          <span className="underline decoration-transparent decoration-1 underline-offset-[6px] transition-[text-decoration-color] duration-ui ease-brand [@media(hover:hover)]:group-hover:decoration-[var(--rule)]">
            {name}
          </span>
        </Heading>
        <p className="t-label">{finish}</p>
      </div>
      <dl className="tabular mt-4 space-y-3 border-t border-[var(--rule)]/40 pt-4 text-[0.9375rem]">
        {specs.map((s) => (
          <div key={s.label} className="grid grid-cols-[7.5rem_1fr] gap-3">
            <dt className="t-muted">{s.label}</dt>
            <dd>{s.value}</dd>
          </div>
        ))}
      </dl>
    </Link>
  );
}
