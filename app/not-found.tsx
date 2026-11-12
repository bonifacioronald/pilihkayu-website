import Link from "next/link";
import { WhatsAppButton } from "@/components/whatsapp-button";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-xl flex-col items-center justify-center px-6 py-16 text-center">
      <h1 className="text-2xl leading-snug font-medium">This page doesn’t exist.</h1>
      <p className="mt-3 text-base text-ink-soft">Halaman tidak ditemukan (404).</p>
      <div className="mt-10">
        <WhatsAppButton
          label="Ask us on WhatsApp"
          message="Halo PilihKayu, saya mencari informasi di website tapi halamannya tidak ditemukan (dari website)"
        />
      </div>
      <Link
        href="/"
        className="mt-6 inline-flex min-h-11 items-center text-sm text-ink underline decoration-brass underline-offset-4 transition-[text-decoration-color] duration-ui ease-brand hover:decoration-ink"
      >
        Back to the home page
      </Link>
    </main>
  );
}
