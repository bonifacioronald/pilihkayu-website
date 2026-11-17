import Image from "next/image";
import { cx } from "@/lib/cx";

const marks = [
  { id: "svlk", name: "SVLK Indonesia", w: 268, size: "h-10 lg:h-12" },
  // FSC is tall and narrow: shown larger so its small print stays legible.
  { id: "fsc", name: "FSC", w: 110, size: "h-16 lg:h-[4.5rem]" },
  { id: "jas", name: "JAS", w: 307, size: "h-10 lg:h-12" },
] as const;

/** SVLK, FSC and JAS marks, single-colour for the ground they sit on. Logos only: never show certificate numbers. */
export function CertificationMarks({
  tone = "paper",
  className,
}: {
  tone?: "paper" | "espresso";
  className?: string;
}) {
  return (
    <ul className={cx("flex flex-wrap items-center gap-x-8 gap-y-6", className)}>
      {marks.map((m) => (
        <li key={m.id}>
          <Image
            src={`/certifications/${m.id}-${tone}.png`}
            alt={`${m.name} certification mark`}
            width={m.w}
            height={160}
            sizes="80px"
            className={`${m.size} w-auto`}
          />
        </li>
      ))}
    </ul>
  );
}
