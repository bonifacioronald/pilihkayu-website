import type { Metadata, Viewport } from "next";
import { body, display } from "./fonts";
import { settings } from "@/lib/settings";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(settings.siteUrl),
  title: "PilihKayu · Solid wood, direct from our factory",
  description:
    "Solid wood flooring, ceilings, doors and stairs, made to your drawings. Direct from our factory, since 1995.",
  openGraph: {
    title: "PilihKayu",
    description:
      "Solid wood flooring, ceilings, doors and stairs, made to your drawings. Direct from our factory, since 1995.",
    url: settings.siteUrl,
    siteName: "PilihKayu",
    locale: "en_US",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f4ede3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable}`}>
      <body className="sheet font-sans text-ink antialiased">{children}</body>
    </html>
  );
}
