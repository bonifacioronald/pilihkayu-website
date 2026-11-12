/** Thin drawing-sheet border with corner registration marks. Place inside a `relative` wrapper. Decorative. */
export function SheetFrame() {
  const corner = "absolute size-3 border-brass";
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-3 border border-brass/50 sm:inset-5">
      <span className={`${corner} -top-px -left-px border-t-2 border-l-2`} />
      <span className={`${corner} -top-px -right-px border-t-2 border-r-2`} />
      <span className={`${corner} -bottom-px -left-px border-b-2 border-l-2`} />
      <span className={`${corner} -right-px -bottom-px border-r-2 border-b-2`} />
    </div>
  );
}
