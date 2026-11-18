"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cx } from "@/lib/cx";

const PLAY_EVENT = "pk:video-play";

/**
 * Click-to-play video: shows its poster (with the reel's own title) and a clear Play button.
 * Nothing loads until the visitor taps. Playing one pauses any other. Tap again to pause.
 */
export function VideoCard({
  id,
  src,
  poster,
  alt,
  label,
  ratio = "9 / 16",
  sizes = "(min-width:1024px) 28vw, 72vw",
}: {
  id: string;
  src: string;
  poster: string;
  alt: string;
  /** Accessible name for the play button, e.g. "Play: Prepare". */
  label: string;
  ratio?: string;
  sizes?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const onOther = (e: Event) => {
      if ((e as CustomEvent<string>).detail !== id) {
        ref.current?.pause();
        setPlaying(false);
      }
    };
    window.addEventListener(PLAY_EVENT, onOther);
    return () => window.removeEventListener(PLAY_EVENT, onOther);
  }, [id]);

  useEffect(() => {
    const v = ref.current;
    if (!v || !load) return;
    v.play()
      .then(() => {
        setPlaying(true);
        window.dispatchEvent(new CustomEvent(PLAY_EVENT, { detail: id }));
      })
      .catch(() => setPlaying(false));
  }, [load, id]);

  function toggle() {
    const v = ref.current;
    if (!load) return setLoad(true);
    if (!v) return;
    if (v.paused) {
      v.play().then(() => {
        setPlaying(true);
        window.dispatchEvent(new CustomEvent(PLAY_EVENT, { detail: id }));
      });
    } else {
      v.pause();
      setPlaying(false);
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? `Pause: ${label}` : label}
      aria-pressed={playing}
      className="group relative block w-full overflow-hidden bg-[var(--placeholder-bg)] text-left"
      style={{ aspectRatio: ratio }}
    >
      <Image src={poster} alt={alt} fill sizes={sizes} loading="eager" className="object-cover" />
      {load ? (
        <video
          ref={ref}
          src={src}
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          className={cx("absolute inset-0 h-full w-full object-cover transition-opacity duration-500", playing ? "opacity-100" : "opacity-0")}
        />
      ) : null}
      {/* Play: a clear button low in the frame (clear of the reel's own title); then a small Pause mark. */}
      <span
        aria-hidden="true"
        className={cx(
          "absolute inset-x-0 bottom-[9%] flex items-center justify-center transition-opacity duration-300 ease-brand",
          playing ? "opacity-0" : "opacity-100",
        )}
      >
        <span className="inline-flex min-h-12 items-center gap-3 bg-espresso/75 px-5 text-[0.8125rem] font-semibold tracking-[0.16em] text-paper uppercase ring-1 ring-paper/40 transition-transform duration-ui ease-brand [@media(hover:hover)]:group-hover:scale-105">
          <svg viewBox="0 0 24 24" className="size-4 fill-paper" aria-hidden="true">
            <path d="M7 4.5v15l12-7.5z" />
          </svg>
          Play
        </span>
      </span>
      <span
        aria-hidden="true"
        className={cx(
          "absolute bottom-3 left-3 bg-espresso/60 px-3 py-2 text-[0.75rem] font-semibold tracking-[0.16em] text-paper/90 uppercase transition-opacity duration-300",
          playing ? "opacity-100" : "opacity-0",
        )}
      >
        Pause
      </span>
    </button>
  );
}
