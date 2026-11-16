import { LineDrawing } from "@/components/ui/line-drawing";
import { DimensionLine } from "@/components/ui/dimension-line";

/** Uni Joint: one solid length per board (catalogue p.6). */
export function UniJointDiagram({ className }: { className?: string }) {
  return (
    <figure className={className}>
      <figcaption className="t-meta mb-3">Uni Joint construction</figcaption>
      <div className="flex items-stretch gap-2">
        <LineDrawing viewBox="0 0 600 44" stroke={1.2} className="flex-1" title="Uni Joint board: single lengths joined end to end">
          <rect x={1} y={1} width={598} height={42} />
          <path d="M120 1 V43 M298 1 V43 M452 1 V43" />
        </LineDrawing>
        <span className="t-meta self-center">W</span>
      </div>
      <DimensionLine label="L: <1800 mm" className="mt-1 pr-6" />
    </figure>
  );
}

/** FJL 2P: finger-jointed laminated, two staggered pieces per width. */
export function FjlDiagram({ className }: { className?: string }) {
  return (
    <figure className={className}>
      <figcaption className="t-meta mb-3">FJL 2P construction</figcaption>
      <div className="flex items-stretch gap-2">
        <LineDrawing viewBox="0 0 600 44" stroke={1.2} className="flex-1" title="FJL 2P board: two laminated strips with staggered finger joints">
          <rect x={1} y={1} width={598} height={42} />
          <path d="M1 22 H599" />
          <path d="M90 1 V22 M250 1 V22 M410 1 V22 M540 1 V22" />
          <path d="M170 22 V43 M330 22 V43 M480 22 V43" />
        </LineDrawing>
        <span className="t-meta self-center">W</span>
      </div>
      <DimensionLine label="L: <1800 mm" className="mt-1 pr-6" />
    </figure>
  );
}
