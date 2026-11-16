"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "@/components/ui/icons";
import { Placeholder } from "@/components/ui/placeholder";

export type SlideshowSlide = {
  id: string;
  image?: { src: string; alt: string } | null;
  stage: string;
  caption?: string | null;
};

/**
 * Inset slideshow with counter and prev/next (moodboard 01). Swipe uses native scroll
 * snapping; arrow keys work when it has focus; #slide-<id> opens a given slide.
 * Slides are framed by the margins, never full-width, so weaker photos hold up.
 */
export function Slideshow({ slides, label }: { slides: SlideshowSlide[]; label: string }) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const go = useCallback(
    (i: number, smooth = true) => {
      const el = track.current;
      if (!el) return;
      const clamped = Math.max(0, Math.min(slides.length - 1, i));
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollTo({ left: clamped * el.clientWidth, behavior: smooth && !reduce ? "smooth" : "auto" });
    },
    [slides.length],
  );

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => setIndex(Math.round(el.scrollLeft / el.clientWidth));
    el.addEventListener("scroll", onScroll, { passive: true });
    const fromHash = () => {
      const m = window.location.hash.match(/^#slide-(.+)$/);
      if (!m) return;
      const i = slides.findIndex((s) => s.id === decodeURIComponent(m[1]));
      if (i >= 0) {
        el.closest("section")?.scrollIntoView({ block: "start" });
        go(i, false);
      }
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", fromHash);
    };
  }, [go, slides]);

  const pad = (n: number) => String(n).padStart(2, "0");
  const current = slides[index];

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <div
        ref={track}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            go(index + 1);
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            go(index - 1);
          }
        }}
        className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((s, i) => (
          <figure
            key={s.id}
            data-slide-id={s.id}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
            className="w-full shrink-0 snap-start"
          >
            <div className="relative mx-auto w-full lg:w-[66%]" style={{ aspectRatio: "4 / 3" }}>
              {s.image ? (
                <Image src={s.image.src} alt={s.image.alt} fill sizes="(min-width:1024px) 60vw, 100vw" className="object-cover" />
              ) : (
                <Placeholder fill label={`Asset pending · ${s.stage} · 4:3`} />
              )}
            </div>
          </figure>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 lg:mx-auto lg:w-[66%]">
        <div className="min-w-0">
          <p className="t-label">{current?.stage}</p>
          <p className="t-muted mt-1 text-base">{current?.caption ?? "Caption to follow with the photo."}</p>
        </div>
        <div className="-ml-3 flex shrink-0 items-center gap-2 sm:ml-0">
          <button type="button" onClick={() => go(index - 1)} disabled={index === 0} aria-label="Previous slide" className="inline-flex size-11 items-center justify-center transition-opacity duration-ui disabled:opacity-35">
            <ArrowLeft className="size-5" />
          </button>
          <p className="tabular min-w-[4.5rem] text-center text-[0.9375rem]" aria-live="polite">
            {pad(index + 1)} / {pad(slides.length)}
          </p>
          <button type="button" onClick={() => go(index + 1)} disabled={index === slides.length - 1} aria-label="Next slide" className="inline-flex size-11 items-center justify-center transition-opacity duration-ui disabled:opacity-35">
            <ArrowRight className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
