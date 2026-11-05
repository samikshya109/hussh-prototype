import { Link } from "react-router-dom";
import { Show, UserButton, useClerk, useUser } from "@clerk/react";
import { LogOut, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStatus } from "./ClerkAuthProvider";

function SignInIcon({ tone }: { tone: "dark" | "light" }) {
  return (
    <Link
      to="/sign-in"
      aria-label="Sign in"
      title="Sign in"
      data-testid="nav-account-button"
      className={cn(
        "hidden size-11 place-items-center rounded-full transition-colors duration-150 sm:grid",
        tone === "light" ? "text-[#45474d] hover:bg-ink/[0.06] hover:text-ink" : "text-white/70 hover:bg-white/[0.08] hover:text-white",
      )}
    >
      <User className="size-[18px]" strokeWidth={1.75} />
    </Link>
  );
}

/** Header account control: sign-in icon when signed out, Clerk's user menu when signed in. */
export function AccountButton({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const status = useAuthStatus();
  if (status !== "ready") return <SignInIcon tone={tone} />;
  return (
    <>
      <Show when="signed-out">
        <SignInIcon tone={tone} />
      </Show>
      <Show when="signed-in">
        <span className="hidden size-11 place-items-center sm:grid" data-testid="nav-user-menu">
          <UserButton />
        </span>
      </Show>
    </>
  );
}

function SignedInMobile({ onNavigate }: { onNavigate: () => void }) {
  const { user } = useUser();
  const { signOut } = useClerk();
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 px-4 py-3" data-testid="mobile-nav-user">
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold">{user?.fullName || "Signed in"}</span>
        <span className="block truncate text-xs text-white/70">{user?.primaryEmailAddress?.emailAddress}</span>
      </span>
      <button
        type="button"
        onClick={async () => { onNavigate(); await signOut(); }}
        data-testid="mobile-nav-sign-out-button"
        className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-2 text-xs font-medium text-white/80 transition-colors duration-150 hover:border-gold/50 hover:text-white"
      >
        <LogOut className="size-3.5" strokeWidth={1.75} /> Sign out
      </button>
    </div>
  );
}

function SignInLinkMobile({ onNavigate }: { onNavigate: () => void }) {
  return (
    <Link
      to="/sign-in"
      onClick={onNavigate}
      data-testid="mobile-nav-sign-in-link"
      className="flex w-full items-center justify-center rounded-full border border-white/15 py-3.5 font-medium text-white/80"
    >
      Sign in
    </Link>
  );
}

/** Account block for the mobile drawer. */
export function MobileAccount({ onNavigate }: { onNavigate: () => void }) {
  const status = useAuthStatus();
  if (status !== "ready") return <SignInLinkMobile onNavigate={onNavigate} />;
  return (
    <>
      <Show when="signed-out">
        <SignInLinkMobile onNavigate={onNavigate} />
      </Show>
      <Show when="signed-in">
        <SignedInMobile onNavigate={onNavigate} />
      </Show>
    </>
  );
}
