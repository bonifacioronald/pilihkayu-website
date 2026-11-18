import data from "@/content/projects.json";

export const PROJECT_TYPES = ["Residential", "Commercial", "Furniture"] as const;
export const PRODUCTS = ["Flooring", "Ceilings", "Doors & Frames", "Staircases", "Skirting", "Furniture"] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];
export type Product = (typeof PRODUCTS)[number];

export type ImageRef = {
  src: string;
  alt: string;
  /** "Visualisation" renders get the terracotta caption box. */
  visualisation?: boolean;
  width?: number;
  height?: number;
};

export type CaseStudySection = {
  id: string;
  title: string;
  product: Product;
  species: string | null;
  construction: string | null;
  finish: string | null;
  dimensions: string | null;
  description: string | null;
  images: ImageRef[];
};

export type Slide = {
  id: string;
  stage: "Timber" | "Workshop" | "Finished piece";
  caption: string | null;
  species: string | null;
  image: ImageRef | null;
};

export type CaseStudy = {
  slug: string;
  kind: "sections" | "slideshow";
  title: string;
  client: string | null;
  projectType: ProjectType;
  location: string | null;
  year: number | null;
  status: string | null;
  scope: Product[];
  species: string[];
  sections?: CaseStudySection[];
  slides?: Slide[];
  /** Images shown before the case study page exists (home teaser). Renders first, photos later. */
  preview?: Array<ImageRef & { caption?: string }>;
  previewNote?: string;
};

export type ProjectItem = {
  id: string;
  title: string;
  product: Product;
  projectType: ProjectType;
  location: string | null;
  year: number | null;
  species: string | null;
  finish: string | null;
  description: string | null;
  image: ImageRef | null;
  caseStudy: string;
  /** Section id (sections case study) or slide id (slideshow case study). */
  target: string;
};

export const caseStudies = data.caseStudies as CaseStudy[];
export const projectItems = data.items as ProjectItem[];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

/** Every grid item opens its case study at its own section or slide. */
export function itemHref(item: ProjectItem) {
  const study = getCaseStudy(item.caseStudy);
  const anchor = study?.kind === "slideshow" ? `slide-${item.target}` : item.target;
  return `/projects/${item.caseStudy}#${anchor}`;
}

/** Filter options that have at least one item. Empty filters stay hidden. */
export function availableFilters(items: ProjectItem[]) {
  return {
    projectTypes: PROJECT_TYPES.filter((t) => items.some((i) => i.projectType === t)),
    products: PRODUCTS.filter((p) => items.some((i) => i.product === p)),
  };
}

export function metaLine(parts: Array<string | number | null | undefined>) {
  return parts.filter((p) => p !== null && p !== undefined && p !== "").join(" · ");
}
