import { Button } from "@/components/ui/button";
import { VideoLoop } from "@/components/ui/video-loop";
import { whatsappUrl } from "@/lib/settings";

const LINES = ["Solid wood,", "made to your", "drawings"];

const drawingMask = {
  WebkitMask: "url(/drawings/interior-living.webp) center / contain no-repeat",
  mask: "url(/drawings/interior-living.webp) center / contain no-repeat",
} as React.CSSProperties;

/**
 * Home hero: the drawing becomes reality. On load the title rises line by line, the interior
 * line drawing is unveiled in gold behind a tall frame, and the frame fades up with real hands
 * at work in the factory. Plays once; reduced motion shows the final frame without video.
 * Phone: film first, title below. Desktop: title left, film and drawing right.
 */
export function HomeHero() {
  return (
    <section aria-labelledby="hero-title" className="tone-espresso texture-grain relative overflow-hidden">
      <div className="lg:grid lg:min-h-[calc(100dvh-var(--header-h))] lg:grid-cols-12 lg:items-center">
        {/* Visual: drawing behind, film in front */}
        <div className="relative pt-6 lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:py-14">
          <div aria-hidden="true" className="hero-drawing absolute top-[4%] -left-[6%] w-[92%] opacity-60 lg:opacity-45 lg:top-[10%] lg:-left-[38%] lg:w-[118%]">
            <div className="relative aspect-[1100/802]">
              <div className="absolute inset-0 bg-gold" style={drawingMask} />
              <div className="hero-unveil absolute inset-0 bg-espresso" />
            </div>
          </div>
          <div
            className="hero-rise relative mr-[var(--outer)] ml-auto aspect-[4/5] w-[68%] md:w-[48%] lg:mr-[12%] lg:aspect-[9/16] lg:w-[min(56%,calc((100dvh-var(--header-h)-7rem)*0.5625))]"
            
          >
            <VideoLoop
              src="/media/hero-hands.mp4"
              poster="/media/hero-hands-poster.jpg"
              alt="Craftspeople sanding and finishing solid wood by hand in the PilihKayu factory"
              ratio="auto"
              priority
              sizes="(min-width:1024px) 22rem, 68vw"
              className="h-full w-full"
            />
          </div>
        </div>

        {/* Words */}
        <div className="container-page relative z-10 pt-8 pb-20 lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:py-24">
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
