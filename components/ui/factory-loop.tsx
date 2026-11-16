"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cx } from "@/lib/cx";

/**
 * Short, muted factory loop: real footage as proof. The poster (optimised image) paints first;
 * the video loads only when on screen, plays while visible and pauses when not. With reduced
 * motion it never autoplays: the poster stays and a Play button starts it on request.
 */
export function FactoryLoop({
  src,
  poster,
  alt,
  ratio = "5 / 4",
  caption,
  priority = false,
  sizes = "(min-width:1024px) 40vw, 100vw",
  className,
}: {
  src: string;
  poster: string;
  /** Describes what the footage shows. */
  alt: string;
  ratio?: string;
  caption?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [load, setLoad] = useState(false);
  const userPaused = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const video = ref.current;
    if (!video) return;
    let io: IntersectionObserver | undefined;
    let timer: number | undefined;
    // The poster paints first; the video only starts after the page has finished loading,
    // so it never competes with the first view (hero image loads before any video).
    const start = () => {
      timer = window.setTimeout(() => {
        io = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setLoad(true);
              if (!mq.matches && !userPaused.current)
                video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
            } else {
              video.pause();
              setPlaying(false);
            }
          },
          { threshold: 0.35 },
        );
        io.observe(video);
      }, 1000);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      window.removeEventListener("load", start);
      window.clearTimeout(timer);
      io?.disconnect();
    };
  }, []);

  function toggle() {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      userPaused.current = false;
      const play = () => video.play().then(() => setPlaying(true)).catch(() => {});
      if (!load) {
        // Attach the source first, then play on the next frame.
        setLoad(true);
        requestAnimationFrame(() => requestAnimationFrame(() => {
          video.load();
          play();
        }));
      } else play();
    } else {
      userPaused.current = true;
      video.pause();
      setPlaying(false);
    }
  }

  return (
    <figure className={className}>
      <div className="relative overflow-hidden bg-[var(--placeholder-bg)]" style={{ aspectRatio: ratio }}>
        <Image src={poster} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
        <video
          ref={ref}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          className={cx(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-reveal ease-brand",
            playing ? "opacity-100" : "opacity-0",
          )}
        >
          {load ? <source src={src} type="video/mp4" /> : null}
        </video>
        {/* Always offered: a looping video next to other content needs a pause control (WCAG 2.2.2). */}
        <button
          type="button"
          onClick={toggle}
          className="absolute bottom-3 left-3 inline-flex min-h-11 items-center bg-espresso/85 px-4 text-[0.8125rem] font-semibold tracking-[0.04em] text-paper transition-transform duration-ui ease-brand motion-safe:active:scale-[0.97]"
        >
          {playing ? "Pause video" : "Play video"}
        </button>
      </div>
      {caption ? <figcaption className="t-meta mt-3">{caption}</figcaption> : null}
    </figure>
  );
}
