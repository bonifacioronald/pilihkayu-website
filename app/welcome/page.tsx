import type { Metadata } from "next";
import { WelcomeScreen } from "@/components/welcome-screen";

export const metadata: Metadata = {
  title: "Welcome · PilihKayu",
  description:
    "Solid wood flooring, ceilings, doors, staircases and furniture, made to your drawings. Direct from our factory in Indonesia since 1995.",
  alternates: { canonical: "/welcome" },
};

/** Instagram bio and QR landing. Replaces lnk.bio. Content: content/welcome-links.json. */
export default function WelcomePage() {
  return <WelcomeScreen />;
}
