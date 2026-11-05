import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Lock, ShieldCheck, Sparkles } from "lucide-react";
import { SignIn, SignUp } from "@clerk/react";
import { Logo } from "@/components/hussh/Brand";
import { IMAGES } from "@/components/hussh/content";
import { useAuthStatus } from "@/components/auth/ClerkAuthProvider";

const POINTS = [
  { Icon: Lock, text: "Your data stays on your device." },
  { Icon: ShieldCheck, text: "We never see your password." },
  { Icon: Sparkles, text: "Your first morning brief arrives tomorrow at 7am." },
];

function AuthShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-ivory">
      <div aria-hidden className="absolute -left-24 top-24 -z-10 size-80 rounded-full bg-bubble/50 blur-3xl" />
      <div aria-hidden className="absolute -right-10 top-0 -z-10 size-96 rounded-full bg-butter/60 blur-3xl" />
      <div aria-hidden className="absolute bottom-0 left-1/3 -z-10 size-72 rounded-full bg-sky/50 blur-3xl" />

      <header className="mx-auto flex max-w-[1240px] items-center justify-between px-5 py-5 sm:px-8">
        <Logo tone="light" />
        <Link
          to="/"
          data-testid="auth-back-home-link"
          className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink shadow-sm ring-1 ring-black/5 transition-transform duration-200 hover:-translate-y-0.5"
        >
          <ArrowLeft className="size-4" strokeWidth={1.75} /> Back to home
        </Link>
      </header>

      <main className="mx-auto grid max-w-[1240px] items-center gap-10 px-5 pb-16 pt-4 sm:px-8 lg:min-h-[calc(100vh-88px)] lg:grid-cols-2 lg:pb-10">
        <motion.section
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="hidden flex-col lg:flex"
          data-testid="auth-brand-panel"
        >
          <h1 className="text-5xl font-bold leading-[1.03] tracking-[-0.04em] text-ink">
            {title}
          </h1>
          <ul className="mt-8 space-y-3">
            {POINTS.map(({ Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-[15px] text-[#45474d]">
                <span className="grid size-9 place-items-center rounded-xl bg-white shadow-sm ring-1 ring-black/5">
                  <Icon className="size-[18px] text-ink" strokeWidth={1.75} />
                </span>
                {text}
              </li>
            ))}
          </ul>
          <img
            src={IMAGES.mascotPastel}
            alt="The hussh mascot among pastel paper shapes"
            className="mt-6 w-full max-w-[380px] mix-blend-multiply [mask-image:radial-gradient(closest-side,#000_78%,transparent)]"
          />
        </motion.section>

        <section className="flex items-center justify-center" data-testid="auth-form-panel">
          {children}
        </section>
      </main>
    </div>
  );
}

function AuthPending() {
  const status = useAuthStatus();
  return (
    <div className="w-full max-w-[400px] rounded-[24px] bg-white p-8 text-center shadow-sm ring-1 ring-black/5" data-testid="auth-pending">
      {status === "unavailable" ? (
        <p className="text-[15px] text-[#45474d]">Sign-in is unavailable right now. Refresh the page to try again.</p>
      ) : (
        <>
          <span className="mx-auto block size-8 animate-spin rounded-full border-2 border-ink/15 border-t-gold" />
          <p className="mt-4 text-[15px] text-[#45474d]">Loading sign-in…</p>
        </>
      )}
    </div>
  );
}

export function SignInPage() {
  const ready = useAuthStatus() === "ready";
  return (
    <AuthShell title="Welcome back. Your AI kept your secrets.">
      {ready ? <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" withSignUp /> : <AuthPending />}
    </AuthShell>
  );
}

export function SignUpPage() {
  const ready = useAuthStatus() === "ready";
  return (
    <AuthShell title="Private AI that lives with you. Start in two minutes.">
      {ready ? <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" /> : <AuthPending />}
    </AuthShell>
  );
}
