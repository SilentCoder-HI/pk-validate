import { mountSite, SiteLayout, Eyebrow, ArrowIcon } from "./site";

const HOME = {
    title: "Pakistani data formats deserve a proper check.",
    subtitle: "Validate, normalize, and format common Pakistani inputs with a small TypeScript toolkit—without sending values to a server.",
    intro: "A practical set of format helpers for forms and applications used in Pakistan.",
    formats: [
        { code: "CNIC", example: "35202-•••••••-1", note: "13-digit format" },
        { code: "MOBILE", example: "+92 300 •••••••", note: "Local and international" },
        { code: "NTN", example: "1234567-8", note: "Common shape formats" },
        { code: "POSTAL", example: "44000", note: "5-digit pattern" },
        { code: "IBAN", example: "PK36 SCBL ••••", note: "Structure + mod-97" },
    ],
    features: [
        { title: "Local formats", body: "Pakistani CNIC, mobile, NTN, postal-code, and IBAN helpers in one package." },
        { title: "No runtime dependencies", body: "Lightweight helpers that do not add dependencies to your production app." },
        { title: "TypeScript-first", body: "Typed source, declaration files, ESM and CommonJS package builds." },
    ],
    code: `import { cnic, phone, iban } from "pk-validate";\n\ncnic.isValid("35202-1234567-1");\nphone.normalize("0300-1234567");\niban.isValid("PK36SCBL0000001123456702");`,
};

function HomePage() {
    return <SiteLayout current="Home">
        <main id="main" className="bg-[#f7f8f5] text-slate-900 transition-colors dark:bg-[#101713] dark:text-slate-100">
            <section className="relative isolate overflow-hidden border-b border-slate-200/70 dark:border-slate-800">
                <div className="hero-grid absolute inset-0 -z-10 opacity-60 dark:opacity-30" aria-hidden="true" />
                <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:py-28 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-32">
                    <div><Eyebrow>PAKISTANI FORMAT TOOLKIT </Eyebrow><h1 className="mt-7 max-w-3xl font-display text-5xl font-semibold leading-[1.04] tracking-[-.055em] sm:text-6xl lg:text-7xl">Pakistani data formats deserve <span className="text-emerald-700 dark:text-emerald-400">a proper check.</span></h1><p className="mt-7 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8 dark:text-slate-300">{HOME.subtitle}</p><div className="mt-9 flex flex-wrap gap-3"><a className="button-primary" href="/playground.html">Try the Playground <ArrowIcon /></a><a className="button-secondary" href="/docs.html">Read the docs <ArrowIcon /></a></div><p className="mt-7 text-xs font-medium text-slate-500 dark:text-slate-400">Free · Open source · Zero runtime dependencies</p></div>
                    <div className="relative mx-auto w-full max-w-lg">
                        <div className="absolute -inset-6 rounded-4xl bg-emerald-100/70 blur-2xl dark:bg-emerald-950/40" />
                        <div className="relative rounded-3xl border border-white/80 dark:border-[#35483d] p-5 shadow-[0_30px_90px_-40px_rgba(15,70,43,.35)] backdrop-blur bg-[#f7f8f5] text-slate-900 transition-colors dark:bg-[#1c2922] dark:text-slate-100 sm:p-7">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800 ">
                                <span className="font-display text-sm font-medium">{HOME.intro}</span>
                                <span className="rounded-full bg-emerald-100 px-2.5 py-1 font-mono text-[9px] text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300">LOCAL</span>
                            </div>
                            <div className="space-y-3 py-5 ">{HOME.formats.map((format) => <div key={format.code} className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-3.5 py-3 dark:bg-[#101713]">
                                <div>
                                    <div className="font-mono text-xs font-medium text-slate-800 dark:text-slate-100">{format.code}<span className="ml-3 text-slate-500">{format.example}</span>
                                    </div>
                                    <p className="mt-1 text-[10px] text-slate-500">{format.note}</p>
                                </div>
                                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-100 text-xs text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300" aria-label="Example format">✓</span></div>)}</div><div className="border-t border-slate-100 pt-4 font-mono text-[9px] tracking-wide text-slate-500 dark:border-slate-800">FORMAT CHECKS ONLY · NO SERVER REQUEST</div></div></div>
                </div>
            </section>
            <section className="mx-auto max-w-7xl px-5 py-20 sm:py-24 lg:px-8">
                <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
                    <div>
                        <Eyebrow>WHY PK-VALIDATE</Eyebrow>
                        <h2 className="section-title">Local formats deserve local tools.</h2>
                        <p className="mt-5 max-w-sm leading-7 text-slate-600 dark:text-slate-300">General validators do not cover every local format, and repeating one-off regular expressions across projects can be hard to maintain.</p></div><div className="grid gap-4 sm:grid-cols-3">{HOME.features.map((feature, i) => <article key={feature.title} className="feature-card"><span className="font-mono text-xs text-emerald-700 dark:text-emerald-400">0{i + 1}</span><h3 className="mt-5 font-display text-lg font-semibold">{feature.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{feature.body}</p></article>)}</div></div></section>
            <section className="bg-white py-20 dark:bg-[#1c2922] sm:py-24"><div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:px-8"><div><Eyebrow>QUICK START</Eyebrow><h2 className="section-title">A useful helper is one import away.</h2><p className="mt-5 leading-7 text-slate-600 dark:text-slate-300">Install from npm and explore the public API in the docs.</p><a href="/docs.html" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-emerald-800 hover:underline dark:text-emerald-300">Explore API documentation <ArrowIcon /></a></div><pre className="overflow-x-auto rounded-2xl border border-slate-200 bg-[#1c2922] p-6 text-xs leading-7 text-emerald-100 sm:text-sm dark:border-[#35483d] dark:bg-[#101713]"><code>{HOME.code}</code></pre></div></section>
            <section className="mx-auto max-w-7xl px-5 py-20 sm:py-24 lg:px-8"><div className="rounded-3xl bg-emerald-950 px-7 py-10 text-white dark:bg-[#1c2922] sm:px-12 sm:py-14"><Eyebrow>TRY IT IN YOUR BROWSER</Eyebrow><h2 className="mt-5 font-display text-3xl font-medium tracking-tight sm:text-4xl">Test with synthetic examples first.</h2><p className="mt-4 max-w-2xl leading-7 text-emerald-100/80">The playground gives immediate format results. It runs locally in the browser and cannot verify real-world assignment, registration, or identity.</p><a href="/playground.html" className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-emerald-950 hover:bg-emerald-50">Open Playground <ArrowIcon /></a></div></section>
        </main>
    </SiteLayout>;
}

mountSite(<HomePage />);
