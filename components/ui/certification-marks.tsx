import Image from "next/image";
import { cx } from "@/lib/cx";

const marks = [
  { id: "svlk", name: "SVLK Indonesia", code: "SVLK 00055", w: 268, size: "h-10 lg:h-12" },
  // FSC is tall and narrow: shown larger so its small print stays legible.
  { id: "fsc", name: "FSC", code: "FSC® COC-005695", w: 110, size: "h-16 lg:h-[4.5rem]" },
  { id: "jas", name: "JAS", code: "JAS", w: 307, size: "h-10 lg:h-12" },
] as const;

/** SVLK, FSC and JAS marks with their codes, single-colour for the ground they sit on. */
export function CertificationMarks({
  tone = "paper",
  showCodes = true,
  className,
}: {
  tone?: "paper" | "espresso";
  showCodes?: boolean;
  className?: string;
}) {
  return (
    <ul className={cx("flex flex-wrap items-end gap-x-8 gap-y-6", className)}>
      {marks.map((m) => (
        <li key={m.id} className="flex flex-col items-start gap-2">
          <Image
            src={`/certifications/${m.id}-${tone}.png`}
            alt={`${m.name} certification mark`}
            width={m.w}
            height={160}
            sizes="80px"
            className={`${m.size} w-auto`}
          />
          {showCodes ? <span className="t-meta tabular">{m.code}</span> : null}
        </li>
      ))}
    </ul>
  );
}
