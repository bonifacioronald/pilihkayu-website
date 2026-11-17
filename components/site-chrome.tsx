import nav from "@/content/navigation.json";
import { SiteFooter } from "@/components/ui/site-footer";
import { SiteHeader } from "@/components/ui/site-header";
import { whatsappUrl } from "@/lib/settings";

/** Header and footer around a page. Menu items come from content/navigation.json. */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader items={nav.items} cta={{ label: nav.cta.label, href: whatsappUrl(nav.cta.message), external: true }} />
      <main id="main">{children}</main>
      <SiteFooter />
    </>
  );
}
