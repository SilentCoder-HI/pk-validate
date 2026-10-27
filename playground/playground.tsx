import { useState } from "react";
import { createRoot } from "react-dom/client";
import { cnic, phone, ntn, postalCode, iban } from "../src/index.js";
import { SiteLayout, Eyebrow } from "./site";

const PLAYGROUND = {
  title: "Try the format helpers.",
  description: "Enter synthetic sample values and see the pk-validate output immediately. All checks run locally in your browser.",
  privacy: "Please do not enter real CNICs, personal phone numbers, or real banking details. Nothing is sent to a server or stored by this page.",
  items: [
    { id: "cnic", title: "CNIC", subtitle: "13-digit structural format", placeholder: "35202-1234567-1", initial: "35202-1234567-1" },
    { id: "phone", title: "Mobile number", subtitle: "Pakistani local and international forms", placeholder: "0300-1234567", initial: "0300-1234567" },
    { id: "ntn", title: "NTN", subtitle: "8-digit or CNIC-shaped format", placeholder: "1234567-8", initial: "1234567-8" },
    { id: "postal", title: "Postal code", subtitle: "5 digits, not starting with zero", placeholder: "44000", initial: "44000" },
    { id: "iban", title: "Pakistani IBAN", subtitle: "24-character structure and mod-97", placeholder: "PK36SCBL0000001123456702", initial: "PK36SCBL0000001123456702" },
  ],
};

type Result = { valid: boolean; detail: string; rows: [string, string][] };

function check(id: string, value: string): Result {
  if (id === "cnic") {
    const valid = cnic.isValid(value);
    return { valid, detail: valid ? "13 digits" : "Expected 13 digits", rows: [["Normalized", cnic.normalize(value) ?? "—"], ["Masked", cnic.mask(value) ?? "—"], ["Formatted", cnic.format(value) ?? "—"]] };
  }
  if (id === "phone") {
    const valid = phone.isValid(value);
    return { valid, detail: valid ? "Pakistani mobile format" : "Check the number format", rows: [["Normalized · E.164", phone.normalize(value) ?? "—"], ["Local format", phone.format(value) ?? "—"]] };
  }
  if (id === "ntn") {
    const valid = ntn.isValid(value);
    return { valid, detail: valid ? "8 or 13 digits" : "Expected 8 or 13 digits", rows: [["Formatted", ntn.format(value) ?? "—"]] };
  }
  if (id === "postal") {
    const valid = postalCode.isValid(value);
    return { valid, detail: valid ? "5-digit shape" : "Expected 5 digits, not starting with 0", rows: [["Trimmed value", valid ? value.trim() : "—"]] };
  }
  const valid = iban.isValid(value);
  return { valid, detail: valid ? "Structure and mod-97 passed" : "Check the IBAN structure or checksum", rows: [["Formatted", iban.format(value) ?? "—"], ["Bank code", iban.bankCode(value) ?? "—"]] };
}

function ValidatorCard({ item }: { item: (typeof PLAYGROUND.items)[number] }) {
  const [value, setValue] = useState(item.initial);
  const result = check(item.id, value);
  return <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-[#35483d] dark:bg-[#1c2922] sm:p-6">
    <div className="flex items-start gap-3">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-100 font-mono text-xs font-medium text-emerald-900 dark:bg-[#26372e] dark:text-emerald-300">{item.id === "phone" ? "+92" : item.id === "cnic" ? "ID" : item.id.toUpperCase()}</span><div><h2 className="font-display text-lg font-medium">{item.title}</h2
      ><p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{item.subtitle}</p></div></div>
    <label htmlFor={`${item.id}-input`} className="mt-6 block font-mono text-[10px] font-medium uppercase tracking-[.12em] text-slate-500 dark:text-slate-400">Synthetic sample input</label>
    <div className="mt-2 flex gap-2">
      <input id={`${item.id}-input`} value={value} onChange={(event) => setValue(event.target.value)} placeholder={item.placeholder} autoComplete="off" spellCheck={false} className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-3.5 py-3 font-mono text-sm text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 dark:border-[#35483d] dark:bg-[#101713] dark:text-slate-100" /><button type="button" onClick={() => setValue("")} className="rounded-xl border border-slate-300 px-3 text-sm text-slate-600 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-emerald-600 dark:border-[#35483d] dark:text-slate-300 dark:hover:bg-[#26372e]" aria-label={`Clear ${item.title} input`}>Clear</button></div>
    <div aria-live="polite" className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-3.5 dark:border-[#35483d] dark:bg-[#101713]">
      <div className={`flex min-h-11 items-center gap-2 border-b border-slate-200 text-sm font-medium dark:border-[#35483d] ${result.valid ? "text-emerald-800 dark:text-emerald-300" : "text-rose-700 dark:text-rose-300"}`}><span aria-hidden="true">{result.valid ? "✓" : "!"}</span>{result.valid ? "Valid format" : "Invalid format"}<span className="ml-auto text-right font-mono text-[10px] font-normal text-slate-500">{result.detail}</span></div>{result.rows.map(([label, output]) => <div key={label} className="flex min-h-10 items-center justify-between gap-3 border-b border-slate-200 last:border-0 dark:border-[#35483d]"><span className="text-xs text-slate-500 dark:text-slate-400">{label}</span><code className="break-all text-right font-mono text-xs text-slate-800 dark:text-slate-200">{output}</code></div>)}</div>
  </article>;
}

function PlaygroundPage() {
  return <SiteLayout current="Playground"><main id="main" className="mx-auto max-w-7xl px-5 py-14 sm:py-20 lg:px-8"><header className="max-w-3xl"><Eyebrow>LIVE PLAYGROUND</Eyebrow><h1 className="mt-5 font-display text-5xl font-medium tracking-tighter sm:text-6xl">{PLAYGROUND.title}</h1><p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">{PLAYGROUND.description}</p></header><div className="mt-8 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950 dark:border-[#496552] dark:bg-[#1c2922] dark:text-slate-200"><span aria-hidden="true">◈</span>{PLAYGROUND.privacy}</div><section aria-label="Validator input examples" className="mt-9 grid gap-5 md:grid-cols-2">{PLAYGROUND.items.map((item) => <ValidatorCard key={item.id} item={item} />)}</section><p className="mt-8 text-center text-xs text-slate-500 dark:text-slate-400">Format checks only · No identity, carrier, registration, account, or delivery verification</p></main></SiteLayout>;
}

createRoot(document.getElementById("root")!).render(<PlaygroundPage />);
