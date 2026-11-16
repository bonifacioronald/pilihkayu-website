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
          <p className="t-meta mt-6 max-w-[72ch]">
            © {year} PilihKayu. Wood grain, colour and texture vary naturally, and actual finishes may differ from
            digital samples. Project visualisations are labelled accordingly. Materials, specifications, availability and
            pricing are subject to confirmation. Final scope and lead times are agreed in your project quotation.
          </p>
        </div>
      </div>
    </footer>
  );
}
