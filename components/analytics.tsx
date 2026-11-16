"use client";

import Script from "next/script";
import { useEffect } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { track } from "@/lib/analytics";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const IS_PRODUCTION = process.env.NEXT_PUBLIC_VERCEL_ENV === "production";

/**
 * Google Analytics 4 + Vercel Speed Insights, and one click listener for all events:
 * - any WhatsApp link → whatsapp_click (page, product from data-product)
 * - any element with data-track="event_name" → that event, with data-track-* as params
 * GA loads on the production site only, so previews never pollute the numbers.
 */
export function Analytics() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("a, button, [data-track]");
      if (!el) return;
      const page = window.location.pathname;
      const href = el.getAttribute("href") ?? "";
      if (href.includes("wa.me/")) {
        track("whatsapp_click", { page, product: el.dataset.product ?? "general" });
      }
      const name = el.dataset.track;
      if (name) {
        const params: Record<string, string> = { page };
        for (const [k, v] of Object.entries(el.dataset)) {
          if (k.startsWith("track") && k !== "track" && v) params[k.slice(5).toLowerCase()] = v;
        }
        track(name, params);
      }
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return (
    <>
      {GA_ID && IS_PRODUCTION ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}');`}
          </Script>
        </>
      ) : null}
      <SpeedInsights />
    </>
  );
}
