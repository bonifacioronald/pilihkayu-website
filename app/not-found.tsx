import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { Container, Section } from "@/components/ui/section";
import { TitleBlock } from "@/components/ui/title-block";
import { whatsappUrl } from "@/lib/settings";

export default function NotFound() {
  return (
    <Section tone="espresso" texture="grain" spacing="none" className="flex min-h-dvh flex-col">
      <Container className="flex h-[var(--header-h)] items-center border-b border-gold/25">
        <Logo />
      </Container>
      <main id="main" className="flex flex-1 flex-col justify-center py-20">
        <Container>
          <TitleBlock
            as="h1"
            size="display"
            label="Error 404"
            title="This page doesn’t exist"
            actions={
              <>
                <Button
                  href={whatsappUrl("Halo PilihKayu, saya mencari informasi di website tapi halamannya tidak ditemukan (dari website)")}
                  external
                >
                  Ask us on WhatsApp
                </Button>
                <Button variant="link" href="/">
                  Back to the home page
                </Button>
              </>
            }
          >
            <p>The link may be old or mistyped. Tell us what you were looking for and we’ll send it to you.</p>
          </TitleBlock>
        </Container>
      </main>
    </Section>
  );
}
