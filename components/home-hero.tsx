import { Button } from "@/components/ui/button";
import { whatsappUrl } from "@/lib/settings";

const LINES = ["Solid wood,", "made to your", "drawings"];

/**
 * Home hero. The title is set word by word: each word rises out of its own line with a slight
 * tilt that settles. The interior line drawing fills most of the section height on the right,
 * bleeding off the edge, and is sketched in by a soft sweep. The drawing stays clear of the
 * text; the section is a little shorter than the screen so the next section peeks in.
 */
export function HomeHero() {
  let w = 0;
  return (
    <section aria-labelledby="hero-title" className="tone-espresso texture-grain relative overflow-hidden">
      {/* Drawing */}
      <div
        aria-hidden="true"
        className="relative h-[46vh] max-h-[26rem] lg:absolute lg:inset-y-[4%] lg:right-[-6%] lg:left-[34%] lg:h-auto lg:max-h-none"
      >
        {/* Feathered on the text side (and softly at the foot), so drawing and words read as one scene. */}
        <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,#000_70%,transparent),linear-gradient(to_right,transparent,#000_45%)] [mask-composite:intersect] [-webkit-mask-composite:source-in] lg:[mask-image:linear-gradient(to_bottom,#000_78%,transparent),linear-gradient(to_right,transparent_2%,#000_42%)]">
          <div
            className="hero-sketch absolute inset-0 bg-gold opacity-[0.28]"
            style={{ "--art": "url(/drawings/interior-living.webp)" } as React.CSSProperties}
          />
        </div>
      </div>

      <div className="container-page relative lg:flex lg:min-h-[calc(100dvh-var(--header-h)-5rem)] lg:items-center">
        <div className="pt-4 pb-16 lg:max-w-[44%] lg:py-20">
          <h1 id="hero-title" className="t-display lg:[font-size:clamp(3.5rem,1.5rem+4vw,6rem)]">
            {LINES.map((line) => (
              <span key={line} className="hero-line">
                {line.split(" ").map((word, i, arr) => (
                  <span key={word + i}>
                    <span className="hero-word">
                      <span style={{ "--w": w++ } as React.CSSProperties}>{word}</span>
                    </span>
                    {i < arr.length - 1 ? " " : null}
                  </span>
                ))}
              </span>
            ))}
          </h1>
          <p className="hero-fade t-body mt-6 max-w-[38ch] text-paper/85 lg:mt-8" style={{ "--d": "700ms" } as React.CSSProperties}>
            Flooring, ceilings, doors, staircases and furniture in solid wood. Direct from our factory in Indonesia, since 1995.
          </p>
          <div className="hero-fade mt-9 flex flex-wrap items-center gap-x-8 gap-y-4 lg:mt-11" style={{ "--d": "850ms" } as React.CSSProperties}>
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
