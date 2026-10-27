import { useEffect, useState, type ReactNode } from "react";
import { createRoot, type Root } from "react-dom/client";
import "./about.css";

const SITE = {
  brand: "pk-validate",
  nav: [
    { label: "Home", href: "/" },
    { label: "Playground", href: "/playground.html" },
    { label: "About", href: "/about.html" },
    { label: "Docs", href: "/docs.html" },
    { label: "GitHub", href: "https://github.com/SilentCoder-HI/pk-validate", external: true },
  ],
  footer: { license: "MIT License", made: "Made in Pakistan 🇵🇰", github: "GitHub", npm: "npm" },
  links: {
    github: "https://github.com/SilentCoder-HI/pk-validate",
    npm: "https://www.npmjs.com/package/pk-validate",
  },
  labels: {
    menuOpen: "Open navigation menu", menuClose: "Close navigation menu",
    light: "Switch to light mode", dark: "Switch to dark mode", external: "opens in a new tab",
  },
} as const;

function Icon({ name }: { name: "sun" | "moon" }) {
  return name === "sun"
    ? <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><circle cx="12" cy="12" r="3.5"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></svg>
    : <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M20.7 14.3A8.8 8.8 0 0 1 9.7 3.3 9 9 0 1 0 20.7 14.3Z"/></svg>;
}

function initialTheme(): "light" | "dark" {
  try {
    const stored = localStorage.getItem("pk-validate-theme");
    if (stored === "light" || stored === "dark") return stored;
  } catch { /* Use system preference if storage is unavailable. */ }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function SiteHeader({ current }: { current: string }) {
  const [theme, setTheme] = useState<"light" | "dark">(initialTheme);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#111713" : "#f6f7f4");
  }, [theme]);

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next === "dark" ? "#111713" : "#f6f7f4");
    try { localStorage.setItem("pk-validate-theme", next); } catch { /* Optional preference only. */ }
  }

  return <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-[#f7f8f5]/90 backdrop-blur-xl dark:border-[#35483d] dark:bg-[#101713]/90">
    <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 lg:px-8" aria-label="Main navigation">
      <a href="/" className="flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600" aria-label="pk-validate home">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-800 font-mono text-sm font-bold tracking-tight text-white">pk<span className="text-emerald-300">.</span></span>
        <span className="font-display text-sm font-semibold tracking-tight">{SITE.brand}<span className="ml-2 hidden rounded-md bg-slate-100 px-2 py-1 font-mono text-[10px] font-medium text-slate-500 sm:inline dark:bg-[#1c2922] dark:text-slate-400">PLAYGROUND</span></span>
      </a>
      <div className="hidden items-center gap-1 md:flex">{SITE.nav.map((item) => <a key={item.label} href={item.href} target={"external" in item ? "_blank" : undefined} rel={"external" in item ? "noreferrer" : undefined} aria-current={item.label === current ? "page" : undefined} className={`rounded-full px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${item.label === current ? "bg-emerald-100 text-emerald-950 dark:bg-[#26372e] dark:text-emerald-100" : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-[#1c2922] dark:hover:text-white"}`}>{item.label}{"external" in item && <span className="sr-only"> ({SITE.labels.external})</span>}</a>)}</div>
      <div className="flex items-center gap-2">
        <button type="button" onClick={toggleTheme} className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 text-slate-700 transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:border-[#35483d] dark:text-slate-200 dark:hover:bg-[#1c2922]" aria-label={theme === "light" ? SITE.labels.dark : SITE.labels.light}><Icon name={theme === "light" ? "moon" : "sun"}/></button>
        <button type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={menuOpen ? SITE.labels.menuClose : SITE.labels.menuOpen} className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 text-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 md:hidden dark:border-[#35483d] dark:text-slate-200"><span className="text-lg leading-none" aria-hidden="true">{menuOpen ? "×" : "☰"}</span></button>
      </div>
    </nav>
    {menuOpen && <div className="border-t border-slate-200 px-5 py-3 md:hidden dark:border-[#35483d]"><div className="mx-auto flex max-w-7xl flex-col gap-1">{SITE.nav.map((item) => <a key={item.label} href={item.href} target={"external" in item ? "_blank" : undefined} rel={"external" in item ? "noreferrer" : undefined} aria-current={item.label === current ? "page" : undefined} onClick={() => setMenuOpen(false)} className={`rounded-full px-3 py-2 text-sm font-medium ${item.label === current ? "bg-emerald-100 text-emerald-950 dark:bg-[#26372e] dark:text-emerald-100" : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-[#1c2922]"}`}>{item.label}</a>)}</div></div>}
  </header>;
}

export function SiteFooter() {
  return <footer className="border-t border-slate-200 dark:border-[#35483d]"><div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-7 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8 dark:text-slate-400"><a href="/" className="flex items-center gap-2 font-medium text-slate-800 dark:text-slate-100"><span className="grid h-7 w-7 place-items-center rounded-lg bg-emerald-800 font-mono text-[11px] text-white">pk<span className="text-emerald-300">.</span></span>{SITE.brand}</a><div className="flex flex-wrap items-center gap-x-4 gap-y-2"><span>{SITE.footer.license}</span><span>{SITE.footer.made}</span><span>© {new Date().getFullYear()}</span><a className="hover:text-emerald-700 dark:hover:text-emerald-300" href={SITE.links.github} target="_blank" rel="noreferrer">{SITE.footer.github}</a><a className="hover:text-emerald-700 dark:hover:text-emerald-300" href={SITE.links.npm} target="_blank" rel="noreferrer">{SITE.footer.npm}</a></div></div></footer>;
}

export function SiteLayout({ current, children }: { current: string; children: ReactNode }) {
  return <div className="min-h-screen bg-[#f7f8f5] text-slate-900 transition-colors dark:bg-[#101713] dark:text-slate-100"><a className="skip-link" href="#main">Skip to main content</a><SiteHeader current={current}/>{children}<SiteFooter/></div>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow"><span className="eyebrow-dot"/>{children}</p>;
}

export function ArrowIcon() {
  return <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>;
}

export function mountSite(element: ReactNode) {
  const container = document.getElementById("root") as (HTMLElement & { __pkValidateRoot?: Root });
  container.__pkValidateRoot ??= createRoot(container);
  container.__pkValidateRoot.render(element);
}
