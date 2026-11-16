"use client";

import { useState } from "react";
import { Button } from "./button";
import { Check } from "./icons";
import { SelectField, TextField, isIndonesianMobile } from "./form-field";

const ROLES = ["Owner", "Architect", "Interior designer", "Contractor", "Other"];
const PRODUCTS = ["Flooring", "Ceilings", "Doors & Frames", "Staircases", "Skirting", "Furniture"];

type Errors = Partial<Record<"name" | "phone" | "city" | "role", string>>;

/**
 * Price-list form pattern for /catalogue (Phase 7). In the style guide it validates and shows
 * every state, but sends nothing.
 */
export function LeadFormDemo() {
  const [values, setValues] = useState({ name: "", phone: "", city: "", role: "", product: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const set = (k: keyof typeof values) => (v: string) => setValues((s) => ({ ...s, [k]: v }));

  function validate(): Errors {
    const e: Errors = {};
    if (!values.name.trim()) e.name = "Enter your name.";
    if (!values.phone.trim()) e.phone = "Enter your WhatsApp number.";
    else if (!isIndonesianMobile(values.phone)) e.phone = "Use a mobile number starting with 08 or +62, e.g. 0812 3456 7890.";
    if (!values.city.trim()) e.city = "Enter the city of your project.";
    if (!values.role) e.role = "Choose the option that fits you best.";
    return e;
  }

  function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    const first = Object.keys(e)[0];
    if (first) {
      document.getElementById(`lead-${first}`)?.focus();
      return;
    }
    setState("sending");
    window.setTimeout(() => setState("done"), 900);
  }

  if (state === "done") {
    return (
      <div role="status" className="flex items-start gap-4">
        <span className="flex size-10 shrink-0 items-center justify-center bg-gold text-espresso">
          <Check className="size-5" />
        </span>
        <div>
          <p className="t-heading">Thank you, {values.name.split(" ")[0]}.</p>
          <p className="t-muted mt-1">Demo only: nothing was sent. On the live form this hands over to WhatsApp.</p>
          <button type="button" onClick={() => setState("idle")} className="mt-4 min-h-11 text-base underline decoration-[var(--rule)] underline-offset-[6px]">
            Reset the demo
          </button>
        </div>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-x-[var(--gutter)] gap-y-2 md:grid-cols-2">
      <TextField id="lead-name" name="name" label="Name" helper="Nama" autoComplete="name" value={values.name} onChange={set("name")} error={errors.name} />
      <TextField id="lead-phone" name="phone" type="tel" inputMode="tel" label="WhatsApp number" helper="Nomor WhatsApp" autoComplete="tel" placeholder="0812 3456 7890…" value={values.phone} onChange={set("phone")} error={errors.phone} />
      <TextField id="lead-city" name="city" label="City" helper="Kota" autoComplete="address-level2" value={values.city} onChange={set("city")} error={errors.city} />
      <SelectField id="lead-role" name="role" label="You are" helper="Peran" options={ROLES} value={values.role} onChange={set("role")} error={errors.role} />
      <SelectField id="lead-product" name="product" label="Product interest" helper="Produk" optional options={PRODUCTS} value={values.product} onChange={set("product")} className="md:col-span-2" />
      <div className="mt-4 md:col-span-2">
        <Button type="submit" helper="Kirim" loading={state === "sending"}>
          Send
        </Button>
      </div>
    </form>
  );
}
