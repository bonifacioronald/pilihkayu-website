import Image from "next/image";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { settings } from "@/lib/settings";
import logo from "@/public/brand/logo-stacked-dark.png";

export default function HoldingPage() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-xl flex-col items-center justify-center px-6 py-16 text-center">
      <Image
        src={logo}
        alt="PilihKayu Indonesia"
        priority
        sizes="(min-width: 640px) 240px, 192px"
        className="h-auto w-48 sm:w-60"
      />

      <hr className="mt-12 w-12 border-t border-brass" />

      <h1 className="mt-10 text-xl leading-snug font-medium sm:text-2xl">
        Solid wood flooring, ceilings, doors and stairs, made to your drawings.
      </h1>
      <p className="mt-3 text-base text-ink-soft">Direct from our factory, since 1995.</p>

      <p className="mt-10 text-base">Our full website is coming soon. Until then, talk to us directly.</p>

      <div className="mt-6">
        <WhatsAppButton hint="Tanya harga atau konsultasi proyek lewat WhatsApp" />
      </div>

      <a
        href={settings.instagram.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex min-h-11 items-center text-sm text-ink underline decoration-brass underline-offset-4 transition-[text-decoration-color] duration-ui ease-brand hover:decoration-ink"
      >
        <span translate="no">@{settings.instagram.handle}</span> on Instagram
      </a>
    </main>
  );
}
