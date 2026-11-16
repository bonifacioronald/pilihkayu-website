import Link from "next/link";
import { cx } from "@/lib/cx";
import { ArrowRight } from "./icons";

type Variant = "primary" | "secondary" | "link";

type CommonProps = {
  variant?: Variant;
  /** Short Indonesian helper under the button, a few words only (e.g. "Chat lewat WhatsApp"). */
  helper?: string;
  className?: string;
  children: React.ReactNode;
};

type LinkButtonProps = CommonProps & {
  href: string;
  /** Opens in a new tab (WhatsApp, Instagram). */
  external?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

type ActionButtonProps = CommonProps & {
  href?: undefined;
  type?: "button" | "submit";
  loading?: boolean;
  loadingLabel?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

type ComingSoonProps = CommonProps & { comingSoon: true };

export type ButtonProps = LinkButtonProps | ActionButtonProps | ComingSoonProps;

const base =
  "inline-flex items-center justify-center gap-3 select-none transition-[transform,background-color,color,text-decoration-color,box-shadow] duration-ui ease-brand motion-safe:active:scale-[0.97]";

const variants: Record<Variant, string> = {
  primary:
    "min-h-12 px-6 bg-[var(--btn-bg)] text-[var(--btn-fg)] text-[0.9375rem] font-semibold tracking-[0.04em] [@media(hover:hover)]:hover:bg-[var(--btn-hover)]",
  secondary:
    "min-h-12 px-6 text-[var(--fg)] text-[0.9375rem] font-semibold tracking-[0.04em] shadow-[inset_0_0_0_1px_var(--outline)] [@media(hover:hover)]:hover:shadow-[inset_0_0_0_2px_var(--outline)]",
  link: "min-h-11 text-[var(--fg)] text-base underline decoration-[var(--rule)] decoration-1 underline-offset-[6px] [@media(hover:hover)]:hover:decoration-[var(--fg)]",
};

function Wrap({ helper, children, className }: { helper?: string; children: React.ReactNode; className?: string }) {
  if (!helper) return <>{children}</>;
  return (
    <span className={cx("inline-flex flex-col items-start gap-2", className)}>
      {children}
      <span className="text-[0.8125rem] text-[var(--muted)]">{helper}</span>
    </span>
  );
}

/**
 * Primary: paper fill on dark (espresso fill on paper). Secondary: 1 px outline.
 * Link: text with a gold underline. Sharp edges, one primary per screen.
 */
export function Button(props: ButtonProps) {
  const variant = props.variant ?? "primary";
  const cls = cx(base, variants[variant], !props.helper && props.className);

  if ("comingSoon" in props) {
    return (
      <span className={cx("inline-flex flex-col items-start gap-2", props.className)}>
        <button
          type="button"
          disabled
          className={cx(
            "inline-flex min-h-12 cursor-not-allowed items-center text-[0.9375rem] font-semibold tracking-[0.04em] whitespace-nowrap text-[var(--muted)]",
            variant === "link"
              ? "min-h-11 underline decoration-dotted decoration-1 underline-offset-[6px]"
              : "px-6 shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--muted)_45%,transparent)]",
          )}
        >
          {props.children}
        </button>
        <span className="text-[0.6875rem] font-semibold tracking-[0.2em] text-[var(--muted)] uppercase">
          Coming soon{props.helper ? ` · ${props.helper}` : ""}
        </span>
      </span>
    );
  }

  if (props.href !== undefined) {
    const content = (
      <>
        {props.children}
        {variant === "link" ? <ArrowRight className="size-4 shrink-0" /> : null}
      </>
    );
    const link = props.external ? (
      <a href={props.href} target="_blank" rel="noopener noreferrer" onClick={props.onClick} className={cls}>
        {content}
      </a>
    ) : (
      <Link href={props.href} onClick={props.onClick} className={cls}>
        {content}
      </Link>
    );
    return (
      <Wrap helper={props.helper} className={props.className}>
        {link}
      </Wrap>
    );
  }

  const { loading, loadingLabel = "Sending…", type = "button", onClick } = props;
  return (
    <Wrap helper={props.helper} className={props.className}>
      <button type={type} onClick={onClick} aria-busy={loading || undefined} disabled={loading} className={cx(cls, loading && "cursor-progress")}>
        {loading ? (
          <>
            <span aria-hidden="true" className="size-3.5 animate-spin border-[1.5px] border-current border-t-transparent" />
            {loadingLabel}
          </>
        ) : (
          props.children
        )}
      </button>
    </Wrap>
  );
}
