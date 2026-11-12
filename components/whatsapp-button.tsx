import { whatsappUrl } from "@/lib/settings";

type Props = {
  label?: string;
  message?: string;
  /** Short Indonesian hint shown under the button. */
  hint?: string;
};

export function WhatsAppButton({ label = "Chat on WhatsApp", message, hint }: Props) {
  return (
    <div className="flex flex-col items-center gap-2">
      <a
        href={whatsappUrl(message)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-12 items-center justify-center rounded-sm bg-oxblood px-7 text-base font-medium text-paper transition-[transform,opacity] duration-ui ease-brand hover:opacity-90 motion-safe:active:scale-[0.97]"
      >
        {label}
      </a>
      {hint ? <p className="text-sm text-ink-soft">{hint}</p> : null}
    </div>
  );
}
