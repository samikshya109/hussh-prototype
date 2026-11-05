import type React from "react";
import { cn } from "@/lib/utils";
import { IMAGES } from "./content";

export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <a
      href="/#top"
      data-testid="brand-logo-link"
      className={cn("group inline-flex items-center gap-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold", className)}
    >
      <span className="relative block size-8 overflow-hidden rounded-full ring-1 ring-gold/40 transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-105">
        <img src={IMAGES.heroMascot} alt="" className="absolute inset-0 size-full scale-[1.6] object-cover object-[50%_66%]" />
      </span>
      <span className={cn("text-[22px] font-bold tracking-tight", tone === "dark" ? "text-[#f5f2ec]" : "text-ink")}>
        hu<span className={tone === "dark" ? "bg-gradient-to-b from-[#e8b56b] to-[#c98a3e] bg-clip-text text-transparent" : "text-[#a8731f]"}>ssh</span>
      </span>
    </a>
  );
}

export function Eyebrow({ children, tone = "dark", className }: { children: React.ReactNode; tone?: "dark" | "light"; className?: string }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2.5 font-mono text-[12px] font-medium uppercase tracking-[0.28em]",
        tone === "dark" ? "text-gold" : "text-gold-deep",
        className,
      )}
    >
      <span className={cn("h-px w-6", tone === "dark" ? "bg-gold/60" : "bg-gold-deep/50")} />
      {children}
    </p>
  );
}

/** Section eyebrow pill: one style for every section header (dot colour varies per section). */
export function SectionPill({ dot, tone = "light", children }: { dot: string; tone?: "light" | "dark"; children: React.ReactNode }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-semibold ring-1",
        tone === "dark" ? "bg-white/10 text-white ring-white/15" : "bg-white text-ink shadow-sm ring-black/5",
      )}
    >
      <span aria-hidden className={cn("size-2 rounded-full", dot)} />
      {children}
    </p>
  );
}

/** Shared section heading scale (h2) so every section reads at the same level. */
export const H2 = "mt-5 max-w-3xl text-4xl font-bold leading-[1.05] tracking-[-0.03em] sm:text-5xl";
export const SUB = "mt-5 max-w-2xl text-[17px] leading-relaxed";
