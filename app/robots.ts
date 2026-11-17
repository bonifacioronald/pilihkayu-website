import type { MetadataRoute } from "next";
import { settings } from "@/lib/settings";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/styleguide"] },
    sitemap: `${settings.siteUrl}/sitemap.xml`,
  };
}
