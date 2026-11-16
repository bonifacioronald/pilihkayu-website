import Image from "next/image";
import Link from "next/link";
import { cx } from "@/lib/cx";

/** Mark + wordmark lockup. "paper" on dark grounds, "espresso" on paper. */
export function Logo({
  tone = "paper",
  href = "/",
  className,
}: {
  tone?: "paper" | "espresso";
  href?: string;
  className?: string;
}) {
  return (
    <Link href={href} className={cx("inline-flex items-center gap-3", className)} aria-label="PilihKayu Indonesia, home">
      <Image src={`/brand/mark-${tone}.png`} alt="" width={345} height={360} sizes="36px" className="h-8 w-auto lg:h-9" priority />
      <Image src={`/brand/wordmark-${tone}.png`} alt="" width={1154} height={240} sizes="120px" className="h-[22px] w-auto lg:h-6" priority />
    </Link>
  );
}
