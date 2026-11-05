import { MotionConfig, motion } from "motion/react";
import { ArrowRight, Check, Lock, ShieldCheck, Sparkles, X } from "lucide-react";
import { ROWS, SHOWROOM, type Cell } from "@/components/hussh/tourData";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { Nav } from "@/components/hussh/Nav";
import { Footer } from "@/components/hussh/Footer";
import { EmailSignup } from "@/components/hussh/EmailSignup";
import { Products } from "@/components/hussh/Products";
import { HowItWorks } from "@/components/hussh/HowItWorks";
import { Marketplace } from "@/components/hussh/Marketplace";
import { AiRings } from "@/components/hussh/AiRings";
import { H2, SUB, SectionPill } from "@/components/hussh/Brand";
import type { MouseEvent } from "react";
import { HIGHLIGHT_EVENT, IMAGES } from "@/components/hussh/content";

/** Thin flowing contour lines for the dark closing section (decorative). */
function WaveLines() {
  const lines = Array.from({ length: 22 }, (_, i) => i);
  return (
    <svg aria-hidden className="pointer-events-none absolute inset-0 -z-10 size-full" viewBox="0 0 1440 800" preserveAspectRatio="none">
      {lines.map((i) => {
        const y = 20 + i * 36;
        const a = 10 + (i % 5) * 4;
        return (
          <path
            key={i}
            d={`M-20 ${y} C 240 ${y - a}, 420 ${y + a}, 720 ${y - a / 2} S 1200 ${y + a}, 1460 ${y - a / 3}`}
            fill="none"
            stroke="white"
            strokeOpacity={0.055 + (i % 3) * 0.015}
            strokeWidth={1}
          />
        );
      })}
    </svg>
  );
}

/** Quick-link: scroll the matching product card to the middle of the screen and spotlight it. */
function openProduct(e: MouseEvent<HTMLAnchorElement>, id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  e.preventDefault();
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  history.pushState(null, "", `#${id}`);
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
  window.dispatchEvent(new CustomEvent(HIGHLIGHT_EVENT, { detail: id }));
  el.focus({ preventScroll: true });
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[13px] font-semibold text-ink shadow-sm ring-1 ring-black/5", className)}>
      {children}
    </span>
  );
}

/* ---------- Comparison (semantic table) ---------- */

function CellView({ v, good }: { v: Cell; good: boolean }) {
  if (typeof v === "string") return <span className={cn("text-[15px] font-medium", good ? "text-ink" : "text-[#45474d]")}>{v}</span>;
  return (
    <span className="inline-flex items-center gap-2">
      <span aria-hidden className={cn("inline-grid size-7 place-items-center rounded-full", good ? "bg-mint text-ink" : "bg-[#fbe3df] text-[#a3341f]")}>
        {v ? <Check className="size-4" strokeWidth={2} /> : <X className="size-4" strokeWidth={2} />}
      </span>
      <span className="text-[14px] font-medium text-[#45474d]">{v ? "Yes" : "No"}</span>
    </span>
  );
}

function Compare() {
  return (
    // Dark band: sets the comparison apart from the light sections either side of it.
    <section aria-labelledby="compare-title" data-testid="home-compare" className="relative isolate overflow-clip bg-ink py-[60px] text-white sm:py-24">
      <WaveLines />
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <SectionPill dot="bg-butter" tone="dark">Side by side</SectionPill>
        <h2 id="compare-title" className={cn(H2, "text-white")}>hussh vs. typical cloud AI.</h2>
        <p className={cn(SUB, "text-white/75")}>The same helpful AI, on very different terms.</p>
        <ul className="mt-10 space-y-3 sm:hidden" data-testid="home-compare-mobile">
          {ROWS.map((r) => (
            <li key={r.label} className="rounded-[22px] bg-white p-5 ring-1 ring-black/5">
              <p className="text-[16px] font-bold text-ink">{r.label}</p>
              <dl className="mt-3 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-butter/40 p-3">
                  <dt className="text-[12px] font-semibold uppercase tracking-wider text-[#45474d]">hussh</dt>
                  <dd className="mt-1.5"><CellView v={r.hussh} good /></dd>
                </div>
                <div className="rounded-2xl bg-ivory p-3">
                  <dt className="text-[12px] font-semibold uppercase tracking-wider text-[#45474d]">Cloud AI</dt>
                  <dd className="mt-1.5"><CellView v={r.cloud} good={false} /></dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
        <div role="region" aria-labelledby="compare-title" tabIndex={0} className="mt-12 hidden overflow-x-auto rounded-[28px] sm:block bg-white shadow-[0_30px_70px_-40px_rgba(17,19,24,0.35)] ring-1 ring-black/5">
          <table className="w-full min-w-[560px] border-collapse text-left">
            <caption className="sr-only">How hussh compares with typical cloud AI</caption>
            <thead>
              <tr className="border-b border-[#ece7dc] text-[13px] font-semibold uppercase tracking-wider text-[#45474d]">
                <td className="px-5 py-5 sm:px-8 sm:py-8" />
                <th scope="col" className="px-3 py-5 sm:py-8"><span className="rounded-full bg-butter px-3 py-1 text-ink">hussh</span></th>
                <th scope="col" className="px-3 py-5 sm:py-8">Typical cloud AI</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.label} className="border-b border-[#f3efe6] last:border-0" data-testid="home-compare-row">
                  <th scope="row" className="w-[38%] px-5 py-4 text-[15px] font-semibold text-ink sm:px-8">{r.label}</th>
                  <td className="px-3 py-4"><CellView v={r.hussh} good /></td>
                  <td className="px-3 py-4"><CellView v={r.cloud} good={false} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-ivory">
        <a
          href="#main"
          data-testid="skip-to-content-link"
          className="sr-only z-[60] rounded-full bg-ink px-5 py-3 text-[15px] font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to main content
        </a>
        <Nav />
        <main id="main" tabIndex={-1} className="outline-none">
          {/* HERO */}
          <section id="top" aria-labelledby="home-headline" data-testid="home-hero" className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-clip pb-[60px] pt-[121px] sm:pb-12 sm:pt-[121px]">
            <div aria-hidden className="absolute -left-24 top-28 -z-10 size-80 rounded-full bg-bubble/50 blur-3xl" />
            <div aria-hidden className="absolute right-0 top-10 -z-10 size-96 rounded-full bg-butter/60 blur-3xl" />
            <div aria-hidden className="absolute bottom-0 left-1/3 -z-10 size-72 rounded-full bg-sky/50 blur-3xl" />
            <div className="mx-auto grid w-full max-w-[1240px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-12">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="lg:col-span-6">
                <Label><ShieldCheck aria-hidden className="size-4 shrink-0 text-emerald-700" strokeWidth={1.75} /> On-device · Encrypted · Free for life</Label>
                <h1 id="home-headline" data-testid="home-headline" className="mt-8 text-[44px] font-bold leading-[1.04] tracking-[-0.04em] text-ink sm:text-6xl lg:text-[66px] lg:[@media(max-height:800px)]:text-[54px]">
                  Private AI that <br className="hidden lg:block" /><span className="rounded-2xl bg-butter px-2 [box-decoration-break:clone]">lives with you,</span> <br className="hidden lg:block" />not in the cloud.
                </h1>
                <p className="mt-7 max-w-lg text-lg leading-relaxed text-[#45474d]">
                  Meet the One family: an assistant, a home computer and a wearable. Your messages, money and files stay on your own device, where only you can see them.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <a href="#get-started" data-testid="home-hero-cta" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-[16px] font-semibold text-white transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-[#34343a]">
                    Get Agent One, free <ArrowRight aria-hidden className="size-4" />
                  </a>
                  <a href="#how-it-works" data-testid="home-hero-tour-link" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 py-3.5 text-[16px] font-semibold text-ink shadow-sm ring-1 ring-black/10 transition-transform duration-200 hover:-translate-y-0.5">
                    See how it works
                  </a>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.15 }} className="relative lg:col-span-6">
                <img src={IMAGES.mascotPastel} alt="The hussh mascot, finger to its lips, among pastel shapes with lock, calendar and check icons" className="mx-auto w-full max-w-[460px] lg:[@media(max-height:800px)]:max-w-[360px] mix-blend-multiply [mask-image:radial-gradient(closest-side,#000_78%,transparent)]" data-testid="home-hero-image" />
                {/* Badges drift on slow, offset loops (motion turns this off for reduced-motion users). */}
                <motion.div
                  className="absolute bottom-6 left-0 hidden sm:block"
                  data-testid="home-badge-brief"
                  animate={{ y: [0, -8, 0], x: [0, 4, 0], rotate: [0, -1, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Label><Sparkles aria-hidden className="size-4 text-[#a3341f]" strokeWidth={1.75} /> Your morning brief is ready</Label>
                </motion.div>
                <motion.div
                  className="absolute right-2 top-10 hidden sm:block"
                  data-testid="home-badge-device"
                  animate={{ y: [0, 7, 0], x: [0, -3, 0], rotate: [0, 1, 0] }}
                  transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                >
                  <Label><Lock aria-hidden className="size-4" strokeWidth={1.75} /> Stays on your device</Label>
                </motion.div>
              </motion.div>
            </div>

            {/* quick links */}
            <nav aria-label="Products" className="mx-auto mt-12 w-full max-w-[1240px] px-5 sm:px-8 lg:mt-10">
              <ul className="grid gap-4 sm:grid-cols-3" data-testid="home-quick-links">
                {SHOWROOM.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} onClick={(e) => openProduct(e, s.id)} data-testid={`home-quick-link-${s.id}`} className={cn("group flex min-h-16 items-center justify-between rounded-2xl px-5 py-4 transition-transform duration-200 hover:-translate-y-0.5", s.bg)}>
                      <span className="flex items-center gap-3">
                        <s.Icon aria-hidden className="size-5 text-ink" strokeWidth={1.75} />
                        <span>
                          <span className="block font-bold text-ink">{s.name}</span>
                          <span className="block text-[13px] text-[#45474d]">{s.tag}</span>
                        </span>
                      </span>
                      <ArrowRight aria-hidden className="size-4 text-ink transition-transform duration-200 group-hover:translate-x-1" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </section>

          <Products />
          <HowItWorks />
          <Compare />
          <Marketplace />
          <AiRings />

          {/* CLOSING CTA (dark) */}
          <section id="get-started" aria-labelledby="home-cta-title" data-testid="home-cta" className="relative isolate overflow-clip bg-ink px-5 py-[60px] text-[#f5f2ec] sm:px-8 sm:py-24">
            <WaveLines />
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }}
              className="relative mx-auto grid max-w-[1176px] items-center gap-10 rounded-[40px] border border-gold/25 bg-[radial-gradient(80%_100%_at_100%_50%,rgba(232,181,107,0.2),transparent_60%),rgba(40,40,44,0.7)] backdrop-blur-[2px] px-6 py-12 sm:px-14 sm:py-16 lg:grid-cols-12"
            >
              <div className="lg:col-span-7">
                <SectionPill dot="bg-gold" tone="dark">Your turn</SectionPill>
                <h2 id="home-cta-title" data-testid="home-cta-title" className={cn(H2, "text-white")}>Bring your life back home.</h2>
                <p className="mt-4 text-[17px] text-white/80">Agent One is free for life. Leave your email and we will send your invite. Nothing else.</p>
                <EmailSignup source="agent_one" tone="dark" ctaLabel="Get Agent One" successTitle="Your Agent One invite is on its way" testIdPrefix="agent-one-signup" note="We only use your email to send your invite. Unsubscribe anytime." className="mt-8 max-w-[480px]" />
              </div>
              <img src={IMAGES.mascotVault} alt="The hussh mascot hugging a golden vault" className="mx-auto w-56 rounded-full object-cover [mask-image:radial-gradient(circle,#000_50%,transparent_70%)] sm:w-72 lg:col-span-5" />
            </motion.div>
          </section>
        </main>
        <Footer />
        <Toaster richColors />
      </div>
    </MotionConfig>
  );
}
