import { useState } from "react";
import { motion } from "motion/react";
import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { H2, SectionPill } from "./Brand";
import { AI_BRANDS, IMAGES } from "./content";

const RINGS = [
  { id: "you", n: 1, title: "You", body: "Every decision starts and ends with you. Nothing moves without your say.", size: 30, tint: "bg-butter/70" },
  { id: "device", n: 2, title: "Your device", body: "Agent One runs locally on your phone, your laptop or Puppy One at home.", size: 54, tint: "bg-sky/35" },
  { id: "vault", n: 3, title: "Encrypted vault", body: "Your mail, money and files, sealed with a key only you hold.", size: 77, tint: "bg-mint/35" },
  { id: "shield", n: 4, title: "Consent shield", body: "When you ask an outside AI, only the question passes. Never the context.", size: 100, tint: "bg-bubble/25" },
] as const;

type RingId = (typeof RINGS)[number]["id"];

// Brand chips orbit just outside the outer ring (angles in degrees, 0 = right, clockwise).
const ANGLES = [-90, -38, 10, 55, 125, 170, 218];

function BrandChip({ name, logo, className }: { name: string; logo: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-white px-3.5 py-2 text-[14px] font-semibold text-ink shadow-[0_10px_30px_-16px_rgba(13,15,18,0.4)] ring-1 ring-black/[0.06]",
        className,
      )}
      data-testid={`ai-brand-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
    >
      <img src={logo} alt="" className="size-[18px] shrink-0" width={18} height={18} />
      {name}
    </span>
  );
}

export function AiRings() {
  const [active, setActive] = useState<RingId | null>(null);

  return (
    <section id="ecosystem" aria-labelledby="rings-title" data-testid="home-ecosystem" className="relative isolate overflow-clip bg-white py-[60px] sm:py-24">
      <div aria-hidden className="absolute -right-32 top-10 -z-10 size-[28rem] rounded-full bg-butter/40 blur-3xl" />
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <SectionPill dot="bg-bubble">Works with your current AI</SectionPill>
        <h2 id="rings-title" className={cn(H2, "text-ink")}>
          Four rings between your life and the world.
        </h2>
        <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-[#45474d]">
          Keep the AI you love. hussh sits between you and it as a private shield, so it gets your question, never your identity.
        </p>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-12">
          {/* Diagram */}
          <div className="lg:col-span-7">
            <div className="mx-auto w-full max-w-[600px] sm:px-16 sm:py-12">
              <div className="relative aspect-square w-full" data-testid="rings-diagram" role="img" aria-label="Four nested rings: you at the centre, then your device, your encrypted vault and the consent shield. Gemini, Siri, ChatGPT, Claude, Grok, Meta AI and Copilot sit outside the outer ring.">
                {[...RINGS].reverse().map((r) => {
                  const on = active === r.id;
                  return (
                    <div
                      key={r.id}
                      onMouseEnter={() => setActive(r.id)}
                      onMouseLeave={() => setActive(null)}
                      className={cn(
                        "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-[background-color,border-color,box-shadow] duration-300",
                        on ? "border-2 border-gold-deep shadow-[0_0_0_6px_rgba(232,181,107,0.18)]" : "border-[#d9d3c6]",
                        on ? r.tint : r.id === "you" ? "bg-white" : "bg-ivory/70",
                      )}
                      style={{ width: `${r.size}%`, height: `${r.size}%` }}
                      data-testid={`ring-${r.id}`}
                      data-active={on}
                    >
                      {r.id !== "you" && (
                        <span className="absolute left-1/2 top-[5%] -translate-x-1/2 whitespace-nowrap font-mono text-[12px] font-medium uppercase tracking-[0.16em] text-[#45474d] sm:text-[12px]" aria-hidden>
                          {r.title}
                        </span>
                      )}
                    </div>
                  );
                })}
                <div className="absolute left-1/2 top-1/2 grid size-[26%] -translate-x-1/2 -translate-y-1/2 place-items-center overflow-hidden rounded-full ring-2 ring-gold/60">
                  <img src={IMAGES.mascotPastel} alt="" className="size-full scale-[1.5] object-cover" />
                </div>

                {/* Brand chips around the outside (sm and up) */}
                {AI_BRANDS.map((b, i) => {
                  const a = (ANGLES[i] * Math.PI) / 180;
                  const x = 50 + 57 * Math.cos(a);
                  const y = 50 + 57 * Math.sin(a);
                  return (
                    // Outer div owns the centring translate; motion only scales the inner one,
                    // so its transform never overrides the -50% offsets.
                    <div
                      key={b.name}
                      className="absolute hidden -translate-x-1/2 -translate-y-1/2 sm:block"
                      style={{ left: `${x}%`, top: `${y}%` }}
                    >
                      <motion.div
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 + i * 0.06, duration: 0.45 }}
                      >
                        <BrandChip name={b.name} logo={b.logo} />
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>
            <ul className="mt-8 flex flex-wrap justify-center gap-2.5 sm:hidden" aria-label="AI tools hussh works with">
              {AI_BRANDS.map((b) => (
                <li key={b.name}><BrandChip name={b.name} logo={b.logo} /></li>
              ))}
            </ul>
          </div>

          {/* Legend */}
          <div className="lg:col-span-5">
            <ol className="space-y-2" data-testid="rings-legend">
              {RINGS.map((r) => {
                const on = active === r.id;
                return (
                  <li key={r.id}>
                    <button
                      type="button"
                      aria-pressed={on}
                      onMouseEnter={() => setActive(r.id)}
                      onMouseLeave={() => setActive(null)}
                      onFocus={() => setActive(r.id)}
                      onBlur={() => setActive(null)}
                      onClick={() => setActive(on ? null : r.id)}
                      data-testid={`rings-legend-${r.id}`}
                      className={cn(
                        "flex w-full gap-4 rounded-[22px] p-4 text-left transition-[background-color,box-shadow] duration-300 sm:p-5",
                        on ? "bg-ivory shadow-[0_14px_40px_-26px_rgba(13,15,18,0.35)] ring-1 ring-black/5" : "hover:bg-ivory/60",
                      )}
                    >
                      <span className="w-6 shrink-0 pt-0.5 font-mono text-[18px] font-semibold text-gold-deep">{r.n}</span>
                      <span>
                        <span className="block text-[19px] font-bold text-ink">{r.title}</span>
                        <span className="mt-1 block text-[15px] leading-relaxed text-[#45474d]">{r.body}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
            {/* Outside the rings: same row rhythm as the legend items, with the tool logos as its marker */}
            <div className="mt-2 flex gap-4 rounded-[22px] bg-ivory/70 p-4 ring-1 ring-black/5 sm:p-5" data-testid="rings-outside">
              <span className="w-6 shrink-0 pt-0.5 font-mono text-[18px] font-semibold text-gold-deep" aria-hidden>+</span>
              <span className="min-w-0">
                <span className="block text-[19px] font-bold text-ink">Outside the rings</span>
                <span className="mt-1 block text-[15px] leading-relaxed text-[#45474d]">Your favourite AI tools. Useful and welcome, but never inside.</span>
                <span className="mt-3 flex -space-x-1.5" aria-hidden>
                  {AI_BRANDS.map((b) => (
                    <span key={b.name} className="grid size-8 place-items-center rounded-full bg-white ring-2 ring-ivory">
                      <img src={b.logo} alt="" className="size-4" />
                    </span>
                  ))}
                </span>
              </span>
            </div>
          </div>
        </div>

        <p className="mt-14 flex items-start gap-2.5 border-t border-[#ece7dc] pt-6 text-[13px] leading-relaxed text-[#5b5f68]" data-testid="rings-disclaimer">
          <ShieldCheck aria-hidden className="mt-0.5 size-4 shrink-0 text-[#5b5f68]" strokeWidth={1.75} />
          <span>Assistant names and logos show technical API and MCP interoperability only. They belong to their owners and do not imply endorsement.</span>
        </p>
      </div>
    </section>
  );
}
