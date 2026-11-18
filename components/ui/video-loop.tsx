"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cx } from "@/lib/cx";

/**
 * Muted loop of real footage. The poster (optimised image) paints first; the video starts only
 * after the page has loaded and while it is on screen, pauses when off screen, and always has a
 * Pause/Play button (a looping video next to content needs one). Never autoplays with reduced
 * motion. Once a visitor pauses it, it stays paused.
 */
export function VideoLoop({
  src,
  poster,
  alt,
  ratio = "9 / 16",
  className,
  sizes = "(min-width:1024px) 30vw, 100vw",
  priority = false,
}: {
  src: string;
  poster: string;
  /** What the footage shows, for screen readers. */
  alt: string;
  ratio?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);
  const [playing, setPlaying] = useState(false);
  const userPaused = useRef(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let io: IntersectionObserver | undefined;
    let timer: number | undefined;
    const start = () => {
      timer = window.setTimeout(() => {
        io = new IntersectionObserver(
          ([e]) => {
            if (e.isIntersecting) {
              if (reduce || userPaused.current) return;
              setLoad(true);
            } else if (!v.paused) {
              v.pause();
              setPlaying(false);
            }
          },
          { threshold: 0.4 },
        );
        io.observe(v);
      }, 800);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      window.removeEventListener("load", start);
      window.clearTimeout(timer);
      io?.disconnect();
    };
  }, []);

  // Play whenever the source is attached and the video is (re)visible.
  useEffect(() => {
    const v = ref.current;
    if (!v || !load || userPaused.current) return;
    v.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, [load]);

  useEffect(() => {
    const v = ref.current;
    if (!v || !load) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !userPaused.current && v.paused) {
          v.play().then(() => setPlaying(true)).catch(() => {});
        }
      },
      { threshold: 0.4 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [load]);

  function toggle() {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      userPaused.current = false;
      if (!load) setLoad(true);
      else v.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      userPaused.current = true;
      v.pause();
      setPlaying(false);
    }
  }

  return (
    <div className={cx("relative overflow-hidden bg-[var(--placeholder-bg)]", className)} style={{ aspectRatio: ratio }}>
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
      <button
        type="button"
        onClick={toggle}
        className="absolute bottom-2 left-2 inline-flex min-h-11 items-center bg-espresso/55 px-3 text-[0.6875rem] font-semibold tracking-[0.16em] text-paper/85 uppercase transition-[transform,color] duration-ui ease-brand motion-safe:active:scale-[0.97] [@media(hover:hover)]:hover:text-paper"
      >
        {playing ? "Pause" : "Play"}
      </button>
    </div>
  );
}
