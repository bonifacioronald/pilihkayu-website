import Image from "next/image";
import { SheetFrame } from "@/components/sheet-frame";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { settings } from "@/lib/settings";
import logo from "@/public/brand/logo-stacked-dark.png";

export default function HoldingPage() {
  return (
    <div className="relative">
      <SheetFrame />
      <main className="mx-auto flex min-h-dvh max-w-2xl flex-col items-center px-8 pt-16 pb-14 text-center sm:px-12 sm:pt-28 sm:pb-36">
        <Image
          src={logo}
          alt="PilihKayu Indonesia"
          priority
          sizes="(min-width: 640px) 176px, 144px"
          className="h-auto w-36 sm:w-44"
        />

        <div className="flex flex-1 flex-col items-center justify-center py-16 sm:py-24">
          <h1 className="font-display text-[2.375rem] leading-[1.08] tracking-[-0.01em] sm:text-6xl">
            Solid wood flooring, ceilings, doors and stairs, made to your drawings.
          </h1>
          <p className="mt-6 text-base sm:text-lg">Direct from our factory, since 1995.</p>

          <div className="mt-14 sm:mt-16">
            <WhatsAppButton hint="Tanya harga atau konsultasi proyek lewat WhatsApp" />
          </div>

          <a
            href={settings.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex min-h-11 items-center text-sm underline decoration-brass underline-offset-4 transition-[text-decoration-color] duration-ui ease-brand hover:decoration-ink"
          >
            <span>
              Follow <span translate="no">@{settings.instagram.handle}</span> on Instagram
            </span>
          </a>
        </div>

        <p className="font-display text-xs tracking-[0.3em] uppercase">Full website coming soon</p>
      </main>
    </div>
  );
}
