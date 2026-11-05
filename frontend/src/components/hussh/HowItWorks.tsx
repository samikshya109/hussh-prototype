import { Check, Download, Fingerprint, Lock, ShieldCheck, SlidersHorizontal, Sun } from "lucide-react";
import { SiApple, SiGoogle } from "@icons-pack/react-simple-icons";
import { cn } from "@/lib/utils";
import { IMAGES } from "./content";
import { AppMark, StepShowcase, type ShowcaseStep } from "./StepShowcase";
import { H2, SectionPill } from "./Brand";

const STEPS: ShowcaseStep[] = [
  { Icon: Download, title: "Download Agent One", body: "Free on iPhone, Android, Mac and Windows. No credit card, now or later." },
  { Icon: Fingerprint, title: "Sign in with Google or Apple", body: "We use it to recognise you, not to read you. Your password never reaches us." },
  { Icon: SlidersHorizontal, title: "Choose what to connect", body: "Gmail, bank accounts, calendar, photos. Each one is a switch you can turn off anytime." },
  { Icon: Sun, title: "Get your first morning brief", body: "Tomorrow at 7am: three things worth a look, written for you and kept on your device." },
];

function Caption({ children }: { children: string }) {
  return <p className="mt-auto pt-4 text-center text-[12px] text-[#5b5f68]">{children}</p>;
}

function DownloadScreen() {
  return (
    <>
      <div className="flex items-center gap-3">
        <AppMark src={IMAGES.heroMascot} className="size-14 rounded-2xl" />
        <div>
          <p className="text-[17px] font-bold text-ink">Agent One</p>
          <p className="text-[13px] text-[#5b5f68]">Your private assistant</p>
        </div>
      </div>
      <span className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-ink text-[15px] font-semibold text-white">Get · Free</span>
      <ul className="mt-6 space-y-2.5">
        {["Runs 100% on your device", "Data encrypted with your key", "Free for life, no ads"].map((t) => (
          <li key={t} className="flex items-center gap-2.5 rounded-2xl bg-white px-3.5 py-3 text-[14px] font-medium text-ink ring-1 ring-black/5">
            <ShieldCheck className="size-[18px] text-emerald-700" strokeWidth={1.75} /> {t}
          </li>
        ))}
      </ul>
      <Caption>Example screen.</Caption>
    </>
  );
}

function SignInScreen() {
  return (
    <>
      <div className="flex flex-col items-center text-center">
        <AppMark src={IMAGES.heroMascot} className="size-14 rounded-2xl" />
        <p className="mt-4 text-[19px] font-bold text-ink">Agent One</p>
        <p className="text-[14px] text-[#5b5f68]">Your private assistant</p>
      </div>
      <div className="mt-8 space-y-3">
        <span className="flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-white text-[15px] font-semibold text-ink ring-1 ring-black/10">
          <SiGoogle className="size-4" color="#4285F4" aria-hidden /> Continue with Google
        </span>
        <span className="flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-ink text-[15px] font-semibold text-white">
          <SiApple className="size-4" color="#ffffff" aria-hidden /> Continue with Apple
        </span>
      </div>
      <p className="mt-6 flex items-center justify-center gap-2 text-[13px] text-[#45474d]">
        <Lock className="size-4" strokeWidth={1.75} /> We never see your password.
      </p>
      <Caption>Example screen.</Caption>
    </>
  );
}

const CONNECT = [
  { name: "Gmail", on: true },
  { name: "Bank accounts", on: true },
  { name: "Calendar", on: true },
  { name: "Photos", on: false },
];

function ConnectScreen() {
  return (
    <>
      <p className="text-[19px] font-bold text-ink">Choose what to connect</p>
      <p className="mt-1 text-[14px] text-[#5b5f68]">Agent One only sees what is switched on.</p>
      <ul className="mt-6 space-y-2.5">
        {CONNECT.map((c) => (
          <li key={c.name} className="flex min-h-12 items-center justify-between rounded-2xl bg-white px-4 text-[15px] font-medium text-ink ring-1 ring-black/5">
            {c.name}
            <span className={cn("relative h-7 w-12 rounded-full transition-colors", c.on ? "bg-emerald-700" : "bg-[#c9c4b8]")}>
              <span className={cn("absolute top-1 size-5 rounded-full bg-white shadow transition-[left]", c.on ? "left-6" : "left-1")} />
              <span className="sr-only">{c.on ? "On" : "Off"}</span>
            </span>
          </li>
        ))}
      </ul>
      <Caption>Example screen. You can change these anytime.</Caption>
    </>
  );
}

const BRIEF = [
  { tag: "Finance", tone: "bg-butter", text: "A $14.99 charge from a streaming service you cancelled in May." },
  { tag: "Gmail", tone: "bg-bubble", text: "Found the receipt for your new tires." },
  { tag: "Calendar", tone: "bg-sky", text: "Your 3:00 call runs into school pickup at 3:30." },
];

function BriefScreen() {
  return (
    <>
      <div className="flex items-center gap-3">
        <AppMark src={IMAGES.heroMascot} />
        <div>
          <p className="text-[13px] font-medium text-[#5b5f68]">Tuesday morning</p>
          <p className="text-[17px] font-bold text-ink">Three things worth a look</p>
        </div>
      </div>
      <ul className="mt-6 space-y-3">
        {BRIEF.map((b) => (
          <li key={b.tag} className="rounded-2xl bg-white p-4 ring-1 ring-black/5">
            <span className={cn("rounded-full px-2.5 py-1 text-[12px] font-semibold text-ink", b.tone)}>{b.tag}</span>
            <p className="mt-2.5 text-[14px] leading-snug text-ink">{b.text}</p>
          </li>
        ))}
      </ul>
      <p className="mt-4 flex items-center gap-2 text-[13px] text-[#45474d]">
        <Check className="size-4 text-emerald-700" strokeWidth={1.75} /> Written on your device. Nothing was sent.
      </p>
      <Caption>Example screen.</Caption>
    </>
  );
}

const SCREENS = [DownloadScreen, SignInScreen, ConnectScreen, BriefScreen];

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" data-testid="home-how" className="relative isolate overflow-clip bg-white py-[60px] sm:py-24">
      <div aria-hidden className="absolute -right-24 top-24 -z-10 size-96 rounded-full bg-sky/40 blur-3xl" />
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <StepShowcase
          id="how"
          label="Agent One setup steps"
          steps={STEPS}
          accent="bg-sky"
          renderScreen={(i) => {
            const Screen = SCREENS[i];
            return <Screen />;
          }}
          header={
          <div>
            <SectionPill dot="bg-sky">How it works</SectionPill>
            <h2 id="how-title" className={cn(H2, "text-ink")}>
              From download to your first brief in four steps.
            </h2>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-[#45474d]">
              About two minutes, start to finish. Nothing leaves your device while you set up.
            </p>
          </div>
          }
        />
      </div>
    </section>
  );
}
