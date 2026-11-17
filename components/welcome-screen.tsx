"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import data from "@/content/welcome-links.json";
import { CertificationMarks } from "@/components/ui/certification-marks";
import { ArrowRight } from "@/components/ui/icons";
import { Logo } from "@/components/ui/logo";
import { whatsappUrl } from "@/lib/settings";
import { cx } from "@/lib/cx";

type Item = { id: string; kind?: string; label: string; href?: string; message?: string; status: string };

const SOURCES: Record<string, string> = { instagram: "dari Instagram", qr: "dari QR katalog" };
const VIDEO = "/media/welcome-bg.mp4";
const POSTER = "/media/welcome-bg-poster.jpg";

const soonTag = <span className="text-[0.625rem] font-semibold tracking-[0.2em] uppercase">Coming soon</span>;

/**
 * /welcome: the Instagram bio and QR landing, built like an app's opening screen.
 * One job: send the visitor to the right action. The portrait factory film plays behind
 * everything at low opacity and fades into espresso, so text and buttons stay clear.
 * Sound is off until the visitor turns it on. No facts, no extra sections.
 */
export function WelcomeScreen() {
  const video = useRef<HTMLVideoElement>(null);
  const [source, setSource] = useState("dari website");
  const [load, setLoad] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [sound, setSound] = useState(false);

  useEffect(() => {
    const utm = new URLSearchParams(window.location.search).get("utm_source")?.toLowerCase() ?? "";
    if (SOURCES[utm]) setSource(SOURCES[utm]);
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
    v.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, [load]);

  function togglePlay() {
    const v = video.current;
    if (!v) return;
    if (!load) return setLoad(true);
    if (v.paused) v.play().then(() => setPlaying(true)).catch(() => {});
    else {
      v.pause();
      setPlaying(false);
    }
  }

  function toggleSound() {
    const v = video.current;
    if (!v) return;
    const next = !sound;
    v.muted = !next;
    setSound(next);
    if (next && v.paused) {
      if (!load) setLoad(true);
      else v.play().then(() => setPlaying(true)).catch(() => {});
    }
  }

  const control =
    "inline-flex min-h-11 items-center text-[0.6875rem] font-semibold tracking-[0.2em] uppercase text-paper/80 transition-colors duration-ui ease-brand [@media(hover:hover)]:hover:text-paper";
  const actions = data.actions as Item[];
  const roles = data.roles as Item[];

  return (
    <div className="tone-espresso relative isolate flex min-h-dvh flex-col overflow-hidden">
      {/* Film layer. Phones: full screen. Desktop: a centred portrait column, so the portrait film
          is never stretched across a wide screen. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 lg:left-1/2 lg:w-[36rem] lg:-translate-x-1/2">
        <div className="absolute inset-0 opacity-50">
          <Image src={POSTER} alt="" fill priority sizes="(min-width:1024px) 576px, 100vw" className="object-cover" />
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
        {/* Veil on top for the logo; solid espresso from the middle down for the buttons. */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(43_26_18/0.6)_0%,rgb(43_26_18/0.15)_20%,rgb(43_26_18/0.5)_40%,rgb(43_26_18/0.95)_58%,#2b1a12_70%)]" />
        {/* Desktop: the column's sides dissolve into the page. */}
        <div className="absolute inset-0 hidden bg-[linear-gradient(to_right,#2b1a12_0%,transparent_22%,transparent_78%,#2b1a12_100%)] lg:block" />
      </div>

      <header className="flex items-center justify-between px-5 pt-[max(0.5rem,env(safe-area-inset-top))] md:px-10">
        <button type="button" onClick={togglePlay} className={cx(control, "w-24 justify-start")}>
          {playing ? "Pause" : "Play"}
        </button>
        <Logo />
        <button type="button" onClick={toggleSound} aria-pressed={sound} className={cx(control, "w-24 justify-end")}>
          {sound ? "Sound on" : "Sound off"}
        </button>
      </header>

      <main id="main" className="mx-auto flex w-full max-w-md flex-1 flex-col justify-end px-5 pt-[34dvh] pb-[max(2rem,env(safe-area-inset-bottom))] text-center">
        <h1 className="t-title">Welcome to PilihKayu</h1>
        <p className="mt-3 text-base leading-normal text-paper/85">
          Solid wood, made to your drawings.
          <br />
          Direct from our factory, since 1995.
        </p>

        <div className="mt-8 grid gap-3">
          {actions.map((a, i) =>
            a.status === "live" ? (
              <a
                key={a.id}
                href={a.kind === "whatsapp" ? whatsappUrl(`${a.message ?? "Halo PilihKayu"} (${source})`) : a.href}
                {...(a.kind === "whatsapp" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
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
                className="flex min-h-14 cursor-not-allowed items-center justify-center gap-3 px-6 text-base font-semibold tracking-[0.03em] text-stone/80 shadow-[inset_0_0_0_1px_rgb(176_160_143/0.35)]"
              >
                {a.label}
                {soonTag}
              </button>
            ),
          )}
        </div>

        <fieldset className="mt-10" disabled={roles.every((r) => r.status !== "live")}>
          <legend className="t-break mx-auto mb-1 !text-[0.75rem]">{data.rolesTitle}</legend>
          <ul>
            {roles.map((r) => (
              <li key={r.id} className="border-b border-gold/25">
                {r.status === "live" && r.href ? (
                  <Link
                    href={r.href}
                    data-track="welcome_button_click"
                    data-track-button={r.id}
                    className="flex min-h-13 items-center justify-between gap-4 text-base [@media(hover:hover)]:hover:text-gold"
                  >
                    {r.label}
                    <ArrowRight className="size-5 text-gold" />
                  </Link>
                ) : (
                  <button type="button" disabled className="flex min-h-13 w-full cursor-not-allowed items-center justify-between gap-4 text-base text-stone/80">
                    {r.label}
                    {soonTag}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </fieldset>

        {data.explore.status === "live" ? (
          <Link
            href={data.explore.href}
            data-track="welcome_button_click"
            data-track-button={data.explore.id}
            className="mx-auto mt-8 inline-flex min-h-11 items-center gap-3 text-[0.9375rem] underline decoration-gold decoration-1 underline-offset-[6px] [@media(hover:hover)]:hover:decoration-paper"
          >
            {data.explore.label}
            <ArrowRight className="size-4" />
          </Link>
        ) : null}

        <CertificationMarks className="mt-10 justify-center gap-x-7 opacity-80 [&_img]:!h-8 [&_li:nth-child(2)_img]:!h-12" />
      </main>
    </div>
  );
}
