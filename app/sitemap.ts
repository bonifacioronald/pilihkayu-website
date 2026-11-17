import type { MetadataRoute } from "next";
import { settings } from "@/lib/settings";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/factory", "/welcome"];
  return pages.map((path) => ({
    url: `${settings.siteUrl}${path === "/" ? "" : path}`,
    lastModified: new Date(),
  }));
}
