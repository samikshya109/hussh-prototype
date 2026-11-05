import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Cpu, Radio } from "lucide-react";
import { H2, SectionPill } from "./Brand";
import { EmailSignup } from "./EmailSignup";
import { HIGHLIGHT_EVENT, IMAGES } from "./content";

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

const PRODUCT_IDS = ["agent-one", "puppy-one", "tag-one"];

/** Spotlights one card when a quick-link fires HIGHLIGHT_EVENT or the URL hash names a product. */
function useProductHighlight() {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    let t: number | undefined;
    const show = (id: string) => {
      if (!PRODUCT_IDS.includes(id)) return;
      setActive(id);
      window.clearTimeout(t);
      t = window.setTimeout(() => setActive(null), 2600);
    };
    const onEvent = (e: Event) => show((e as CustomEvent<string>).detail);
    const onHash = () => show(window.location.hash.slice(1));
    window.addEventListener(HIGHLIGHT_EVENT, onEvent);
    window.addEventListener("hashchange", onHash);
    return () => {
      window.removeEventListener(HIGHLIGHT_EVENT, onEvent);
      window.removeEventListener("hashchange", onHash);
      window.clearTimeout(t);
    };
  }, []);
  return active;
}

// Box-shadow only: motion owns the card's transform for its reveal.
const spot = (on: boolean) =>
  cn("scroll-mt-28 transition-[box-shadow] duration-500", on && "shadow-[0_0_0_4px_#e8b56b,0_30px_60px_-24px_rgba(31,31,34,0.35)]");

export function Products() {
  const active = useProductHighlight();
  return (
    <section id="products" data-testid="products-section" className="relative bg-ivory py-[60px] sm:py-24">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="max-w-3xl">
          <motion.div {...reveal}>
            <SectionPill dot="bg-butter">Meet our products</SectionPill>
            <h2 data-testid="products-heading" className={cn(H2, "text-ink")}>
              Hardware and software
              <br className="hidden sm:block" /> that keep your life private.
            </h2>
          </motion.div>
          <motion.p {...reveal} className="mt-5 max-w-2xl text-[17px] leading-relaxed text-[#45474d]">
            Start free with Agent One. Add Puppy One when you want your assistant working around the clock.
          </motion.p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          {/* Agent One — dominant */}
          <motion.article
            {...reveal}
            id="agent-one"
            data-testid="product-card-agent-one"
            data-highlighted={active === "agent-one"}
            tabIndex={-1}
            className={cn(spot(active === "agent-one"), "group relative overflow-hidden rounded-[28px] border border-[#e5e1d8] bg-white lg:col-span-7 lg:row-span-2")}
          >
            <div className="overflow-hidden">
              <img
                src={IMAGES.agentOne}
                alt="The hussh mascot with headphones and a laptop, surrounded by calendar and mail cards"
                className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-col gap-6 p-7 sm:flex-row sm:items-end sm:justify-between sm:p-9">
              <div className="max-w-md">
                <div className="flex items-center gap-2.5">
                  <h3 className="text-[28px] font-bold tracking-tight text-ink">Agent One</h3>
                  <span data-testid="agent-one-free-badge" className="rounded-full bg-ivory-2 px-2.5 py-1 font-mono text-[12px] font-semibold uppercase tracking-wider text-gold-deep">Free for life</span>
                </div>
                <p className="mt-3 text-[16px] leading-relaxed text-[#45474d]">
                  Your private assistant. It keeps track of your schedule and your bills, drafts your replies for you to send, and only sees what you choose to connect.
                </p>
              </div>
              <a
                href="#get-started"
                data-testid="product-agent-one-link"
                className="inline-flex min-h-11 shrink-0 items-center gap-1.5 self-start rounded-full bg-ink px-5 py-3 text-[15px] font-semibold text-[#faf8f5] transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-[#34343a] sm:self-auto"
              >
                Get Agent One <ArrowUpRight aria-hidden className="size-4" />
              </a>
            </div>
          </motion.article>

          {/* Puppy One */}
          <motion.article
            {...reveal}
            id="puppy-one"
            data-testid="product-card-puppy-one"
            data-highlighted={active === "puppy-one"}
            tabIndex={-1}
            className={cn(spot(active === "puppy-one"), "group relative grid overflow-hidden rounded-[28px] border border-[#efe2c4] bg-[linear-gradient(160deg,#fff8e8,#fbf3e1)] sm:grid-cols-[1fr_200px] lg:col-span-5")}
          >
            <div className="flex flex-col p-7">
              <span className="inline-flex size-9 items-center justify-center rounded-full bg-white text-gold-deep ring-1 ring-[#efe2c4]">
                <Cpu aria-hidden className="size-4" strokeWidth={1.75} />
              </span>
              <h3 className="mt-5 text-2xl font-bold tracking-tight text-ink">Puppy One</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[#45474d]">
                A laptop or Apple Silicon Mac with Agent One preinstalled. Your information stays on your machine.
              </p>
              <a href="#products" data-testid="product-puppy-one-link" className="mt-auto inline-flex min-h-11 items-center gap-1 pt-3 text-[15px] font-semibold text-gold-deep underline-offset-4 hover:underline">
                Explore Puppy One <ArrowUpRight aria-hidden className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
            <img src={IMAGES.puppyOne} alt="A golden smiley puppy, paw to its lips, beside a small computer" className="hidden h-full w-full object-cover sm:block" />
          </motion.article>

          {/* Tag One */}
          <motion.article
            {...reveal}
            id="tag-one"
            data-testid="product-card-tag-one"
            data-highlighted={active === "tag-one"}
            tabIndex={-1}
            className={cn(spot(active === "tag-one"), "relative overflow-hidden rounded-[28px] border border-[#d9e8de] bg-[linear-gradient(160deg,#f1f8f3,#e9f3ed)] p-7 lg:col-span-5")}
          >
            <img
              src={IMAGES.tagOne}
              alt=""
              className="pointer-events-none absolute -right-6 -top-4 size-28 rounded-full sm:-right-10 sm:-top-6 sm:size-44 object-cover opacity-95 [mask-image:radial-gradient(circle,#000_55%,transparent_72%)]"
            />
            <span className="inline-flex size-9 items-center justify-center rounded-full bg-white text-emerald-700 ring-1 ring-[#d9e8de]">
              <Radio aria-hidden className="size-4" strokeWidth={1.75} />
            </span>
            <div className="mt-5 flex flex-wrap items-center gap-2.5 pr-20 sm:pr-32">
              <h3 className="text-2xl font-bold tracking-tight text-ink">Tag One</h3>
              <span data-testid="tag-one-coming-soon-badge" className="rounded-full bg-emerald-100 px-2.5 py-1 font-mono text-[12px] font-semibold uppercase tracking-wider text-emerald-800">
                Coming soon
              </span>
            </div>
            <p className="mt-2 max-w-[300px] text-[15px] leading-relaxed text-[#45474d]">
              A small wearable for the people you look out for. It shares where they are only when they agree, and pings your trusted circle when they need help.
            </p>
            <EmailSignup
              source="tag_one"
              tone="light"
              ctaLabel="Get early access"
              successTitle="You're on the Tag One list"
              testIdPrefix="tag-one-signup"
              note="We will only write when Tag One is ready. Unsubscribe anytime."
              className="mt-6"
            />
          </motion.article>
        </div>
      </div>
    </section>
  );
}
