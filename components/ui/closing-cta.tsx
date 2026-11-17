import { settings, whatsappUrl } from "@/lib/settings";
import { Button } from "./button";
import { Instagram, Mail, Phone } from "./icons";
import { Container, GoldRule, Section } from "./section";
import { TitleBlock } from "./title-block";

/** Deep-red closing block (catalogue p.14). One per page, at the end. */
export function ClosingCta({
  message = settings.whatsapp.defaultMessage,
  id,
}: {
  message?: string;
  id?: string;
}) {
  return (
    <Section tone="oxblood" id={id} aria-labelledby={id ? `${id}-title` : undefined}>
      <Container>
        <TitleBlock
          id={id ? `${id}-title` : undefined}
          title="Let’s discuss your next project"
          actions={
            <Button href={whatsappUrl(message)} external>
              Discuss your project
            </Button>
          }
        >
          <p>Contact our team to discuss your project or request the latest specifications and price list.</p>
        </TitleBlock>
        <div className="grid-page mt-16 lg:mt-24">
          <ul className="col-span-4 space-y-1 md:col-span-4 lg:col-span-4">
            <li className="tabular flex min-h-11 items-center gap-4">
              <Phone className="size-6 text-gold" />
              {settings.whatsapp.display}
            </li>
            <li className="flex min-h-11 items-center gap-4">
              <Instagram className="size-6 text-gold" />
              <span translate="no">{settings.instagram.handle}</span>
            </li>
            <li className="flex min-h-11 items-center gap-4 break-all">
              <Mail className="size-6 shrink-0 text-gold" />
              {settings.email}
            </li>
          </ul>
          <div className="col-span-4 mt-10 md:col-span-4 md:mt-0 lg:col-span-4 lg:col-start-6">
            <GoldRule short />
            <h3 className="t-heading mt-6 max-w-[28ch] text-balance">Exclusive benefits for contractors &amp; architects</h3>
            <p className="t-muted mt-2 text-base leading-relaxed">
              Access project pricing, material samples, dedicated coordination and repeat-order support. Contact us to
              discuss partnership terms that bring greater value to your projects.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
