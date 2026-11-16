import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { Container, Section } from "@/components/ui/section";
import { TitleBlock } from "@/components/ui/title-block";
import { settings, whatsappUrl } from "@/lib/settings";

/** Holding page until the full site launches. */
export default function HoldingPage() {
  return (
    <Section tone="espresso" texture="grain" spacing="none" className="flex min-h-dvh flex-col">
      <Container className="flex h-[var(--header-h)] items-center border-b border-gold/25">
        <Logo />
      </Container>
      <main id="main" className="flex flex-1 flex-col justify-center py-20 lg:py-28">
        <Container>
          <TitleBlock
            as="h1"
            size="display"
            title="Solid wood, made to your drawings"
            tagline="direct from our factory, since 1995"
            actions={
              <>
                <Button href={whatsappUrl()} external helper="Chat lewat WhatsApp">
                  Discuss your project
                </Button>
                <Button variant="link" href={settings.instagram.url} external>
                  <span>
                    Follow <span translate="no">@{settings.instagram.handle}</span>
                  </span>
                </Button>
              </>
            }
          >
            <p>
              Flooring, ceilings, doors, frames, staircases and furniture in solid wood. Our full website is coming soon;
              until then, talk to us directly.
            </p>
          </TitleBlock>
        </Container>
      </main>
      <Container className="border-t border-gold/25 py-6">
        <p className="t-break">Full website coming soon</p>
      </Container>
    </Section>
  );
}
