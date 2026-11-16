import { LineDrawing } from "@/components/ui/line-drawing";

/**
 * Room section for the home hero: tongue-and-groove floor, lumber ceiling battens,
 * a door and frame, and a staircase. Swap for the traced hero render when it exists.
 */
export function RoomSection({ className, title }: { className?: string; title?: string }) {
  const battens = Array.from({ length: 34 }, (_, i) => 48 + i * 21);
  const boards = [40, 148, 236, 352, 448, 540, 652, 760];
  return (
    <LineDrawing viewBox="0 0 800 520" stroke={1} stagger={18} className={className} title={title}>
      {/* Shell */}
      <path d="M40 60 H760 M40 440 H760 M40 60 V440" />
      {/* Ceiling battens under the slab */}
      <path d="M40 74 H760" />
      {battens.map((x) => (
        <rect key={x} x={x} y={74} width={12} height={16} />
      ))}
      {/* Floor boards with tongue-and-groove joints */}
      <path d="M40 452 H760 M40 440 V470 M760 440 V470 M40 470 H760" />
      {boards.slice(1, -1).map((x) => (
        <path key={x} d={`M${x} 440 V444 H${x + 6} V448 H${x} V452`} />
      ))}
      {/* Door and frame */}
      <path d="M96 440 V196 H204 V440 M106 440 V206 H194 V440" />
      <path d="M176 318 H186" />
      {/* Staircase: 8 steps, rise 28, going 28; stringer parallel to the nosing line */}
      <path d={`M480 440 ${Array.from({ length: 8 }, () => "v-28 h28").join(" ")} H760`} />
      <path d="M520 440 L760 200" />
      {/* Handrail 70 above the nosing line, with three posts */}
      <path d="M486 336 L716 106" />
      {[0, 4, 7].map((k) => {
        const x = 480 + 28 * k + 14;
        const tread = 440 - 28 * (k + 1);
        const rail = 342 - (x - 480);
        return <path key={k} d={`M${x} ${tread} V${rail}`} />;
      })}
      {/* Dimension marks */}
      <path d="M40 496 H760 M40 488 V504 M760 488 V504" />
      <path d="M20 60 V440 M12 60 H28 M12 440 H28" />
    </LineDrawing>
  );
}
