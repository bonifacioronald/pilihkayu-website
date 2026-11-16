import { cx } from "@/lib/cx";

type FieldProps = {
  id: string;
  label: string;
  /** Short Indonesian helper label, a few words (e.g. "Kota"). */
  helper?: string;
  error?: string | null;
  optional?: boolean;
  className?: string;
};

const control =
  "block min-h-12 w-full border-0 bg-[var(--field)] px-4 text-base text-[var(--fg)] shadow-[inset_0_-1px_0_var(--outline)] outline-none transition-[box-shadow] duration-ui ease-brand placeholder:text-[var(--muted)] focus:shadow-[inset_0_-2px_0_var(--outline),inset_0_0_0_1px_var(--outline)] aria-[invalid=true]:shadow-[inset_0_-2px_0_var(--error)]";

function Label({ id, label, helper, optional }: FieldProps) {
  return (
    <label htmlFor={id} className="mb-2 flex flex-wrap items-baseline gap-x-2 text-[0.9375rem] font-semibold">
      {label}
      {helper ? <span className="text-[0.8125rem] font-normal text-[var(--muted)]">{helper}</span> : null}
      {optional ? <span className="text-[0.8125rem] font-normal text-[var(--muted)]">· optional</span> : null}
    </label>
  );
}

function ErrorText({ id, error }: { id: string; error?: string | null }) {
  return (
    <p id={`${id}-error`} aria-live="polite" className="mt-2 min-h-5 text-[0.875rem] text-[var(--error)]">
      {error ?? ""}
    </p>
  );
}

export function TextField({
  type = "text",
  name,
  autoComplete,
  inputMode,
  placeholder,
  value,
  onChange,
  ...field
}: FieldProps & {
  type?: "text" | "tel" | "email";
  name: string;
  autoComplete?: string;
  inputMode?: "text" | "tel" | "email";
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className={field.className}>
      <Label {...field} />
      <input
        id={field.id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={field.error ? true : undefined}
        aria-describedby={field.error ? `${field.id}-error` : undefined}
        required={!field.optional}
        spellCheck={type === "text" ? undefined : false}
        className={control}
      />
      <ErrorText id={field.id} error={field.error} />
    </div>
  );
}

export function SelectField({
  name,
  options,
  placeholder = "Choose…",
  value,
  onChange,
  ...field
}: FieldProps & {
  name: string;
  options: string[];
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className={field.className}>
      <Label {...field} />
      <div className="relative">
        <select
          id={field.id}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={field.error ? true : undefined}
          aria-describedby={field.error ? `${field.id}-error` : undefined}
          required={!field.optional}
          className={cx(control, "appearance-none pr-10 [&>option]:bg-espresso [&>option]:text-paper")}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <svg aria-hidden="true" viewBox="0 0 24 24" className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
      <ErrorText id={field.id} error={field.error} />
    </div>
  );
}

/** Indonesian mobile numbers: 08…, 628… or +628…, 10–13 digits after the prefix rules. */
export function isIndonesianMobile(raw: string) {
  const v = raw.replace(/[\s-]/g, "");
  return /^(\+?62|0)8\d{7,11}$/.test(v);
}
