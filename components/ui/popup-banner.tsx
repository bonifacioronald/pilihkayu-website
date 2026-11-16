"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { whatsappUrl } from "@/lib/settings";
import { cx } from "@/lib/cx";
import { Close } from "./icons";

const KEY = "pk-banner-dismissed-until";
const WEEK = 7 * 24 * 60 * 60 * 1000;
const NEVER_ON = ["/catalogue", "/welcome"];

function dismissedRecently() {
  try {
    return Number(localStorage.getItem(KEY) ?? 0) > Date.now();
  } catch {
    return false;
  }
}

/**
 * Small bottom banner: after 20 s or half a page of scrolling, once. Closing hides it for
 * 7 days. Never on /catalogue or /welcome. "demo" mode only opens from the style guide button.
 */
export function PopupBanner({ mode = "auto" }: { mode?: "auto" | "demo" }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  const show = useCallback(() => {
    setOpen(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
  }, []);

  useEffect(() => {
    if (mode !== "auto") return;
    if (NEVER_ON.some((p) => pathname?.startsWith(p)) || dismissedRecently()) return;
    let fired = false;
    const fire = () => {
      if (fired) return;
      fired = true;
      show();
      cleanup();
    };
    const timer = window.setTimeout(fire, 20000);
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max >= 0.5) fire();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    function cleanup() {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    }
    return cleanup;
  }, [mode, pathname, show]);

  useEffect(() => {
    if (mode !== "demo") return;
    const onDemo = () => show();
    window.addEventListener("pk:show-banner", onDemo);
    return () => window.removeEventListener("pk:show-banner", onDemo);
  }, [mode, show]);

  function dismiss() {
    setVisible(false);
    try {
      localStorage.setItem(KEY, String(Date.now() + WEEK));
    } catch {}
    window.setTimeout(() => setOpen(false), 200);
  }

  if (!open) return null;
  return (
    <aside
      aria-label="Price list"
      className={cx(
        "tone-espresso fixed inset-x-0 bottom-0 z-30 border-t border-gold pb-[env(safe-area-inset-bottom)] transition-[opacity,transform] ease-brand lg:right-[var(--outer)] lg:bottom-6 lg:left-auto lg:w-[26rem] lg:border lg:border-gold/60",
        visible ? "translate-y-0 opacity-100 duration-overlay" : "translate-y-4 opacity-0 duration-200 motion-reduce:translate-y-0",
      )}
    >
      <div className="flex items-start gap-4 py-5 pr-3 pl-[var(--outer)] lg:pl-6">
        <div className="min-w-0 flex-1">
          <p className="t-heading">Get the latest price list</p>
          <p className="t-muted mt-1 text-[0.9375rem]">Specifications and start-from prices, sent on WhatsApp.</p>
          <a
            href={whatsappUrl("Halo PilihKayu, saya ingin minta daftar harga terbaru (dari website)")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex min-h-11 items-center bg-paper px-5 text-[0.9375rem] font-semibold tracking-[0.04em] text-espresso transition-transform duration-ui ease-brand motion-safe:active:scale-[0.97]"
          >
            Ask on WhatsApp
          </a>
        </div>
        <button type="button" onClick={dismiss} aria-label="Close" className="inline-flex size-11 shrink-0 items-center justify-center text-paper">
          <Close className="size-5" />
        </button>
      </div>
    </aside>
  );
}
