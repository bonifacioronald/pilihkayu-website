import { Button } from "@/components/ui/button";
import { whatsappUrl } from "@/lib/settings";

const LINES = ["Solid wood,", "made to your", "drawings"];

/**
 * Home hero: the architect's drawing set comes to life. On load the title rises line by line and
 * the building perspective (catalogue p.9) is unveiled left to right as if being drawn, then the
 * paragraph and actions follow. Plays once; reduced motion shows the final frame.
 * Phone: drawing above the title. Desktop: title left, drawing bleeding off the right edge.
 */
export function HomeHero() {
  return (
    <section aria-labelledby="hero-title" className="tone-espresso texture-grid relative overflow-hidden">
      <div className="lg:grid lg:min-h-[calc(100dvh-var(--header-h))] lg:grid-cols-12 lg:items-center">
        {/* Drawing */}
        <div className="relative pt-8 lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:pt-0" aria-hidden="true">
          <div className="hero-drawing relative ml-[8%] aspect-[812/543] lg:ml-[6%] lg:w-[118%]">
            <div
              className="absolute inset-0 bg-gold"
              style={{
                WebkitMask: "url(/drawings/building-perspective.svg) center / contain no-repeat",
                mask: "url(/drawings/building-perspective.svg) center / contain no-repeat",
              }}
            />
            {/* Cover that slides away to reveal the drawing */}
            <div className="hero-unveil absolute inset-0 bg-espresso" />
          </div>
        </div>

        {/* Words */}
        <div className="container-page relative -mt-6 pb-20 lg:z-10 lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:py-24">
          <h1 id="hero-title" className="t-display">
            {LINES.map((line, i) => (
              <span key={line} className="hero-line">
                <span style={{ "--i": i } as React.CSSProperties}>{line}</span>
              </span>
            ))}
          </h1>
          <p className="hero-fade t-body mt-6 max-w-[38ch] text-paper/85 lg:mt-8" style={{ "--d": "650ms" } as React.CSSProperties}>
            Flooring, ceilings, doors, staircases and furniture in solid wood. Direct from our factory in Indonesia, since 1995.
          </p>
          <div
            className="hero-fade mt-9 flex flex-wrap items-center gap-x-8 gap-y-4 lg:mt-11"
            style={{ "--d": "800ms" } as React.CSSProperties}
          >
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
