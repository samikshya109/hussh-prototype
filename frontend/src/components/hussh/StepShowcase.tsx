import { useEffect, useRef, useState, type ComponentType, type KeyboardEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ShowcaseStep {
  title: string;
  body: string;
  Icon: ComponentType<{ className?: string; strokeWidth?: number }>;
}

interface Props {
  id: string;
  steps: ShowcaseStep[];
  renderScreen: (index: number) => ReactNode;
  /** Tailwind bg class for the active step's icon chip / progress bar. */
  accent: string;
  label: string;
  phoneSide?: "left" | "right";
  intervalMs?: number;
  /** Optional heading block rendered above the steps, so the phone balances against heading + steps together. */
  header?: ReactNode;
}

/** Hussh app mark used inside phone mock screens. */
export function AppMark({ src, className }: { src: string; className?: string }) {
  return (
    <span className={cn("relative block size-9 shrink-0 overflow-hidden rounded-xl ring-1 ring-black/5", className)}>
      <img src={src} alt="" className="absolute inset-0 size-full scale-[1.6] object-cover object-[50%_66%]" />
    </span>
  );
}

/**
 * Accessible step tour: a vertical tab list (arrow keys, Home/End) on one side and a phone mock that
 * shows the active step on the other. It advances on its own while visible, with a visible pause
 * control (WCAG 2.2.2), and stops for good once the visitor picks a step or uses the screen.
 */
export function StepShowcase({ id, steps, renderScreen, accent, label, phoneSide = "right", intervalMs = 6000, header }: Props) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(!reduce);
  const rootRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const inView = useInView(rootRef, { amount: 0.35 });
  const running = playing && inView && !reduce;

  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => setActive((a) => (a + 1) % steps.length), intervalMs);
    return () => window.clearTimeout(t);
  }, [running, active, steps.length, intervalMs]);

  const choose = (i: number, focus = false) => {
    setPlaying(false);
    setActive(i);
    if (focus) tabsRef.current[i]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = steps.length - 1;
    const map: Record<string, number> = {
      ArrowDown: i === last ? 0 : i + 1,
      ArrowRight: i === last ? 0 : i + 1,
      ArrowUp: i === 0 ? last : i - 1,
      ArrowLeft: i === 0 ? last : i - 1,
      Home: 0,
      End: last,
    };
    if (e.key in map) {
      e.preventDefault();
      choose(map[e.key], true);
    }
  };

  const list = (
    <div className="flex flex-col">
      <div role="tablist" aria-orientation="vertical" aria-label={label} className="relative flex flex-col gap-2">
        {steps.map((s, i) => {
          const on = active === i;
          return (
            <button
              key={s.title}
              ref={(el) => { tabsRef.current[i] = el; }}
              type="button"
              role="tab"
              id={`${id}-tab-${i}`}
              aria-selected={on}
              aria-controls={`${id}-panel`}
              tabIndex={on ? 0 : -1}
              onClick={() => choose(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              data-testid={`${id}-step-${i + 1}`}
              className={cn(
                "group relative flex w-full gap-4 overflow-hidden rounded-[22px] p-4 text-left transition-[background-color,box-shadow] duration-300 sm:p-5",
                on ? "bg-white shadow-[0_18px_50px_-28px_rgba(13,15,18,0.35)] ring-1 ring-black/5" : "hover:bg-white/60",
              )}
            >
              <span
                className={cn(
                  "grid size-11 shrink-0 place-items-center rounded-2xl text-ink transition-colors duration-300",
                  on ? accent : "bg-white ring-1 ring-black/10",
                )}
              >
                <s.Icon className="size-5" strokeWidth={1.75} />
              </span>
              <span className="min-w-0">
                <span className="block font-mono text-[12px] font-medium uppercase tracking-[0.14em] text-[#5b5f68]">
                  Step {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mt-0.5 block text-[17px] font-bold leading-snug text-ink">{s.title}</span>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.span
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="block overflow-hidden"
                    >
                      <span className="block pt-1.5 text-[15px] leading-relaxed text-[#45474d]">{s.body}</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
              {on && running && (
                <span aria-hidden className="absolute inset-x-5 bottom-0 h-[3px] overflow-hidden rounded-full bg-black/[0.06]">
                  <motion.span
                    key={active}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: intervalMs / 1000, ease: "linear" }}
                    className="block h-full origin-left bg-ink/70"
                  />
                </span>
              )}
            </button>
          );
        })}
      </div>
      {!reduce && (
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-pressed={!playing}
          data-testid={`${id}-autoplay-toggle`}
          className="mt-4 inline-flex min-h-11 items-center gap-2 self-start rounded-full px-4 text-[14px] font-semibold text-ink ring-1 ring-black/10 transition-colors duration-200 hover:bg-white"
        >
          {playing ? <Pause className="size-4" strokeWidth={1.75} /> : <Play className="size-4" strokeWidth={1.75} />}
          {playing ? "Pause the tour" : "Play the tour"}
        </button>
      )}
    </div>
  );

  const phone = (
    <div className="relative flex justify-center rounded-[40px] bg-[radial-gradient(70%_60%_at_50%_45%,rgba(169,203,239,0.55),transparent_75%),linear-gradient(180deg,#f3f7fc,#faf8f5)] px-5 py-10 ring-1 ring-black/[0.04] sm:py-14">
      <div
        className="relative w-full max-w-[330px] rounded-[44px] bg-ink p-2.5 shadow-[0_40px_90px_-40px_rgba(13,15,18,0.55)]"
        data-testid={`${id}-phone`}
      >
        <span aria-hidden className="absolute left-1/2 top-4 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-ink" />
        <div
          role="tabpanel"
          id={`${id}-panel`}
          aria-labelledby={`${id}-tab-${active}`}
          aria-live={running ? "off" : "polite"}
          tabIndex={0}
          onPointerDown={() => setPlaying(false)}
          onFocusCapture={(e) => { if (e.target !== e.currentTarget) setPlaying(false); }}
          className="relative h-[560px] overflow-hidden rounded-[36px] bg-ivory"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex flex-col px-5 pb-6 pt-12"
            >
              {renderScreen(active)}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );

  return (
    <div ref={rootRef} className={cn("grid items-center gap-12 lg:grid-cols-12 lg:gap-16", !header && "mt-12")}>
      <div className={cn("lg:col-span-6", phoneSide === "left" && "lg:order-2")}>
        {header && <div className="mb-10">{header}</div>}
        {list}
      </div>
      <div className={cn("lg:col-span-6", phoneSide === "left" && "lg:order-1")}>{phone}</div>
    </div>
  );
}
