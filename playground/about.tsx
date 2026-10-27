import { useEffect, useState, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import "./about.css";
import { SiteFooter, SiteHeader } from "./site";

// Edit copy, navigation, and optional external URLs here. Empty URLs are hidden.
const ABOUT_CONFIG = {
  brand: "pk-validate",
  siteName: "pk-validate Playground",
  tagline: "Pakistani data, validated with care.",
  description:
    "A free, open-source, zero-runtime-dependency TypeScript toolkit for checking and formatting Pakistani data formats.",
  seo: {
    title: "About · pk-validate Playground",
    description: "Learn about pk-validate, an open-source, zero-runtime-dependency TypeScript library for Pakistani data formats.",
    openGraphTitle: "About pk-validate Playground",
    openGraphDescription: "A practical, format-only toolkit for Pakistani CNIC, mobile, NTN, postal code, and IBAN inputs.",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "Playground", href: "/playground.html", action: true },
    { label: "About", href: "/about.html", current: true },
    { label: "Docs", href: "/docs.html" },
    { label: "GitHub", href: "https://github.com/SilentCoder-HI/pk-validate", external: true },
  ],
  links: {
    playground: "/playground.html",
    npmPackage: "https://www.npmjs.com/package/pk-validate",
    githubProfile: "https://github.com/SilentCoder-HI",
    githubRepo: "https://github.com/SilentCoder-HI/pk-validate",
    npmProfile: "",
    contributing: "https://github.com/SilentCoder-HI/pk-validate/blob/main/CONTRIBUTING.md",
    issues: "https://github.com/SilentCoder-HI/pk-validate/issues",
    linkedin: "",
    twitter: "",
    portfolio: "",
  },
  hero: {
    eyebrow: "ABOUT THE PROJECT",
    titleLead: "Validate Pakistani data",
    titleAccent: "the right way.",
    description:
      "A small, open-source TypeScript library for validating and formatting common Pakistani data formats—with clear limits and no runtime dependencies.",
    tryLabel: "Try the Playground",
    npmLabel: "View on npm",
    starLabel: "Star on GitHub",
    badge: "FORMAT CHECKS · LOCAL BY DESIGN",
    visualLabel: "Illustration of supported Pakistani data formats",
    visualWindowLabel: "format check",
    visualRows: ["CNIC    35202-•••••••-1", "MOBILE  +92 300 •••••••", "NTN     1234567-8", "POSTAL  44000", "IBAN    PK36 SCBL ••••"],
    visualFooter: "STRUCTURE ONLY · NO SERVER REQUEST",
    visualPill: "TypeScript first",
  },
  why: {
    eyebrow: "WHY IT EXISTS",
    title: "Local formats deserve local tools.",
    intro: "Developers often end up rewriting the same format checks for each new form.",
    points: [
      "General-purpose validators do not cover every Pakistani format. CNICs, NTN shapes, and Pakistani IBANs often need their own rules.",
      "A mobile number can appear as 03XX, +92, or 0092—with spaces or dashes. Repeating custom regular expressions across projects is easy to get wrong.",
      "Badly handled inputs can create avoidable data problems in e-commerce, fintech, delivery, and public-service forms.",
    ],
  },
  special: {
    eyebrow: "MADE FOR PRACTICAL USE",
    title: "A few useful things, done simply.",
    features: [
      { icon: "pk", title: "Built for Pakistan", body: "CNIC, mobile, NTN, postal-code, and Pakistani IBAN format helpers in one package." },
      { icon: "box", title: "Zero runtime dependencies", body: "No runtime dependency tree to ship with your application. Build tooling stays in development." },
      { icon: "code", title: "TypeScript-first", body: "Written in TypeScript with declarations, plus ESM and CommonJS package builds." },
      { icon: "form", title: "Fits your forms", body: "Use the plain validation functions inside your own Zod, React Hook Form, or SuperForm schemas. Dedicated adapters are not included yet." },
      { icon: "shield", title: "Privacy-minded", body: "The demo evaluates input in your browser. Use cnic.mask() to display a masked CNIC; do not enter real identifiers here." },
      { icon: "people", title: "Open to contributors", body: "Help improve rules, documentation, tests, and future sourced data. No carrier allocation table ships today." },
    ],
  },
  trySection: {
    eyebrow: "TRY BEFORE YOU INSTALL",
    title: "See the helpers respond.",
    body: "Type a synthetic CNIC, mobile number, NTN, postal code, or IBAN into the Playground and instantly see format validity and the helpers available for that format, such as normalization, formatting, and masking.",
    privacy: "Everything runs in your browser. The demo has no submission endpoint and does not store or send your input.",
    button: "Open the Playground",
  },
  quickStart: {
    eyebrow: "QUICK START",
    title: "A small API. Straight to the point.",
    copy: "Install the package, import the helpers you need, and keep the result in your own validation flow.",
    copied: "Copied",
    copyButton: "Copy",
    terminalLabel: "terminal · typescript",
    copyLabel: "Copy quick-start example",
    code: `npm install pk-validate\n\nimport { cnic, phone, iban } from "pk-validate";\n\ncnic.isValid("35202-1234567-1");\nphone.normalize("0300-1234567");\niban.isValid("PK36SCBL0000001123456702");`,
  },
  limits: {
    eyebrow: "HONEST LIMITS",
    title: "Format is not verification.",
    items: [
      "These helpers check input shape and, for IBAN, its checksum. They cannot confirm that a CNIC, mobile number, NTN, postal code, or bank account exists or is assigned.",
      "Carrier detection is not currently included. Even when added, number portability means a prefix can only provide a best-effort clue.",
      "Please do not enter real CNICs or personal phone numbers on this demo site. Use synthetic sample values.",
    ],
  },
  creator: {
    eyebrow: "WHO MADE THIS",
    title: "Built by a developer, for developers.",
    bio: "pk-validate is created and maintained by SilentCoder-HI, a developer who built it to make working with Pakistani data formats easier for everyone.",
    profileName: "SilentCoder-HI",
    profileNote: "Open-source maintainer",
    openSourceBadge: "OPEN SOURCE",
    githubLabel: "GitHub profile",
    npmLabel: "npm profile",
    packageLabel: "Package on npm",
    repositoryLabel: "Repository",
    linkedinLabel: "LinkedIn",
    twitterLabel: "X / Twitter",
    portfolioLabel: "Portfolio",
    opensNewTab: "opens in a new tab",
  },
  contribute: {
    eyebrow: "CONTRIBUTE",
    title: "There is room to help.",
    body: "Report a wrong result, improve tests or documentation, suggest a new validator, or build a form adapter. Small fixes matter—and good first issues are a friendly place to start.",
    contributingLabel: "Read CONTRIBUTING.md",
    issuesLabel: "Browse GitHub issues",
  },
  footer: {
    license: "MIT License",
    made: "Made in Pakistan 🇵🇰",
    github: "GitHub",
    npm: "npm",
  },
  accessibility: {
    skip: "Skip to main content",
    menuOpen: "Open navigation menu",
    menuClose: "Close navigation menu",
    themeLight: "Switch to light mode",
    themeDark: "Switch to dark mode",
    copySuccess: "Quick-start example copied to clipboard",
  },
  interface: {
    playgroundTag: "PLAYGROUND",
    formatOnly: "format check",
    structureOnly: "STRUCTURE ONLY · NO SERVER REQUEST",
    cnicSample: "CNIC    35202-•••••••-1",
    mobileSample: "MOBILE  +92 300 •••••••",
    ntnSample: "NTN     1234567-8",
    postalSample: "POSTAL  44000",
    ibanSample: "IBAN    PK36 SCBL ••••",
    safeSample: "Synthetic example",
    checked: "Format example",
    terminalLanguage: "terminal · typescript",
    copied: "Copied",
    copy: "Copy",
    githubInitials: "SH",
    copyright: "©",
  },
} as const;

type Theme = "light" | "dark";

function initialTheme(): Theme {
  try {
    const saved = localStorage.getItem("pk-validate-theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    // Continue with the system preference when storage is unavailable.
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function Icon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  const common = { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true as const };
  const paths: Record<string, ReactNode> = {
    sun: <><circle cx="12" cy="12" r="3.5"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></>,
    moon: <path d="M20.7 14.3A8.8 8.8 0 0 1 9.7 3.3 9 9 0 1 0 20.7 14.3Z"/>,
    arrow: <><path d="M5 12h14m-6-6 6 6-6 6"/></>,
    copy: <><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    external: <><path d="M14 4h6v6m-11 5L20 4"/><path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5"/></>,
  };
  return <svg {...common}>{paths[name] ?? <circle cx="12" cy="12" r="8"/>}</svg>;
}

function App() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = ABOUT_CONFIG.seo.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", ABOUT_CONFIG.seo.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", ABOUT_CONFIG.seo.openGraphTitle);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", ABOUT_CONFIG.seo.openGraphDescription);
  }, []);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(ABOUT_CONFIG.quickStart.code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  const profileLinks = [
    { label: ABOUT_CONFIG.creator.githubLabel, href: ABOUT_CONFIG.links.githubProfile },
    { label: ABOUT_CONFIG.creator.npmLabel, href: ABOUT_CONFIG.links.npmProfile },
    { label: ABOUT_CONFIG.creator.packageLabel, href: ABOUT_CONFIG.links.npmPackage },
    { label: ABOUT_CONFIG.creator.repositoryLabel, href: ABOUT_CONFIG.links.githubRepo },
    { label: ABOUT_CONFIG.creator.linkedinLabel, href: ABOUT_CONFIG.links.linkedin },
    { label: ABOUT_CONFIG.creator.twitterLabel, href: ABOUT_CONFIG.links.twitter },
    { label: ABOUT_CONFIG.creator.portfolioLabel, href: ABOUT_CONFIG.links.portfolio },
  ].filter((link) => link.href.length > 0);

  return (
    <div className="min-h-screen bg-[#f7f8f5] text-slate-900 transition-colors dark:bg-[#101713] dark:text-slate-100">
      <a className="skip-link" href="#main">{ABOUT_CONFIG.accessibility.skip}</a>
      <SiteHeader current="About" />

      <main id="main">
        <section className="relative isolate overflow-hidden border-b border-slate-200/70 dark:border-slate-800">
          <div className="hero-grid absolute inset-0 -z-10 opacity-60 dark:opacity-30" aria-hidden="true" />
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:py-28 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-32">
            <div>
              <p className="eyebrow"><span className="eyebrow-dot" />{ABOUT_CONFIG.hero.eyebrow}</p>
              <h1 className="mt-7 max-w-3xl font-display text-5xl font-semibold leading-[1.04] tracking-[-.055em] sm:text-6xl lg:text-7xl">{ABOUT_CONFIG.hero.titleLead}<br /><span className="text-emerald-700 dark:text-emerald-400">{ABOUT_CONFIG.hero.titleAccent}</span></h1>
              <p className="mt-7 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8 dark:text-slate-300">{ABOUT_CONFIG.hero.description}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href={ABOUT_CONFIG.links.playground} className="button-primary">{ABOUT_CONFIG.hero.tryLabel}<Icon name="arrow" className="h-4 w-4" /></a>
                <a href={ABOUT_CONFIG.links.npmPackage} target="_blank" rel="noreferrer" className="button-secondary">{ABOUT_CONFIG.hero.npmLabel}<Icon name="external" className="h-4 w-4" /></a>
                {ABOUT_CONFIG.links.githubRepo && <a href={ABOUT_CONFIG.links.githubRepo} target="_blank" rel="noreferrer" className="button-secondary">{ABOUT_CONFIG.hero.starLabel}<Icon name="external" className="h-4 w-4" /></a>}
              </div>
              <div className="mt-8 flex items-center gap-3 text-xs font-medium text-slate-500 dark:text-slate-400"><span className="h-px w-8 bg-emerald-700 dark:bg-emerald-400" />{ABOUT_CONFIG.hero.badge}</div>
            </div>
            <div className="relative mx-auto w-full max-w-lg" aria-label={ABOUT_CONFIG.hero.visualLabel}>
              <div className="absolute -inset-6 rounded-4xl bg-emerald-100/70 blur-2xl dark:bg-emerald-950/40" />
              <div className="relative overflow-hidden rounded-3xl border border-white/80 bg-white/80 p-5 shadow-[0_30px_90px_-40px_rgba(15,70,43,.35)] backdrop-blur dark:border-[#35483d] dark:bg-[#1c2922] sm:p-7">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800"><div className="flex gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-rose-300"/><i className="h-2.5 w-2.5 rounded-full bg-amber-300"/><i className="h-2.5 w-2.5 rounded-full bg-emerald-400"/></div><span className="font-mono text-[10px] uppercase tracking-[.18em] text-slate-400">{ABOUT_CONFIG.interface.formatOnly}</span></div>
                <div className="space-y-3 py-5 font-mono text-xs sm:text-sm">
                  {ABOUT_CONFIG.hero.visualRows.map((line, index) => <div key={line} className="flex items-center justify-between rounded-xl bg-slate-50 px-3.5 py-3 dark:bg-[#26372e]"><span className="text-slate-600 dark:text-slate-300">{line}</span><span className={`grid h-6 w-6 place-items-center rounded-full ${index === 4 ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300" : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"}`} aria-label={index === 4 ? ABOUT_CONFIG.interface.safeSample : ABOUT_CONFIG.interface.checked}>{index === 4 ? "·" : "✓"}</span></div>)}
                </div>
                <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-[10px] text-slate-500 dark:border-slate-800 dark:text-slate-400"><span>{ABOUT_CONFIG.interface.structureOnly}</span><span className="text-emerald-700 dark:text-emerald-400">{ABOUT_CONFIG.brand}</span></div>
              </div>
              <div className="absolute -right-2 -top-5 rounded-xl border border-emerald-100 bg-white px-3 py-2 font-mono text-[10px] text-emerald-800 shadow-lg dark:border-[#496552] dark:bg-[#26372e] dark:text-emerald-300 sm:-right-5"><span className="mr-2 text-emerald-500">●</span>{ABOUT_CONFIG.hero.visualPill}</div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:py-24 lg:px-8" aria-labelledby="why-title">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <div><p className="eyebrow"><span className="eyebrow-dot" />{ABOUT_CONFIG.why.eyebrow}</p><h2 id="why-title" className="section-title">{ABOUT_CONFIG.why.title}</h2><p className="mt-5 max-w-sm leading-7 text-slate-600 dark:text-slate-300">{ABOUT_CONFIG.why.intro}</p></div>
            <div className="divide-y divide-slate-200 dark:divide-slate-800">{ABOUT_CONFIG.why.points.map((point, index) => <article key={point} className="flex gap-5 py-5 first:pt-0 last:pb-0"><span className="pt-1 font-mono text-xs text-emerald-700 dark:text-emerald-400">0{index + 1}</span><p className="max-w-2xl leading-7 text-slate-600 dark:text-slate-300">{point}</p></article>)}</div>
          </div>
        </section>

        <section className="bg-white py-20 dark:bg-[#141d17] sm:py-24" aria-labelledby="special-title">
          <div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="max-w-2xl"><p className="eyebrow"><span className="eyebrow-dot" />{ABOUT_CONFIG.special.eyebrow}</p><h2 id="special-title" className="section-title">{ABOUT_CONFIG.special.title}</h2></div>
            <div className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ">{ABOUT_CONFIG.special.features.map((feature, index) => <article key={feature.title} className="feature-card "><div className="flex items-center justify-between"><span className="feature-icon" aria-hidden="true">{feature.icon === "pk" ? "PK" : ["◇", "{}", "TS", "↔", "✳"][index - 1] ?? "✳"}</span><span className="font-mono text-[10px] text-slate-400">0{index + 1}</span></div><h3 className="mt-6 font-display text-lg font-semibold tracking-tight">{feature.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{feature.body}</p></article>)}</div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:py-24 lg:px-8" aria-labelledby="try-title">
          <div className="relative overflow-hidden rounded-4xl bg-emerald-950 px-6 py-10 text-white dark:bg-[#1c2922] sm:px-10 sm:py-14 lg:px-14">
            <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full border border-emerald-700/70" aria-hidden="true"/><div className="absolute -right-2 -top-6 h-56 w-56 rounded-full border border-emerald-700/60" aria-hidden="true"/>
            <div className="relative max-w-3xl"><p className="eyebrow text-emerald-300"><span className="eyebrow-dot bg-emerald-300" />{ABOUT_CONFIG.trySection.eyebrow}</p><h2 id="try-title" className="mt-5 font-display text-3xl font-semibold tracking-[-.04em] sm:text-4xl">{ABOUT_CONFIG.trySection.title}</h2><p className="mt-4 max-w-2xl leading-7 text-emerald-100/80">{ABOUT_CONFIG.trySection.body}</p><p className="mt-4 flex gap-2 text-sm leading-6 text-emerald-200"><span aria-hidden="true">◈</span>{ABOUT_CONFIG.trySection.privacy}</p><a href={ABOUT_CONFIG.links.playground} className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">{ABOUT_CONFIG.trySection.button}<Icon name="arrow" className="h-4 w-4"/></a></div>
          </div>
        </section>

        <section className="bg-slate-100/70 py-20 dark:bg-[#1c2922] sm:py-24" aria-labelledby="quick-title">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:px-8"><div><p className="eyebrow"><span className="eyebrow-dot" />{ABOUT_CONFIG.quickStart.eyebrow}</p><h2 id="quick-title" className="section-title">{ABOUT_CONFIG.quickStart.title}</h2><p className="mt-5 max-w-sm leading-7 text-slate-600 dark:text-slate-300">{ABOUT_CONFIG.quickStart.copy}</p></div>
            <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[#101713] shadow-xl"><div className="flex items-center justify-between border-b border-white/10 px-5 py-3"><span className="font-mono text-[10px] uppercase tracking-[.16em] text-slate-400">{ABOUT_CONFIG.interface.terminalLanguage}</span><button type="button" onClick={copyCode} className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs text-slate-300 transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-emerald-400" aria-label={ABOUT_CONFIG.quickStart.copyLabel}><Icon name={copied ? "check" : "copy"} className="h-3.5 w-3.5"/>{copied ? ABOUT_CONFIG.interface.copied : ABOUT_CONFIG.interface.copy}</button></div><pre className="overflow-x-auto p-5 text-xs leading-7 text-emerald-100 sm:p-6 sm:text-sm"><code>{ABOUT_CONFIG.quickStart.code}</code></pre></div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:py-24 lg:px-8" aria-labelledby="limits-title">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><div><p className="eyebrow"><span className="eyebrow-dot" />{ABOUT_CONFIG.limits.eyebrow}</p><h2 id="limits-title" className="section-title">{ABOUT_CONFIG.limits.title}</h2></div><ul className="space-y-4">{ABOUT_CONFIG.limits.items.map((item) => <li key={item} className="flex gap-3 leading-7 text-slate-600 dark:text-slate-300"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-amber-500"/>{item}</li>)}</ul></div>
        </section>

        <section className="border-y border-slate-200 bg-white py-20 dark:border-[#35483d] dark:bg-[#1c2922] sm:py-24" aria-labelledby="creator-title">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:px-8"><div><p className="eyebrow"><span className="eyebrow-dot" />{ABOUT_CONFIG.creator.eyebrow}</p><h2 id="creator-title" className="section-title">{ABOUT_CONFIG.creator.title}</h2><p className="mt-5 leading-7 text-slate-600 dark:text-slate-300">{ABOUT_CONFIG.creator.bio}</p></div>
            <article className="rounded-3xl border border-slate-200 bg-[#f8faf7] p-6 dark:border-[#35483d] dark:bg-[#1c2922] sm:p-8"><div className="flex items-center gap-4"><div className="grid h-14 w-14 place-items-center rounded-2xl bg-emerald-900 font-display text-lg font-semibold text-white">{ABOUT_CONFIG.interface.githubInitials}</div><div><h3 className="font-display text-lg font-medium">{ABOUT_CONFIG.creator.profileName}</h3><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{ABOUT_CONFIG.creator.profileNote}</p></div><span className="ml-auto hidden rounded-full bg-emerald-100 px-3 py-1 font-mono text-[10px] text-emerald-900 sm:inline dark:bg-emerald-950 dark:text-emerald-300">{ABOUT_CONFIG.creator.openSourceBadge}</span></div><div className="mt-6 flex flex-wrap gap-2">{profileLinks.map((link) => <a key={link.label} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noreferrer" : undefined} className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 transition hover:border-emerald-500 hover:text-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:border-[#35483d] dark:bg-[#26372e] dark:text-slate-200 dark:hover:text-emerald-300">{link.label}<Icon name="external" className="h-3 w-3"/></a>)}</div></article>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:py-24 lg:px-8" aria-labelledby="contribute-title">
          <div className="flex flex-col justify-between gap-8 rounded-3xl border border-slate-200 p-7 dark:border-slate-700 sm:p-10 lg:flex-row lg:items-center"><div className="max-w-2xl"><p className="eyebrow"><span className="eyebrow-dot" />{ABOUT_CONFIG.contribute.eyebrow}</p><h2 id="contribute-title" className="mt-4 font-display text-3xl font-semibold tracking-[-.04em]">{ABOUT_CONFIG.contribute.title}</h2><p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">{ABOUT_CONFIG.contribute.body}</p></div><div className="flex shrink-0 flex-wrap gap-3">{ABOUT_CONFIG.links.contributing && <a href={ABOUT_CONFIG.links.contributing} className="button-secondary">{ABOUT_CONFIG.contribute.contributingLabel}<Icon name="arrow" className="h-4 w-4"/></a>}{ABOUT_CONFIG.links.issues && <a href={ABOUT_CONFIG.links.issues} className="button-primary">{ABOUT_CONFIG.contribute.issuesLabel}<Icon name="arrow" className="h-4 w-4"/></a>}</div></div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
