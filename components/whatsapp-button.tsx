import { whatsappUrl } from "@/lib/settings";

type Props = {
  label?: string;
  message?: string;
  /** Short Indonesian hint shown under the button. */
  hint?: string;
};

export function WhatsAppButton({ label = "Chat on WhatsApp", message, hint }: Props) {
  return (
    <div className="flex flex-col items-center gap-3">
      <a
        href={whatsappUrl(message)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-13 items-center justify-center rounded-sm bg-oxblood px-8 text-base tracking-[0.01em] font-medium text-paper transition-[transform,opacity] duration-ui ease-brand hover:opacity-90 motion-safe:active:scale-[0.97]"
      >
        {label}
      </a>
      {hint ? <p className="text-sm">{hint}</p> : null}
    </div>
  );
}
