import { useEffect, useRef, useState, type ComponentType } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, BadgeDollarSign, Building2, ChevronDown, Cpu, Menu, Search, Sparkles, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Logo } from "./Brand";
import { NAV, type NavGroup } from "./content";
import { AccountButton, MobileAccount } from "@/components/auth/AccountButton";

const GROUP_ICONS: Record<string, ComponentType<{ className?: string; strokeWidth?: number }>> = {
  "agent-one": Sparkles,
  products: Cpu,
  marketplace: BadgeDollarSign,
  business: Building2,
  company: Users,
};

function DesktopDropdown({ group, onClose, alignRight }: { group: NavGroup; onClose: () => void; alignRight: boolean }) {
  const Icon = GROUP_ICONS[group.id] ?? Sparkles;
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={cn("absolute top-full z-50 w-[640px] pt-3", alignRight ? "right-0" : "left-0")}
      data-testid={`nav-dropdown-${group.id}`}
    >
      <div className="grid grid-cols-[220px_1fr] overflow-hidden rounded-[24px] border border-white/10 bg-[#1f1f22] shadow-[0_30px_80px_-24px_rgba(0,0,0,0.6)]">
        <div className="relative flex flex-col overflow-hidden bg-[radial-gradient(130%_90%_at_0%_0%,rgba(232,181,107,0.22),transparent_62%),#28282c] p-6">
          <span className="grid size-11 place-items-center rounded-2xl bg-gradient-to-b from-[#e8b56b] to-[#c98a3e] text-[#1f1f22]">
            <Icon className="size-5" strokeWidth={1.75} />
          </span>
          <p className="mt-5 text-[17px] font-bold text-white">{group.label}</p>
          <p className="mt-2 text-[14px] leading-relaxed text-white/75">{group.blurb}</p>
          <a
            href="#get-started"
            onClick={onClose}
            data-testid={`nav-dropdown-${group.id}-cta`}
            className="mt-auto inline-flex min-h-11 items-center gap-1.5 self-start pt-5 text-[14px] font-semibold text-gold transition-colors duration-150 hover:text-gold-soft"
          >
            Get Agent One, free <ArrowUpRight aria-hidden className="size-4" strokeWidth={1.75} />
          </a>
        </div>
        <ul className="grid gap-1 p-3">
          {group.links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                onClick={onClose}
                data-testid={`nav-link-${group.id}-${l.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                className="group flex min-h-11 items-start justify-between gap-3 rounded-2xl px-4 py-3 transition-colors duration-150 hover:bg-white/[0.06]"
              >
                <span className="min-w-0">
                  <span className="flex flex-wrap items-center gap-2 text-[15px] font-semibold text-white">
                    {l.label}
                    {l.badge && (
                      <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[12px] font-semibold text-gold">{l.badge}</span>
                    )}
                  </span>
                  <span className="mt-0.5 block text-[14px] leading-snug text-white/70">{l.desc}</span>
                </span>
                <ArrowUpRight aria-hidden className="mt-1 size-4 shrink-0 text-white/50 transition-[transform,color] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold" strokeWidth={1.75} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

/** tone="light" = ivory header with dark text (light pages); default is the dark glass header. */
export function Nav({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const light = tone === "light";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>("agent-one");
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const closeTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const enter = (id: string) => {
    window.clearTimeout(closeTimer.current);
    setOpen(id);
  };
  const leave = () => {
    closeTimer.current = window.setTimeout(() => setOpen(null), 140);
  };

  const allLinks = NAV.flatMap((g) => g.links.map((l) => ({ ...l, group: g.label })));
  const results = query.trim()
    ? allLinks.filter((l) => `${l.label} ${l.desc} ${l.group}`.toLowerCase().includes(query.trim().toLowerCase()))
    : allLinks.slice(0, 6);

  return (
    <header
      data-testid="site-header"
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter,padding] duration-300",
        light
          ? scrolled
            ? "border-b border-black/[0.06] bg-[#faf8f5]/85 py-2.5 shadow-[0_10px_30px_-18px_rgba(13,15,18,0.25)] backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent bg-[#faf8f5]/60 py-4 backdrop-blur-md"
          : scrolled
            ? "border-b border-white/10 bg-[#1f1f22]/95 py-2.5 shadow-[0_12px_30px_-16px_rgba(0,0,0,0.45)] backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-white/[0.06] bg-[#1f1f22] py-3.5",
      )}
    >
      <div className="mx-auto flex max-w-[1240px] items-center gap-6 px-5 sm:px-8">
        <Logo tone={light ? "light" : "dark"} />

        <nav aria-label="Main" className="ml-6 hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map((g, gi) => (
              <li key={g.id} className="relative" onMouseEnter={() => enter(g.id)} onMouseLeave={leave}>
                <button
                  type="button"
                  aria-expanded={open === g.id}
                  onClick={() => setOpen(open === g.id ? null : g.id)}
                  data-testid={`nav-trigger-${g.id}`}
                  className={cn(
                    "inline-flex min-h-11 items-center gap-1 rounded-full px-3.5 py-2 text-[15px] font-medium transition-colors duration-150",
                    light
                      ? open === g.id ? "bg-ink/[0.06] text-ink" : "text-[#45474d] hover:text-ink"
                      : open === g.id ? "bg-white/[0.08] text-white" : "text-white/70 hover:text-white",
                  )}
                >
                  {g.label}
                  <ChevronDown className={cn("size-3.5 opacity-60 transition-transform duration-200", open === g.id && "rotate-180")} />
                </button>
                <AnimatePresence>{open === g.id && <DesktopDropdown group={g} alignRight={gi >= 3} onClose={() => setOpen(null)} />}</AnimatePresence>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <button
            type="button"
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
            data-testid="nav-search-button"
            className={cn(
              "grid size-11 place-items-center rounded-full transition-colors duration-150",
              light ? "text-[#45474d] hover:bg-ink/[0.06] hover:text-ink" : "text-white/70 hover:bg-white/[0.08] hover:text-white",
            )}
          >
            <Search className="size-[18px]" strokeWidth={1.75} />
          </button>
          <AccountButton tone={tone} />
          <a
            href="#get-started"
            data-testid="nav-get-agent-one-button"
            className="ml-1.5 hidden min-h-11 items-center rounded-full bg-gold px-5 py-2.5 text-[15px] font-semibold text-[#1f1f22] shadow-[0_0_28px_-6px_rgba(232,181,107,0.6)] transition-[transform,background-color] duration-200 hover:-translate-y-px hover:bg-gold-soft active:scale-95 sm:inline-flex"
          >
            Get Agent One
          </a>
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            data-testid="nav-mobile-menu-button"
            className={cn("grid size-11 place-items-center rounded-full transition-colors duration-150 lg:hidden", light ? "text-ink hover:bg-ink/[0.06]" : "text-white hover:bg-white/[0.08]")}
          >
            <Menu className="size-5" />
          </button>
        </div>
      </div>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="right" className="dark w-[88vw] max-w-sm border-white/10 bg-[#1f1f22] p-0 text-[#f5f2ec]" data-testid="nav-mobile-drawer">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <div className="flex h-full flex-col overflow-y-auto px-6 pb-8 pt-6">
            <Logo />
            <ul className="mt-10 divide-y divide-white/10 border-y border-white/10">
              {NAV.map((g) => (
                <li key={g.id}>
                  <button
                    type="button"
                    onClick={() => setMobileGroup(mobileGroup === g.id ? null : g.id)}
                    data-testid={`mobile-nav-trigger-${g.id}`}
                    className="flex w-full items-center justify-between py-4 text-left text-lg font-semibold"
                  >
                    {g.label}
                    <ChevronDown className={cn("size-4 text-white/70 transition-transform duration-200", mobileGroup === g.id && "rotate-180 text-gold")} />
                  </button>
                  <AnimatePresence initial={false}>
                    {mobileGroup === g.id && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className="overflow-hidden"
                      >
                        {g.links.map((l) => (
                          <li key={l.label}>
                            <a
                              href={l.href}
                              onClick={() => setMobileOpen(false)}
                              data-testid={`mobile-nav-link-${g.id}-${l.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                              className="block pb-3 pl-3 text-[15px] text-white/65 hover:text-gold"
                            >
                              {l.label}
                            </a>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>
            <div className="mt-auto space-y-3 pt-10">
              <a
                href="#get-started"
                onClick={() => setMobileOpen(false)}
                data-testid="mobile-nav-get-agent-one-button"
                className="flex w-full items-center justify-center rounded-full bg-gold py-3.5 font-semibold text-ink"
              >
                Get Agent One — free
              </a>
              <MobileAccount onNavigate={() => setMobileOpen(false)} />
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <Dialog open={searchOpen} onOpenChange={(v) => { setSearchOpen(v); if (!v) setQuery(""); }}>
        <DialogContent className="dark border-white/10 bg-[#28282c] p-0 text-[#f5f2ec] sm:max-w-lg" data-testid="search-dialog">
          <DialogTitle className="sr-only">Search hussh</DialogTitle>
          <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4 transition-[border-color,background-color] duration-200 focus-within:border-gold/70 focus-within:bg-white/[0.03]">
            <Search aria-hidden className="size-4 text-gold" strokeWidth={1.75} />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, guides, company…"
              data-testid="search-input"
              aria-label="Search hussh"
              type="search"
              autoComplete="off"
              className="min-w-0 flex-1 bg-transparent text-[15px] text-white outline-none placeholder:text-white/70 [&::-webkit-search-cancel-button]:hidden"
            />
          </div>
          <ul className="max-h-80 overflow-y-auto p-2" data-testid="search-results">
            {results.length === 0 && <li className="px-4 py-6 text-sm text-white/70">Nothing found for “{query}”.</li>}
            {results.map((r) => (
              <li key={`${r.group}-${r.label}`}>
                <a
                  href={r.href}
                  onClick={() => setSearchOpen(false)}
                  className="flex items-center justify-between rounded-lg px-3 py-2.5 transition-colors duration-150 hover:bg-white/[0.06]"
                  data-testid="search-result-item"
                >
                  <span>
                    <span className="block text-sm font-medium">{r.label}</span>
                    <span className="block text-xs text-white/70">{r.desc}</span>
                  </span>
                  <span className="font-mono text-[12px] uppercase tracking-wider text-white/70">{r.group}</span>
                </a>
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>
    </header>
  );
}
