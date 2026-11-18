"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import products from "@/content/products.json";
import { SpecBlock } from "@/components/ui/spec-block";
import { cx } from "@/lib/cx";

type Finish = (typeof products.flooring.finishes)[number];

/**
 * The flooring series, one finish at a time. Choosing a finish crossfades a close-up film of
 * its grain (looping forward and back, with a slow drift), an angled still offset beside it,
 * and its specifications. Only the chosen film loads, and only while the section is on screen.
 * Reduced motion: stills only, no drift.
 */
export function FlooringSeries() {
  const finishes = products.flooring.finishes;
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [reduce, setReduce] = useState(false);
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  const root = useRef<HTMLDivElement>(null);
  const videos = useRef<Record<string, HTMLVideoElement | null>>({});

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const current = finishes[active];

  // Load the chosen film when the section is on screen; play only the chosen one.
  useEffect(() => {
    if (reduce || !visible) {
      Object.values(videos.current).forEach((v) => v?.pause());
      return;
    }
    if (!loaded[current.id]) setLoaded((l) => ({ ...l, [current.id]: true }));
    Object.entries(videos.current).forEach(([id, v]) => {
      if (!v) return;
      if (id === current.id) v.play().catch(() => {});
      else v.pause();
    });
  }, [active, visible, reduce, current.id, loaded]);

  function onKey(e: React.KeyboardEvent, i: number) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (i + (e.key === "ArrowRight" ? 1 : finishes.length - 1)) % finishes.length;
    setActive(next);
    document.getElementById(`finish-tab-${finishes[next].id}`)?.focus();
  }

  return (
    <div ref={root} className="grid-page gap-y-12 lg:items-center">
      {/* Media: film with the angled still offset (scattered) */}
      <div className="relative col-span-4 md:col-span-8 lg:order-2 lg:col-span-6 lg:col-start-7">
        <div className="relative ml-[14%] aspect-[4/5] overflow-hidden lg:ml-[18%]">
          {finishes.map((f, i) => (
            <div
              key={f.id}
              aria-hidden={i !== active}
              className={cx(
                "absolute inset-0 transition-opacity duration-[900ms] ease-brand",
                i === active ? "opacity-100" : "opacity-0",
              )}
            >
              <div className={cx("absolute inset-0", !reduce && "floor-drift")}>
                <Image src={f.poster} alt={`${f.name} flooring, ${f.finish} finish, close-up of the grain`} fill sizes="(min-width:1024px) 38vw, 86vw" className="object-cover" />
                {loaded[f.id] ? (
                  <video
                    ref={(el) => {
                      videos.current[f.id] = el;
                    }}
                    src={f.video}
                    muted
                    loop
                    playsInline
                    preload="auto"
                    aria-hidden="true"
                    onPlaying={(e) => (e.currentTarget.style.opacity = "1")}
                    className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-[900ms] ease-brand"
                  />
                ) : null}
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-[-8%] left-0 w-[38%] lg:w-[34%]">
          <div className="relative aspect-[4/5] overflow-hidden shadow-[0_18px_40px_-18px_rgb(0_0_0/0.6)]">
            {finishes.map((f, i) => (
              <Image
                key={f.id}
                src={f.still}
                alt=""
                fill
                sizes="(min-width:1024px) 14vw, 34vw"
                className={cx("object-cover transition-opacity duration-[900ms] ease-brand", i === active ? "opacity-100" : "opacity-0")}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Words, choice and specification */}
      <div className="col-span-4 md:col-span-8 lg:order-1 lg:col-span-5">
        <h2 id="flooring-title" className="t-title">
          {products.flooring.title}
        </h2>
        <p className="t-body t-muted mt-5 max-w-[42ch]">
          Solid wood tongue-and-groove flooring in three finishes. Choose one to see the grain up close.
        </p>

        <div role="tablist" aria-labelledby="flooring-title" className="mt-9 flex flex-wrap gap-2">
          {finishes.map((f: Finish, i) => (
            <button
              key={f.id}
              id={`finish-tab-${f.id}`}
              role="tab"
              type="button"
              aria-selected={i === active}
              aria-controls="finish-panel"
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={cx(
                "flex min-h-12 flex-col items-start justify-center px-4 py-2 text-left transition-[background-color,color,box-shadow] duration-ui ease-brand",
                i === active
                  ? "bg-[var(--btn-bg)] text-[var(--btn-fg)]"
                  : "shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--outline)_55%,transparent)] [@media(hover:hover)]:hover:shadow-[inset_0_0_0_1px_var(--outline)]",
              )}
            >
              <span className="text-[0.9375rem] font-semibold">{f.name}</span>
              <span className={cx("text-[0.75rem]", i === active ? "opacity-75" : "text-[var(--muted)]")}>{f.finish}</span>
            </button>
          ))}
        </div>

        <div id="finish-panel" role="tabpanel" aria-labelledby={`finish-tab-${current.id}`} className="mt-9 border-t border-[var(--rule)]/50 pt-7">
          <SpecBlock
            key={current.id}
            items={[
              { label: "Construction", value: current.construction },
              { label: "Finishing", value: current.finishing },
              { label: "Dimensions", value: current.dimensions },
              ...(current.priceFrom ? [{ label: "Prices start from", value: current.priceFrom as string }] : []),
            ]}
          />
          <p className="t-meta mt-6">{products.flooring.pattern}</p>
        </div>
      </div>
    </div>
  );
}
