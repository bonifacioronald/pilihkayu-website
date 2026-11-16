"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { cx } from "@/lib/cx";
import { Logo } from "./logo";
import { Close, Menu } from "./icons";

export type NavItem = { label: string; href: string };

/**
 * Sticky header. Desktop: logo left, links and one secondary call to action right.
 * Phones and tablets: a "Menu" button opens a full-screen overlay (300 ms in, 200 ms out).
 */
export function SiteHeader({
  items,
  cta,
  homeHref = "/",
}: {
  items: NavItem[];
  cta?: { label: string; href: string; external?: boolean };
  homeHref?: string;
}) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setVisible(false);
    window.setTimeout(() => {
      setOpen(false);
      buttonRef.current?.focus();
    }, 200);
  }, []);

  useEffect(() => {
    if (!open) return;
    const raf = requestAnimationFrame(() => setVisible(true));
    document.documentElement.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab" && panelRef.current) {
        const f = panelRef.current.querySelectorAll<HTMLElement>("a, button");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const linkClass =
    "inline-flex min-h-11 items-center text-[0.75rem] font-semibold tracking-[0.2em] uppercase text-paper underline decoration-transparent underline-offset-[10px] transition-[text-decoration-color] duration-ui ease-brand [@media(hover:hover)]:hover:decoration-gold";

  return (
    <header className="tone-espresso sticky top-0 z-40 border-b border-gold/25">
      <a
        href="#main"
        className="sr-only z-50 bg-paper px-4 py-3 text-[0.9375rem] font-semibold text-espresso focus:not-sr-only focus:absolute focus:top-2 focus:left-2"
      >
        Skip to content
      </a>
      <div className="container-page flex h-[var(--header-h)] items-center justify-between gap-6">
        <Logo href={homeHref} />
        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {items.map((item) => (
            <Link key={item.href} href={item.href} className={linkClass}>
              {item.label}
            </Link>
          ))}
          {cta ? (
            <a
              href={cta.href}
              {...(cta.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="inline-flex min-h-11 items-center px-5 text-[0.8125rem] font-semibold tracking-[0.04em] text-paper shadow-[inset_0_0_0_1px_var(--color-gold)] transition-[transform,box-shadow] duration-ui ease-brand motion-safe:active:scale-[0.97] [@media(hover:hover)]:hover:shadow-[inset_0_0_0_2px_var(--color-gold)]"
            >
              {cta.label}
            </a>
          ) : null}
        </nav>
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="site-menu"
          className="-mr-2 inline-flex min-h-11 items-center gap-2 px-2 text-[0.75rem] font-semibold tracking-[0.2em] text-paper uppercase lg:hidden"
        >
          Menu
          <Menu className="size-5" />
        </button>
      </div>

      {open ? (
        <div
          id="site-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className={cx(
            "tone-espresso texture-grain fixed inset-0 z-50 flex flex-col overflow-y-auto overscroll-contain pb-[env(safe-area-inset-bottom)] transition-[opacity,transform] ease-brand lg:hidden",
            visible ? "translate-y-0 opacity-100 duration-overlay" : "-translate-y-2 opacity-0 duration-200 motion-reduce:translate-y-0",
          )}
        >
          <div className="container-page flex h-[var(--header-h)] shrink-0 items-center justify-between border-b border-gold/25">
            <Logo href={homeHref} />
            <button
              type="button"
              onClick={close}
              className="-mr-2 inline-flex min-h-11 items-center gap-2 px-2 text-[0.75rem] font-semibold tracking-[0.2em] text-paper uppercase"
            >
              Close
              <Close className="size-5" />
            </button>
          </div>
          <nav aria-label="Main" className="container-page flex flex-1 flex-col justify-center gap-1 py-10">
            {items.map((item) => (
              <Link key={item.href} href={item.href} onClick={close} className="t-content block py-2 text-paper">
                {item.label}
              </Link>
            ))}
          </nav>
          {cta ? (
            <div className="container-page pb-10">
              <a
                href={cta.href}
                {...(cta.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex min-h-12 w-full items-center justify-center bg-paper px-6 text-[0.9375rem] font-semibold tracking-[0.04em] text-espresso motion-safe:active:scale-[0.97]"
              >
                {cta.label}
              </a>
              <p className="mt-2 text-center text-[0.8125rem] text-stone">Chat lewat WhatsApp</p>
            </div>
          ) : null}
        </div>
      ) : null}
    </header>
  );
}
