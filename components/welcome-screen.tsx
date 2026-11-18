"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import data from "@/content/welcome-links.json";
import { CertificationMarks } from "@/components/ui/certification-marks";
import { ArrowRight, Check } from "@/components/ui/icons";
import { Logo } from "@/components/ui/logo";
import { whatsappUrl } from "@/lib/settings";
import { track } from "@/lib/analytics";
import { cx } from "@/lib/cx";

type Action = {
  id: string;
  kind?: string;
  label: string;
  href?: string;
  message?: string;
  status: string;
};
type Role = {
  id: string;
  label: string;
  href: string;
  status: string;
  waNote?: string;
};

const SOURCES: Record<string, string> = {
  instagram: "dari Instagram",
  qr: "dari QR katalog",
};
const VIDEO = "/media/welcome-bg.mp4";
const POSTER = "/media/welcome-bg-poster.jpg";

/**
 * /welcome: the Instagram bio and QR landing, built like an app's opening screen.
 * One job: send the visitor to the right action.
 * Phones and tablets: the portrait film fills the screen behind the content; a soft scrim
 * keeps text readable while the whole film stays visible.
 * Desktop: the film stands uncropped as a full-height portrait panel on the left; the
 * greeting and actions sit beside it.
 */
export function WelcomeScreen() {
  const router = useRouter();
  const video = useRef<HTMLVideoElement>(null);
  const picker = useRef<HTMLDivElement>(null);
  const [source, setSource] = useState("dari website");
  const [load, setLoad] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [sound, setSound] = useState(false);
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState<Role | null>(null);

  const actions = data.actions as Action[];
  const roles = data.roles as Role[];

  useEffect(() => {
    const utm =
      new URLSearchParams(window.location.search)
        .get("utm_source")
        ?.toLowerCase() ?? "";
    // The Instagram bio links to plain /welcome; the Instagram app's own browser identifies itself.
    if (SOURCES[utm]) setSource(SOURCES[utm]);
    else if (/Instagram/i.test(navigator.userAgent)) setSource(SOURCES.instagram);
    // Poster first; the film starts once the page has loaded. Never autoplays with reduced motion.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: number | undefined;
    const start = () => {
      timer = window.setTimeout(() => setLoad(true), 600);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      window.removeEventListener("load", start);
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const v = video.current;
    if (!load || !v) return;
    v.load();
    v.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, [load]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: PointerEvent) => {
      if (picker.current && !picker.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  function toggleSound() {
    const v = video.current;
    if (!v) return;
    const next = !sound;
    v.muted = !next;
    setSound(next);
    if (next && v.paused) {
      if (!load) setLoad(true);
      else
        v.play()
          .then(() => setPlaying(true))
          .catch(() => {});
    }
  }

  function choose(r: Role) {
    setOpen(false);
    track("welcome_button_click", { page: "/welcome", button: `role_${r.id}` });
    if (r.status === "live") router.push(r.href);
    else setRole(r);
  }

  const waMessage = (base?: string) =>
    `${base ?? "Halo PilihKayu"}${role?.waNote ? `. ${role.waNote}` : ""} (${source})`;

  /** One small, quiet sound toggle. The film always plays (muted until the visitor asks). */
  const controls = (className: string) => (
    <div className={className}>
      <button
        type="button"
        onClick={toggleSound}
        aria-pressed={sound}
        aria-label={sound ? "Turn sound off" : "Turn sound on"}
        className="inline-flex size-11 items-center justify-center text-paper/70 transition-colors duration-ui ease-brand [@media(hover:hover)]:hover:text-paper"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5" aria-hidden="true">
          <path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4z" />
          {sound ? <path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" /> : <path d="M16 10l4 4M20 10l-4 4" />}
        </svg>
      </button>
    </div>
  );

  return (
    <div className="tone-espresso relative isolate min-h-dvh lg:flex">
      {/* Film */}
      <div className="absolute inset-x-0 top-0 -z-10 h-[66dvh] overflow-hidden lg:sticky lg:top-0 lg:z-0 lg:h-dvh lg:w-auto lg:shrink-0 lg:[aspect-ratio:9/16]">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-75 lg:opacity-100"
        >
          <Image
            src={POSTER}
            alt=""
            fill
            priority
            sizes="(min-width:1024px) 56vh, 100vw"
            className="object-cover"
          />
          <video
            ref={video}
            muted
            loop
            playsInline
            preload="none"
            className={cx(
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-reveal ease-brand",
              playing ? "opacity-100" : "opacity-0",
            )}
          >
            {load ? <source src={VIDEO} type="video/mp4" /> : null}
          </video>
        </div>
        {/* Phone: the film fills the top two thirds, clear in the middle where the subject is; it
            dissolves into solid espresso before the buttons, so nothing sits behind them. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(43_26_18/0.6)_0%,rgb(43_26_18/0.05)_16%,rgb(43_26_18/0.05)_46%,rgb(43_26_18/0.8)_66%,#2b1a12_92%)] lg:hidden"
        />
        {/* Desktop: a soft foot under the controls only. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 hidden h-28 bg-[linear-gradient(to_top,rgb(43_26_18/0.7),transparent)] lg:block"
        />
        {controls("absolute right-3 bottom-3 hidden lg:block")}
      </div>

      {/* Content */}
      <div className="flex min-h-dvh flex-1 flex-col">
        <header className="relative flex items-center justify-center px-5 pt-[max(0.5rem,env(safe-area-inset-top))] lg:justify-start lg:px-[clamp(3rem,6vw,7rem)] lg:pt-8">
          {controls("absolute top-[max(0.5rem,env(safe-area-inset-top))] right-2 lg:hidden")}
          <Logo className="relative" />
        </header>

        <main
          id="main"
          className="mx-auto flex w-full max-w-md flex-1 flex-col justify-end px-5 pt-[41dvh] pb-[max(1.75rem,env(safe-area-inset-bottom))] text-center lg:mx-0 lg:max-w-3xl lg:justify-center lg:px-[clamp(3rem,6vw,7rem)] lg:py-16 lg:text-left"
        >
          <h1 className="t-title lg:[font-size:clamp(3rem,2rem+3vw,5rem)] lg:leading-none">
            Welcome to PilihKayu
          </h1>
          <p className="mt-3 text-base leading-normal text-paper/90 lg:mt-5 lg:text-lg">
            Solid wood, made to your drawings.
            <br />
            Direct from our factory, since 1995.
          </p>

          <div className="mt-8 grid gap-3 lg:mt-10 lg:max-w-sm">
            {actions.map((a, i) =>
              a.status === "live" ? (
                <a
                  key={a.id}
                  href={
                    a.kind === "whatsapp"
                      ? whatsappUrl(waMessage(a.message))
                      : a.href
                  }
                  {...(a.kind === "whatsapp"
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  data-track="welcome_button_click"
                  data-track-button={a.id}
                  className={cx(
                    "flex min-h-14 items-center justify-center px-6 text-base font-semibold tracking-[0.03em] transition-[transform,background-color] duration-ui ease-brand motion-safe:active:scale-[0.98]",
                    i === 0
                      ? "bg-paper text-espresso [@media(hover:hover)]:hover:bg-gold"
                      : "text-paper shadow-[inset_0_0_0_1px_var(--color-gold)]",
                  )}
                >
                  {a.label}
                </a>
              ) : (
                <button
                  key={a.id}
                  type="button"
                  disabled
                  className="flex min-h-14 cursor-not-allowed items-center justify-center gap-3 bg-espresso px-6 text-base font-semibold tracking-[0.03em] text-stone shadow-[inset_0_0_0_1px_rgb(176_160_143/0.4)]"
                >
                  {a.label}
                  <span className="text-[0.625rem] font-semibold tracking-[0.2em] uppercase">
                    Coming soon
                  </span>
                </button>
              ),
            )}
          </div>

          {/* Role picker */}
          <div
            ref={picker}
            className="relative mt-14 text-left lg:mt-16 lg:max-w-sm"
          >
            <p
              id="role-label"
              className="mb-3 text-center text-[0.9375rem] font-medium text-paper lg:text-left"
            >
              {data.rolesTitle}
            </p>
            <div className="relative">
              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-labelledby="role-label role-value"
                onClick={() => setOpen((o) => !o)}
                className="flex min-h-14 w-full items-center justify-between gap-4 bg-espresso px-5 text-base shadow-[inset_0_0_0_1px_rgb(184_134_59/0.7)] transition-[box-shadow] duration-ui ease-brand [@media(hover:hover)]:hover:shadow-[inset_0_0_0_1px_var(--color-gold)]"
              >
                <span
                  id="role-value"
                  className={role ? "text-paper" : "text-stone"}
                >
                  {role ? role.label : data.rolesPlaceholder}
                </span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className={cx(
                    "size-5 text-gold transition-transform duration-overlay ease-brand",
                    open && "rotate-180",
                  )}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <ul
                role="listbox"
                aria-labelledby="role-label"
                className={cx(
                  "absolute inset-x-0 top-[calc(100%+4px)] z-20 origin-top bg-espresso shadow-[inset_0_0_0_1px_rgb(184_134_59/0.7)] transition-[opacity,transform,visibility] ease-brand",
                  open
                    ? "visible translate-y-0 scale-100 opacity-100 duration-200"
                    : "invisible -translate-y-1 scale-[0.98] opacity-0 duration-150 motion-reduce:translate-y-0 motion-reduce:scale-100",
                )}
              >
                {roles.map((r) => (
                  <li
                    key={r.id}
                    role="option"
                    aria-selected={role?.id === r.id}
                    className="border-b border-gold/20 last:border-b-0"
                  >
                    <button
                      type="button"
                      tabIndex={open ? 0 : -1}
                      onClick={() => choose(r)}
                      className="flex min-h-13 w-full items-center justify-between gap-4 px-5 text-left text-base transition-colors duration-ui ease-brand [@media(hover:hover)]:hover:bg-paper/5"
                    >
                      {r.label}
                      {role?.id === r.id ? (
                        <Check className="size-5 text-gold" />
                      ) : null}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <p
              aria-live="polite"
              className="mt-3 min-h-10 text-center text-[0.875rem] leading-snug text-paper/85 lg:text-left"
            >
              {role && role.status !== "live"
                ? "Your page is coming soon. For now, contact us and we’ll help you directly."
                : ""}
            </p>
          </div>

          {data.explore.status === "live" ? (
            <Link
              href={data.explore.href}
              data-track="welcome_button_click"
              data-track-button={data.explore.id}
              className="mx-auto mt-4 inline-flex min-h-11 items-center gap-3 text-[0.9375rem] underline decoration-gold decoration-1 underline-offset-[6px] lg:mx-0 [@media(hover:hover)]:hover:decoration-paper"
            >
              {data.explore.label}
              <ArrowRight className="size-4" />
            </Link>
          ) : null}

          <CertificationMarks className="mt-10 justify-center gap-x-7 opacity-85 lg:mt-14 lg:justify-start [&_img]:!h-8 [&_li:nth-child(2)_img]:!h-12" />
        </main>
      </div>
    </div>
  );
}
