import { useState } from "react";
import { toast } from "sonner";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { EMAIL_RE, signupErrorMessage, useSignup, type SignupSource } from "@/lib/signups";

interface Props {
  source: SignupSource;
  tone?: "dark" | "light";
  ctaLabel: string;
  successTitle: string;
  testIdPrefix: string;
  className?: string;
  /** Reassuring helper line under the field. */
  note?: string;
}

export function EmailSignup({ source, tone = "dark", ctaLabel, successTitle, testIdPrefix, className, note = "We only use your email for this. Unsubscribe anytime." }: Props) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const signup = useSignup();
  const dark = tone === "dark";

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = email.trim();
    if (!EMAIL_RE.test(value)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(null);
    signup.mutate(
      { email: value, source },
      {
        onSuccess: () => {
          setDone(true);
          setEmail("");
          toast.success(successTitle, { description: `We'll write to ${value.toLowerCase()} — and nobody else will.` });
        },
        onError: (err) => {
          const msg = signupErrorMessage(err);
          setError(msg);
          toast.error(msg);
        },
      },
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className={cn("w-full", className)} data-testid={`${testIdPrefix}-form`}>
      <div
        className={cn(
          "flex items-center gap-1.5 rounded-full p-1.5 pl-5 ring-1 transition-[box-shadow,background-color] duration-200 focus-within:ring-2",
          dark
            ? "bg-white/[0.06] ring-white/15 backdrop-blur-md focus-within:ring-gold/70"
            : "bg-white ring-[#e5e1d8] shadow-[0_8px_30px_-12px_rgba(17,19,24,0.15)] focus-within:ring-gold",
          error && (dark ? "ring-red-300" : "ring-red-700"),
        )}
      >
        <label htmlFor={`${testIdPrefix}-email`} className="sr-only">
          Email address
        </label>
        <input
          id={`${testIdPrefix}-email`}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError(null);
            if (done) setDone(false);
          }}
          data-testid={`${testIdPrefix}-email-input`}
          aria-invalid={!!error}
          aria-describedby={`${testIdPrefix}-note`}
          className={cn(
            "min-w-0 flex-1 bg-transparent text-[15px] outline-none",
            dark ? "text-[#f5f2ec] placeholder:text-white/70" : "text-ink placeholder:text-[#6b6a64]",
          )}
        />
        <button
          type="submit"
          disabled={signup.isPending}
          data-testid={`${testIdPrefix}-submit-button`}
          className={cn(
            "inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-[15px] font-semibold transition-[transform,background-color] duration-200 active:scale-95 disabled:opacity-70",
            // Dark tone matches the nav's primary "Get Agent One" pill exactly.
            dark
              ? "bg-gold text-[#1f1f22] shadow-[0_0_28px_-6px_rgba(232,181,107,0.6)] hover:bg-gold-soft disabled:opacity-100"
              : "bg-ink text-[#faf8f5] hover:bg-[#34343a]",
          )}
        >
          {signup.isPending ? (
            <Loader2 aria-hidden className="size-4 animate-spin" />
          ) : done ? (
            <Check aria-hidden className="size-4" />
          ) : null}
          <span className="sr-only sm:not-sr-only">{done ? "You're in" : ctaLabel}</span>
          {!signup.isPending && !done && <ArrowRight aria-hidden className="size-4 sm:hidden" />}
        </button>
      </div>
      <p
        role="status"
        id={`${testIdPrefix}-note`}
        data-testid={`${testIdPrefix}-message`}
        className={cn(
          "mt-2.5 min-h-5 pl-5 text-[14px]",
          error ? (dark ? "text-red-300" : "text-red-700") : dark ? "text-white/75" : "text-[#45474d]",
        )}
      >
        {error ?? (done ? "You're on the list. Check your inbox for a confirmation." : note)}
      </p>
    </form>
  );
}
