import { LineDrawing } from "@/components/ui/line-drawing";

/** Deterministic wobble so server and client render the same rings. */
function ring(r: number, seed: number, cx = 200, cy = 200) {
  const pts: string[] = [];
  const n = 72;
  for (let i = 0; i <= n; i++) {
    const t = (i / n) * Math.PI * 2;
    const wobble =
      1 + 0.035 * Math.sin(3 * t + seed) + 0.02 * Math.sin(7 * t + seed * 1.7) + 0.012 * Math.sin(13 * t + seed * 0.3);
    const x = cx + r * wobble * Math.cos(t) + seed * 0.15;
    const y = cy + r * wobble * Math.sin(t) * 0.97;
    pts.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return pts.join(" ") + " Z";
}

/** Tree-ring cross-section (catalogue p.2), as clean concentric line work. */
export function TreeRings({ className, title }: { className?: string; title?: string }) {
  const radii = [10, 22, 33, 47, 58, 72, 85, 101, 114, 128, 141, 156, 168, 181];
  return (
    <LineDrawing viewBox="0 0 400 400" stroke={0.9} stagger={45} className={className} title={title}>
      {radii.map((r, i) => (
        <path key={r} d={ring(r, i * 1.3)} />
      ))}
      <path d="M200 200 L214 132 M200 200 L262 238 M200 200 L171 281" />
    </LineDrawing>
  );
}
