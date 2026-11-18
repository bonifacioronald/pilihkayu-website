import { Button } from "@/components/ui/button";
import { whatsappUrl } from "@/lib/settings";

const LINES = ["Solid wood,", "made to your", "drawings"];

const drawingMask = {
  WebkitMask: "url(/drawings/interior-living.webp) center / contain no-repeat",
  mask: "url(/drawings/interior-living.webp) center / contain no-repeat",
} as React.CSSProperties;

/**
 * Home hero: title left, the interior line drawing right, each in its own columns so the
 * drawing never runs behind the text. On load the title rises line by line and the drawing
 * is unveiled left to right as if being drawn. Plays once; reduced motion shows the final frame.
 * Phone: drawing above the title, smaller.
 */
export function HomeHero() {
  return (
    <section aria-labelledby="hero-title" className="tone-espresso texture-grain relative overflow-hidden">
      <div className="container-page lg:grid lg:min-h-[calc(100dvh-var(--header-h))] lg:grid-cols-12 lg:items-center lg:gap-x-[var(--gutter)]">
        <div aria-hidden="true" className="hero-drawing pt-8 lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:pt-0">
          <div className="relative ml-auto aspect-[1100/802] w-[88%] opacity-55 lg:w-full lg:opacity-50">
            <div className="absolute inset-0 bg-gold" style={drawingMask} />
            <div className="hero-unveil absolute inset-0 bg-espresso" />
          </div>
        </div>

        <div className="relative pt-8 pb-20 lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:py-24">
          <h1 id="hero-title" className="t-display lg:[font-size:clamp(3.5rem,1.5rem+4vw,6rem)]">
            {LINES.map((line, i) => (
              <span key={line} className="hero-line">
                <span style={{ "--i": i } as React.CSSProperties}>{line}</span>
              </span>
            ))}
          </h1>
          <p className="hero-fade t-body mt-6 max-w-[38ch] text-paper/85 lg:mt-8" style={{ "--d": "650ms" } as React.CSSProperties}>
            Flooring, ceilings, doors, staircases and furniture in solid wood. Direct from our factory in Indonesia, since 1995.
          </p>
          <div className="hero-fade mt-9 flex flex-wrap items-center gap-x-8 gap-y-4 lg:mt-11" style={{ "--d": "800ms" } as React.CSSProperties}>
            <Button href={whatsappUrl("Halo PilihKayu, saya ingin konsultasi proyek (dari website)")} external>
              Discuss your project
            </Button>
            <Button variant="link" href="/factory">
              About our factory
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
