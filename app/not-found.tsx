import Link from "next/link";
import { SheetFrame } from "@/components/sheet-frame";
import { WhatsAppButton } from "@/components/whatsapp-button";

export default function NotFound() {
  return (
    <div className="relative">
      <SheetFrame />
      <main className="mx-auto flex min-h-dvh max-w-2xl flex-col items-center justify-center px-8 py-24 text-center sm:px-12">
        <h1 className="font-display text-[2.375rem] leading-[1.08] tracking-[-0.01em] sm:text-6xl">
          This page doesn’t exist.
        </h1>
        <p className="mt-6 text-base sm:text-lg">Halaman tidak ditemukan (404).</p>
        <div className="mt-14">
          <WhatsAppButton
            label="Ask us on WhatsApp"
            message="Halo PilihKayu, saya mencari informasi di website tapi halamannya tidak ditemukan (dari website)"
          />
        </div>
        <Link
          href="/"
          className="mt-5 inline-flex min-h-11 items-center text-sm underline decoration-brass underline-offset-4 transition-[text-decoration-color] duration-ui ease-brand hover:decoration-ink"
        >
          Back to the home page
        </Link>
      </main>
    </div>
  );
}
