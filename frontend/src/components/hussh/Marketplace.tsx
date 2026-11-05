import type { ComponentType, ReactNode } from "react";
import { motion } from "motion/react";
import { ArrowRight, BadgeDollarSign, Check, ListChecks, Lock, ShieldCheck, UserCheck, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import { H2, SectionPill } from "./Brand";

type IconType = ComponentType<{ className?: string; strokeWidth?: number }>;

const reveal = (i: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
});

function UspCard({
  i, id, Icon, title, body, tint, className, children,
}: {
  i: number; id: string; Icon: IconType; title: string; body: string; tint: string; className?: string; children: ReactNode;
}) {
  return (
    <motion.article
      {...reveal(i)}
      data-testid={`market-usp-${id}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[28px] p-6 ring-1 ring-black/5 transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(31,31,34,0.35)] sm:p-8",
        tint,
        className,
      )}
    >
      <span className="grid size-11 place-items-center rounded-2xl bg-white text-ink shadow-sm ring-1 ring-black/5">
        <Icon className="size-5" strokeWidth={1.75} />
      </span>
      <h3 className="mt-5 text-[22px] font-bold leading-tight tracking-[-0.02em] text-ink">{title}</h3>
      <p className="mt-2 max-w-md text-[16px] leading-relaxed text-[#45474d]">{body}</p>
      <div aria-hidden className="mt-7 flex flex-1 items-end">{children}</div>
    </motion.article>
  );
}

/* ---------- small illustrations (decorative, aria-hidden via the card) ---------- */

function ShareArt() {
  const rows = [
    { label: "Spending categories", on: true },
    { label: "Shopping habits", on: true },
    { label: "Travel plans", on: false },
  ];
  return (
    <div className="grid w-full gap-2.5 sm:grid-cols-2">
      {rows.map((r) => (
        <div key={r.label} className="flex items-center justify-between gap-3 rounded-2xl bg-white px-4 py-3 ring-1 ring-black/5">
          <span className="text-[14px] font-semibold text-ink">{r.label}</span>
          <span className={cn("relative h-6 w-10 shrink-0 rounded-full", r.on ? "bg-ink" : "bg-[#d9d3c6]")}>
            <span className={cn("absolute top-1 size-4 rounded-full bg-white", r.on ? "left-5" : "left-1")} />
          </span>
        </div>
      ))}
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-dashed border-ink/25 px-4 py-3">
        <span className="text-[14px] font-semibold text-ink">Messages and name</span>
        <span className="inline-flex shrink-0 items-center gap-1 text-[13px] font-semibold text-[#45474d]">
          <Lock className="size-3.5" strokeWidth={1.75} /> Never shared
        </span>
      </div>
    </div>
  );
}

function PriceArt() {
  return (
    <div className="w-full">
      <div className="flex items-end gap-2">
        <span className="text-5xl font-bold tracking-[-0.04em] text-ink">$12</span>
        <span className="pb-1.5 font-mono text-[13px] text-[#45474d]">/ request</span>
      </div>
      <div className="relative mt-5 h-2 rounded-full bg-ivory-2">
        <span className="absolute inset-y-0 left-0 w-[30%] rounded-full bg-ink" />
        <span className="absolute left-[30%] top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white bg-ink shadow" />
      </div>
      <p className="mt-3 flex justify-between font-mono text-[12px] text-[#45474d]"><span>$1</span><span>Your floor</span><span>$40</span></p>
    </div>
  );
}

function ApproveArt() {
  return (
    <div className="w-full rounded-2xl bg-white p-4 ring-1 ring-black/5">
      <div className="flex items-center gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-sky/60 text-[13px] font-bold text-ink">NR</span>
        <div className="min-w-0">
          <p className="truncate text-[14px] font-semibold text-ink">Northwind Research</p>
          <p className="text-[13px] text-[#45474d]">Spending categories · 30 days</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <span className="inline-flex min-h-10 items-center justify-center rounded-full bg-ivory-2 text-[14px] font-semibold text-ink">Decline</span>
        <span className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-full bg-ink text-[14px] font-semibold text-white">
          <Check className="size-4" strokeWidth={2} /> Approve
        </span>
      </div>
    </div>
  );
}

function EarnArt() {
  const bars = [34, 52, 44, 70, 62, 88];
  return (
    <div className="flex w-full flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-[13px] font-semibold uppercase tracking-wider text-[#45474d]">Earned this month</p>
        <p className="mt-1 text-5xl font-bold tracking-[-0.04em] text-ink">$57.00</p>
        <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[13px] font-semibold text-ink ring-1 ring-black/5">
          <ShieldCheck className="size-4 text-emerald-700" strokeWidth={1.75} /> 0% hussh fee
        </p>
      </div>
      <div className="flex h-28 items-end gap-2">
        {bars.map((h, i) => (
          <span
            key={`bar-${i}-${h}`}
            className={cn("w-6 rounded-t-lg", i === bars.length - 1 ? "bg-ink" : "bg-white ring-1 ring-black/5")}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
}

export function Marketplace() {
  return (
    <section id="marketplace" aria-labelledby="market-title" data-testid="home-marketplace" className="relative isolate overflow-clip py-[60px] sm:py-24">
      <div aria-hidden className="absolute -left-24 bottom-10 -z-10 size-96 rounded-full bg-bubble/40 blur-3xl" />
      <div aria-hidden className="absolute left-1/4 top-20 -z-10 size-72 rounded-full bg-butter/50 blur-3xl" />
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="max-w-3xl">
          <SectionPill dot="bg-mint">Information Marketplace</SectionPill>
          <h2 id="market-title" className={cn(H2, "text-ink")}>
            Your info. Your price. <span className="bg-[linear-gradient(transparent_62%,#ffe08a_62%)] px-1">Your call.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-[#45474d]">
            Companies already profit from your data. With hussh, that value comes back to you, and nothing is shared until you say yes.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          <UspCard i={0} id="share" Icon={ListChecks} tint="bg-butter/45" className="lg:col-span-7"
            title="You choose what's shared"
            body="Pick the details, like spending categories. Your name and your messages are never on the table.">
            <ShareArt />
          </UspCard>
          <UspCard i={1} id="price" Icon={BadgeDollarSign} tint="bg-white" className="lg:col-span-5"
            title="You set the price"
            body="Decide what your info is worth. Offers below your price never reach you.">
            <PriceArt />
          </UspCard>
          <UspCard i={2} id="approve" Icon={UserCheck} tint="bg-white" className="lg:col-span-5"
            title="Nothing moves without your yes"
            body="See who's asking, what for and for how long. Every request waits for you.">
            <ApproveArt />
          </UspCard>
          <UspCard i={3} id="earn" Icon={Wallet} tint="bg-mint/45" className="lg:col-span-7"
            title="You keep 100% of what you earn"
            body="No cut and no fine print. You can revoke access whenever you like.">
            <EarnArt />
          </UspCard>
        </div>

        <p className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-[15px] text-[#45474d]" data-testid="market-note">
          The Information Marketplace is in preview.
          <a href="#get-started" data-testid="market-join-link" className="inline-flex min-h-11 items-center gap-1 font-semibold text-ink underline underline-offset-4 hover:text-gold-deep">
            Join Agent One to try it first <ArrowRight aria-hidden className="size-4" strokeWidth={1.75} />
          </a>
        </p>
      </div>
    </section>
  );
}
