import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { ClerkProvider } from "@clerk/react";
import { apiGet } from "@/lib/api";

// Mirrors the dict returned by GET /api/clerk/config (backend/clerk_auth.py).
interface ClerkConfig {
  enabled: boolean;
  publishable_key: string;
  proxy_url: string;
}

export type AuthStatus = "loading" | "ready" | "unavailable";

const AuthStatusContext = createContext<AuthStatus>("loading");

/** "ready" only inside <ClerkProvider>; Clerk components/hooks may render only then. */
export const useAuthStatus = () => useContext(AuthStatusContext);

// Brand Clerk once: it styles sign-in, sign-up and the user menu.
const appearance = {
  variables: {
    colorPrimary: "#1f1f22",
    colorPrimaryForeground: "#ffffff",
    colorBackground: "#ffffff",
    colorForeground: "#1f1f22",
    colorInput: "#ffffff",
    colorInputForeground: "#1f1f22",
    colorBorder: "#e7e2d8",
    fontFamily: "'Plus Jakarta Sans Variable', ui-sans-serif, system-ui, sans-serif",
    borderRadius: "14px",
  },
};

// Before the config arrives the page still renders (no blank screen on a static preview);
// auth widgets show a plain "Sign in" link until Clerk is ready.
const FALLBACK_AFTER_MS = 1200;

export default function ClerkAuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [config, setConfig] = useState<ClerkConfig | null>(null);
  const [unavailable, setUnavailable] = useState(false);
  const [fallback, setFallback] = useState(false);

  // Retries while the backend restarts (e.g. right after provisioning).
  useEffect(() => {
    let cancelled = false;
    const fb = window.setTimeout(() => setFallback(true), FALLBACK_AFTER_MS);
    const load = async (attempt = 0) => {
      try {
        const cfg = await apiGet<ClerkConfig>("/clerk/config");
        if (cfg.enabled) {
          if (!cancelled) setConfig(cfg);
          return;
        }
      } catch (err) {
        // Backend may be restarting; log once per attempt and retry below. After 20 tries
        // the provider reports "unavailable" and the sign-in pages show a friendly message.
        console.warn(`[auth] config fetch failed (attempt ${attempt + 1})`, err);
      }
      if (cancelled) return;
      if (attempt >= 20) {
        setUnavailable(true);
        return;
      }
      window.setTimeout(() => load(attempt + 1), 1500);
    };
    load();
    return () => {
      cancelled = true;
      window.clearTimeout(fb);
    };
  }, []);

  if (config) {
    return (
      <ClerkProvider
        publishableKey={config.publishable_key}
        proxyUrl={config.proxy_url || undefined}
        appearance={appearance}
        routerPush={(to: string) => navigate(to)}
        routerReplace={(to: string) => navigate(to, { replace: true })}
        signInUrl="/sign-in"
        signUpUrl="/sign-up"
        signInFallbackRedirectUrl="/"
        signUpFallbackRedirectUrl="/"
        afterSignOutUrl="/"
      >
        <AuthStatusContext.Provider value="ready">{children}</AuthStatusContext.Provider>
      </ClerkProvider>
    );
  }
  if (!fallback && !unavailable) return null;
  return <AuthStatusContext.Provider value={unavailable ? "unavailable" : "loading"}>{children}</AuthStatusContext.Provider>;
}
