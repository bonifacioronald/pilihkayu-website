/**
 * One icon set: 24 px grid, 1.5 stroke, square caps, no fills. Decorative unless labelled.
 */
type IconProps = { className?: string; title?: string };

function Svg({ className, title, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      strokeLinejoin="miter"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {children}
    </svg>
  );
}

export const ArrowRight = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 12h15M14 7l5 5-5 5" />
  </Svg>
);
export const ArrowLeft = (p: IconProps) => (
  <Svg {...p}>
    <path d="M20 12H5M10 7l-5 5 5 5" />
  </Svg>
);
export const Close = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Svg>
);
export const Menu = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 9h16M4 15h16" />
  </Svg>
);
export const Check = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </Svg>
);
export const Phone = (p: IconProps) => (
  <Svg {...p}>
    <path d="M7 3.5h3l1.5 4-2 1.5a11 11 0 0 0 5.5 5.5l1.5-2 4 1.5v3a2 2 0 0 1-2 2A16.5 16.5 0 0 1 5 5.5a2 2 0 0 1 2-2z" />
  </Svg>
);
export const Mail = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3.5 6h17v12h-17zM3.5 6.5l8.5 7 8.5-7" />
  </Svg>
);
export const Instagram = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 4h16v16H4z" />
    <circle cx="12" cy="12" r="3.75" />
    <path d="M16.75 7.25h.01" />
  </Svg>
);
