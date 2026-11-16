import type { Metadata, Viewport } from "next";
import { Analytics } from "@/components/analytics";
import { settings } from "@/lib/settings";
import { body, display } from "./fonts";
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
  themeColor: "#2b1a12",
  viewportFit: "cover",
};

/** Marks the page as scripted before paint, so reveal animations never hide content without JS. */
const jsFlag = "document.documentElement.classList.add('js')";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
      </head>
      <body className="font-sans antialiased">
        <div className="site">{children}</div>
        <Analytics />
      </body>
    </html>
  );
}
