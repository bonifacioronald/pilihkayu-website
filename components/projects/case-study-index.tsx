"use client";

import { useEffect, useState } from "react";
import { cx } from "@/lib/cx";

/**
 * Sticky section index. Desktop: a column beside the sections. Phones and tablets: a
 * sideways-scrolling strip under the header. Marks the section in view and briefly
 * highlights the section a visitor arrives at from the grid.
 */
export function CaseStudyIndex({ sections }: { sections: { id: string; title: string }[] }) {
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setCurrent(hit.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));

    const highlight = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      const el = id ? document.getElementById(id) : null;
      if (!el || !el.hasAttribute("data-cs-section")) return;
      el.removeAttribute("data-highlight");
      void el.offsetWidth;
      el.setAttribute("data-highlight", "");
      window.setTimeout(() => el.removeAttribute("data-highlight"), 1900);
    };
    highlight();
    window.addEventListener("hashchange", highlight);
    return () => {
      io.disconnect();
      window.removeEventListener("hashchange", highlight);
    };
  }, [sections]);

  return (
    <nav aria-label="Sections" className="tone-espresso sticky top-[var(--header-h)] z-20 -mx-[var(--outer)] border-b border-gold/25 lg:mx-0 lg:border-0 lg:bg-transparent lg:pt-16">
      <p className="t-label hidden lg:mb-4 lg:block">Sections</p>
      <ol className="flex gap-1 overflow-x-auto px-[var(--outer)] [scrollbar-width:none] lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0">
        {sections.map((s, i) => (
          <li key={s.id} className="shrink-0">
            <a
              href={`#${s.id}`}
              aria-current={current === s.id ? "location" : undefined}
              className={cx(
                "tabular flex min-h-11 items-center gap-3 px-2 text-[0.875rem] whitespace-nowrap transition-colors duration-ui ease-brand lg:border-l lg:px-4",
                current === s.id ? "text-paper lg:border-gold" : "text-stone lg:border-gold/25 [@media(hover:hover)]:hover:text-paper",
              )}
            >
              <span className="text-[0.75rem] text-gold">{String(i + 1).padStart(2, "0")}</span>
              {s.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
