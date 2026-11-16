"use client";

import { useEffect, useMemo, useState } from "react";
import { cx } from "@/lib/cx";
import { availableFilters, itemHref, type ProjectItem } from "@/lib/projects";
import { ProjectCard } from "./project-card";

/**
 * "WORKS (n)" title with a superscript count, a plain Filter toggle (moodboard 03),
 * and the card grid. Filters with no items stay hidden. Filters sync to ?type=&product=.
 */
export function ProjectsGrid({
  items,
  title = "Works",
  linkMode = "page",
  syncUrl = true,
  headingLevel = "h1",
}: {
  items: ProjectItem[];
  title?: string;
  /** "page": the case-study page (live site). "anchor": a section on the same page (style guide). */
  linkMode?: "page" | "anchor";
  syncUrl?: boolean;
  headingLevel?: "h1" | "h2";
}) {
  const filters = useMemo(() => availableFilters(items), [items]);
  const [type, setType] = useState<string | null>(null);
  const [product, setProduct] = useState<string | null>(null);
  const [panel, setPanel] = useState(false);

  useEffect(() => {
    if (!syncUrl) return;
    const q = new URLSearchParams(window.location.search);
    setType(q.get("type"));
    setProduct(q.get("product"));
  }, [syncUrl]);

  useEffect(() => {
    if (!syncUrl) return;
    const q = new URLSearchParams(window.location.search);
    if (type) q.set("type", type);
    else q.delete("type");
    if (product) q.set("product", product);
    else q.delete("product");
    const qs = q.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${qs ? `?${qs}` : ""}${window.location.hash}`);
  }, [type, product, syncUrl]);

  const shown = items.filter((i) => (!type || i.projectType === type) && (!product || i.product === product));
  const Heading = headingLevel;
  const active = [type, product].filter(Boolean).join(" · ");

  const chip = (selected: boolean) =>
    cx(
      "inline-flex min-h-11 items-center px-4 text-[0.875rem] transition-[background-color,color,box-shadow] duration-ui ease-brand",
      selected
        ? "bg-[var(--btn-bg)] text-[var(--btn-fg)]"
        : "shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--outline)_60%,transparent)] [@media(hover:hover)]:hover:shadow-[inset_0_0_0_1px_var(--outline)]",
    );

  return (
    <div>
      <div className="grid-page items-end gap-y-6">
        <Heading className="t-display col-span-4 md:col-span-6 lg:col-span-8">
          {title}
          <sup className="tabular ml-2 align-super font-sans text-[0.9375rem] font-normal tracking-normal lg:text-[1.125rem]">
            ({shown.length})
          </sup>
        </Heading>
        <div className="col-span-4 flex items-center justify-between gap-4 md:col-span-2 md:flex-col md:items-end lg:col-span-4">
          <button
            type="button"
            onClick={() => setPanel((p) => !p)}
            aria-expanded={panel}
            aria-controls="project-filters"
            className="inline-flex min-h-11 items-center text-[0.8125rem] font-semibold tracking-[0.2em] uppercase underline decoration-[var(--rule)] underline-offset-[8px]"
          >
            Filter
          </button>
          {active ? <p className="t-meta text-right">{active}</p> : null}
        </div>
      </div>

      <div id="project-filters" hidden={!panel} className="mt-8 space-y-6 border-t border-[var(--rule)] pt-6">
        {filters.projectTypes.length > 1 || type ? (
          <fieldset>
            <legend className="t-label mb-3">Project type</legend>
            <div className="flex flex-wrap gap-2">
              <button type="button" aria-pressed={!type} onClick={() => setType(null)} className={chip(!type)}>
                All
              </button>
              {filters.projectTypes.map((t) => (
                <button key={t} type="button" aria-pressed={type === t} onClick={() => setType(type === t ? null : t)} className={chip(type === t)}>
                  {t}
                </button>
              ))}
            </div>
          </fieldset>
        ) : null}
        <fieldset>
          <legend className="t-label mb-3">Product</legend>
          <div className="flex flex-wrap gap-2">
            <button type="button" aria-pressed={!product} onClick={() => setProduct(null)} className={chip(!product)}>
              All
            </button>
            {filters.products.map((p) => (
              <button key={p} type="button" aria-pressed={product === p} onClick={() => setProduct(product === p ? null : p)} className={chip(product === p)}>
                {p}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <p className="sr-only" aria-live="polite">
        {shown.length} {shown.length === 1 ? "work" : "works"} shown
      </p>
      <ul className="mt-12 grid gap-x-[var(--gutter)] gap-y-14 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
        {shown.map((item) => (
          <li key={item.id}>
            <ProjectCard item={item} href={linkMode === "anchor" ? `#${item.target}` : itemHref(item)} />
          </li>
        ))}
      </ul>
    </div>
  );
}
