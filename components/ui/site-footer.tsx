import Link from "next/link";
import nav from "@/content/navigation.json";
import { settings, whatsappUrl } from "@/lib/settings";
import { GoldRule } from "./section";
import { Instagram, Mail, Phone } from "./icons";
import { CertificationMarks } from "./certification-marks";
import { Logo } from "./logo";

/** Footer: contact, certification marks, legal note from the catalogue. */
export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="tone-espresso texture-grain border-t border-gold/25">
      <div className="container-page grid-page gap-y-12 py-16 lg:py-24">
        <div className="col-span-4 md:col-span-8 lg:col-span-4">
          <Logo />
          <p className="t-tagline mt-6">bringing your designs to life</p>
          <nav aria-label="Footer" className="mt-8">
            <ul className="flex flex-wrap gap-x-6">
              {nav.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-11 items-center text-base underline decoration-transparent underline-offset-[6px] transition-[text-decoration-color] duration-ui ease-brand [@media(hover:hover)]:hover:decoration-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-2 flex flex-wrap gap-x-6">
              {nav.secondary.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="t-meta inline-flex min-h-11 items-center [@media(hover:hover)]:hover:text-paper">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="col-span-4 md:col-span-4 lg:col-span-4 lg:col-start-6">
          <p className="t-label mb-5">Contact</p>
          <ul className="space-y-1 text-base">
            <li>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="tabular inline-flex min-h-11 items-center gap-3">
                <Phone className="size-5 text-gold" />
                {settings.whatsapp.display}
              </a>
            </li>
            <li>
              <a href={settings.instagram.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-3">
                <Instagram className="size-5 text-gold" />
                <span translate="no">{settings.instagram.handle}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${settings.email}`} className="inline-flex min-h-11 items-center gap-3 break-all">
                <Mail className="size-5 shrink-0 text-gold" />
                {settings.email}
              </a>
            </li>
          </ul>
        </div>

        <div className="col-span-4 md:col-span-4 lg:col-span-3">
          <p className="t-label mb-5">Certified</p>
          <CertificationMarks />
        </div>

        <div className="col-span-4 md:col-span-8 lg:col-span-12">
          <GoldRule />
          <p className="t-meta mt-6 max-w-[62ch]">
            © {year} PilihKayu. Wood grain, colour and texture vary naturally, and actual finishes may differ from
            digital samples. Project visualisations are labelled accordingly. Materials, specifications, availability and
            pricing are subject to confirmation. Final scope and lead times are agreed in your project quotation.
          </p>
        </div>
      </div>
    </footer>
  );
}
