import { mountSite, SiteLayout, Eyebrow, ArrowIcon } from "./site";

const DOCS = {
  title: "Documentation",
  intro: "Reference for the pk-validate format helpers. All functions are dependency-free and evaluate input locally.",
  warning: "Format validation is not identity, registration, assignment, or reachability verification. Use synthetic values in examples and tests.",
  install: "npm install pk-validate",
  import: `import { cnic, phone, ntn, postalCode, iban } from "pk-validate";`,
  api: [
    { name: "cnic.isValid(value)", returns: "boolean", note: "13 digits, optionally formatted as 12345-1234567-1." },
    { name: "cnic.normalize(value)", returns: "string | null", note: "Canonical dashed CNIC form." },
    { name: "cnic.format(value)", returns: "string | null", note: "Alias for normalization." },
    { name: "cnic.mask(value)", returns: "string | null", note: "Masks the middle seven digits for display." },
    { name: "phone.isValid(value)", returns: "boolean", note: "Pakistani mobile shape; accepts local, +92 and 0092 forms." },
    { name: "phone.normalize(value)", returns: "string | null", note: "E.164 form, such as +923xxxxxxxxx." },
    { name: "phone.format(value)", returns: "string | null", note: "Local display form, such as 03xx-xxxxxxx." },
    { name: "ntn.isValid(value)", returns: "boolean", note: "Common 8-digit or individual CNIC-shaped 13-digit NTN format." },
    { name: "ntn.format(value)", returns: "string | null", note: "Formats an 8-digit or 13-digit accepted shape." },
    { name: "postalCode.isValid(value)", returns: "boolean", note: "Five digits, not starting with zero; ignores surrounding whitespace." },
    { name: "iban.isValid(value)", returns: "boolean", note: "Pakistani IBAN structure and mod-97 checksum." },
    { name: "iban.format(value)", returns: "string | null", note: "Groups a valid IBAN in four-character chunks." },
    { name: "iban.bankCode(value)", returns: "string | null", note: "Four-letter bank code from a valid IBAN." },
  ],
  phoneExample: `phone.isValid("0300-1234567"); // true\nphone.isValid("+92 300 1234567"); // true\nphone.normalize("0092-300-1234567"); // "+923001234567"\nphone.format("+923001234567"); // "0300-1234567";`,
  cnicExample: `cnic.isValid("35202-1234567-1"); // true\ncnic.normalize("3520212345671"); // "35202-1234567-1"\ncnic.mask("35202-1234567-1"); // "35202-*******-1"`,
  ibanExample: `iban.isValid("PK36SCBL0000001123456702"); // true\niban.format("PK36SCBL0000001123456702");\n// "PK36 SCBL 0000 0011 2345 6702"\niban.bankCode("PK36SCBL0000001123456702"); // "SCBL"`,
  environment: "The package ships ESM and CommonJS builds with TypeScript declarations. It works in Node.js and browser bundlers; use it in edge runtimes that support the package's JavaScript target.",
};

function Code({ children }: { children: string }) {
  return <pre className="overflow-x-auto rounded-2xl border border-slate-800 bg-[#1c2922] p-5 text-xs leading-7 text-emerald-100 sm:p-6 sm:text-sm dark:border-[#35483d]"><code>{children}</code></pre>;
}

function DocsPage() {
  return <SiteLayout current="Docs"><main id="main" className="mx-auto max-w-7xl px-5 py-16 sm:py-20 lg:px-8">
    <header className="max-w-3xl"><Eyebrow>REFERENCE</Eyebrow><h1 className="mt-5 font-display text-5xl font-semibold tracking-tighter sm:text-6xl">{DOCS.title}<span className="text-emerald-700 dark:text-emerald-400">.</span></h1><p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">{DOCS.intro}</p></header>
    <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
      <div className="space-y-12">
        <section id="installation"><Eyebrow>01 · INSTALLATION</Eyebrow><h2 className="section-title">Install the package</h2><div className="mt-5"><Code>{DOCS.install}</Code></div><p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">Import individual helpers from the package entry point:</p><div className="mt-4"><Code>{DOCS.import}</Code></div><p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">{DOCS.environment}</p></section>
        <section id="cnic"><Eyebrow>02 · CNIC</Eyebrow><h2 className="section-title">CNIC format helpers</h2><p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">CNIC utilities check structural format only. They do not interpret any digit as gender or confirm identity.</p><div className="mt-5"><Code>{DOCS.cnicExample}</Code></div></section>
        <section id="phone"><Eyebrow>03 · MOBILE</Eyebrow><h2 className="section-title">Pakistani mobile numbers</h2><p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">Local 03xxxxxxxxx, international +923xxxxxxxxx, and 0092 access-prefix values are supported with common separators.</p><div className="mt-5"><Code>{DOCS.phoneExample}</Code></div><p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">Phone validation does not check carrier assignment or reachability. Carrier lookup is not included.</p></section>
        <section id="ntn"><Eyebrow>04 · NTN</Eyebrow><h2 className="section-title">NTN format helpers</h2><p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">Recognizes common 8-digit NTN and 13-digit CNIC-shaped individual forms. No undocumented checksum is applied, and FBR registration is not checked.</p></section>
        <section id="postal"><Eyebrow>05 · POSTAL CODE</Eyebrow><h2 className="section-title">Postal-code format</h2><p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">The validator accepts five digits that do not start with zero. It does not confirm that a code or delivery address exists.</p></section>
        <section id="iban"><Eyebrow>06 · IBAN</Eyebrow><h2 className="section-title">Pakistani IBAN</h2><p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">Checks a 24-character PK IBAN structure and the standard mod-97 checksum. Spaces and lowercase input are accepted. This does not confirm an account exists or is active.</p><div className="mt-5"><Code>{DOCS.ibanExample}</Code></div></section>
        <section id="api"><Eyebrow>API REFERENCE</Eyebrow><h2 className="section-title">Available functions</h2><div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 dark:border-[#35483d]"><div className="min-w-155"><div className="grid grid-cols-[minmax(170px,.8fr)_minmax(100px,.5fr)_minmax(220px,1.3fr)] gap-4 bg-slate-100 px-4 py-3 text-xs font-medium uppercase tracking-wide text-slate-600 dark:bg-[#26372e] dark:text-slate-200"><span>Function</span><span>Returns</span><span>Behavior</span></div>{DOCS.api.map((row) => <div key={row.name} className="grid grid-cols-[minmax(170px,.8fr)_minmax(100px,.5fr)_minmax(220px,1.3fr)] gap-4 border-t border-slate-200 px-4 py-4 text-xs leading-5 dark:border-[#35483d] sm:text-sm"><code className="wrap-break-word font-mono text-emerald-800 dark:text-emerald-300">{row.name}</code><span className="font-mono text-slate-500 dark:text-slate-400">{row.returns}</span><span className="text-slate-600 dark:text-slate-300">{row.note}</span></div>)}</div></div></section>
      </div>
      <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 dark:border-[#35483d] dark:bg-[#1c2922] lg:sticky lg:top-24"><h2 className="font-display font-medium">On this page</h2><nav aria-label="Documentation sections" className="mt-4 flex flex-col gap-1">{[["installation","Installation"],["cnic","CNIC"],["phone","Mobile numbers"],["ntn","NTN"],["postal","Postal codes"],["iban","IBAN"],["api","API reference"]].map(([href,label]) => <a key={href} href={`#${href}`} className="rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-emerald-50 hover:text-emerald-900 focus-visible:outline-2 focus-visible:outline-emerald-600 dark:text-slate-300 dark:hover:bg-[#26372e] dark:hover:text-emerald-100">{label}</a>)}</nav><a href="/playground.html" className="button-primary mt-5 w-full">Try the Playground <ArrowIcon/></a></aside>
    </div>
    <aside className="mt-12 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950 dark:border-[#496552] dark:bg-[#1c2922] dark:text-slate-200"><strong className="font-medium">Accuracy note.</strong> {DOCS.warning}</aside>
  </main></SiteLayout>;
}

mountSite(<DocsPage/>);
