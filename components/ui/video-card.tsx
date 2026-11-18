"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cx } from "@/lib/cx";

const PLAY_EVENT = "pk:video-play";

/**
 * Tap-to-play video with sound: shows its poster (with the reel's own title) and a small Play
 * label. Nothing loads until the visitor taps; it then plays with sound (a small toggle mutes it).
 * Playing one pauses any other. Tap the film again to pause.
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
  const [muted, setMuted] = useState(false);

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
    <div className="relative">
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? `Pause: ${label}` : label}
        aria-pressed={playing}
        className="group relative block w-full overflow-hidden bg-[var(--placeholder-bg)] text-left"
        style={{ aspectRatio: ratio }}
      >
        <Image
          src={poster}
          alt={alt}
          fill
          sizes={sizes}
          loading="eager"
          className="object-cover"
        />
        {load ? (
          <video
            ref={ref}
            src={src}
            muted={muted}
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            className={cx(
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
              playing ? "opacity-100" : "opacity-0",
            )}
          />
        ) : null}
        {/* Small Play label in the corner until playing; then a small sound toggle. */}
        <span
          aria-hidden="true"
          className={cx(
            "absolute bottom-3 left-3 inline-flex min-h-9 items-center gap-2 bg-espresso/70 px-3 text-[0.75rem] font-semibold tracking-[0.14em] text-paper uppercase transition-opacity duration-300",
            playing ? "opacity-0" : "opacity-100",
          )}
        >
          <svg
            viewBox="0 0 24 24"
            className="size-3 fill-paper"
            aria-hidden="true"
          >
            <path d="M7 4.5v15l12-7.5z" />
          </svg>
          Play
        </span>
      </button>
      {playing ? (
        <button
          type="button"
          onClick={() => setMuted((m) => !m)}
          aria-label={muted ? "Turn sound on" : "Turn sound off"}
          aria-pressed={!muted}
          className="absolute right-2 bottom-2 inline-flex size-11 items-center justify-center text-paper"
        >
          <span className="flex size-8 items-center justify-center bg-espresso/70">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="size-4"
              aria-hidden="true"
            >
              <path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4z" />
              {muted ? (
                <path d="M16 10l4 4M20 10l-4 4" />
              ) : (
                <path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" />
              )}
            </svg>
          </span>
        </button>
      ) : null}
    </div>
  );
}
