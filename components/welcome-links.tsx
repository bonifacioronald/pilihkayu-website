"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import links from "@/content/welcome-links.json";
import { whatsappUrl } from "@/lib/settings";
import { ArrowRight } from "@/components/ui/icons";

type WelcomeLink = {
  id: string;
  kind: "whatsapp" | "page";
  label: string;
  helper?: string;
  message?: string;
  href?: string;
  status: "live" | "soon";
};

const SOURCES: Record<string, string> = { instagram: "dari Instagram", qr: "dari QR katalog" };

/**
 * /welcome buttons from content/welcome-links.json. The first live WhatsApp link is the one
 * primary button; the rest are ruled rows like the catalogue's Contents page.
 */
export function WelcomeLinks() {
  const items = (links.links as WelcomeLink[]).filter(Boolean);
  const [source, setSource] = useState("dari website");

  useEffect(() => {
    const utm = new URLSearchParams(window.location.search).get("utm_source")?.toLowerCase() ?? "";
    if (SOURCES[utm]) setSource(SOURCES[utm]);
  }, []);

  const [primary, ...rest] = items;

  return (
    <div>
      {primary && primary.kind === "whatsapp" && primary.status === "live" ? (
        <div>
          <a
            href={whatsappUrl(`${primary.message ?? "Halo PilihKayu"} (${source})`)}
            target="_blank"
            rel="noopener noreferrer"
            data-track="welcome_button_click"
            data-track-button={primary.id}
            data-product="general"
            className="flex min-h-14 w-full items-center justify-between gap-4 bg-[var(--btn-bg)] px-5 text-base font-semibold tracking-[0.02em] text-[var(--btn-fg)] transition-[transform,background-color] duration-ui ease-brand motion-safe:active:scale-[0.98] [@media(hover:hover)]:hover:bg-[var(--btn-hover)]"
          >
            {primary.label}
            <ArrowRight className="size-5" />
          </a>
          {primary.helper ? <p className="mt-2 text-[0.8125rem] text-[var(--muted)]">{primary.helper}</p> : null}
        </div>
      ) : null}

      <ul className="mt-8 border-t border-[var(--rule)]/60">
        {rest.map((link) => (
          <li key={link.id} className="border-b border-[var(--rule)]/60">
            {link.status === "live" ? (
              link.kind === "whatsapp" ? (
                <a
                  href={whatsappUrl(`${link.message ?? "Halo PilihKayu"} (${source})`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="welcome_button_click"
                  data-track-button={link.id}
                  className="flex min-h-14 items-center justify-between gap-4 text-base transition-colors duration-ui ease-brand [@media(hover:hover)]:hover:text-gold"
                >
                  {link.label}
                  <ArrowRight className="size-5 text-gold" />
                </a>
              ) : (
                <Link
                  href={link.href ?? "/"}
                  data-track="welcome_button_click"
                  data-track-button={link.id}
                  className="flex min-h-14 items-center justify-between gap-4 text-base transition-colors duration-ui ease-brand [@media(hover:hover)]:hover:text-gold"
                >
                  {link.label}
                  <ArrowRight className="size-5 text-gold" />
                </Link>
              )
            ) : (
              <span aria-disabled="true" className="flex min-h-14 items-center justify-between gap-4 text-base text-[var(--muted)]">
                {link.label}
                <span className="text-[0.6875rem] font-semibold tracking-[0.2em] uppercase">Coming soon</span>
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
