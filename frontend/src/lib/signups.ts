import { useMutation } from "@tanstack/react-query";
import { ApiError, apiPost } from "@/lib/api";

// Mirrors backend/models/signup.py — keep in sync.
export type SignupSource = "agent_one" | "tag_one";

export interface SignupCreate {
  email: string;
  source: SignupSource;
}

export interface Signup {
  id: string;
  email: string;
  source: SignupSource;
  created_at: string;
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function signupErrorMessage(err: unknown): string {
  if (err instanceof ApiError) {
    if (err.status === 409) return "You're already on the list — we'll be in touch.";
    if (err.status === 422) return "That email doesn't look right. Mind checking it?";
  }
  return "Something went wrong. Please try again in a moment.";
}

export function useSignup() {
  return useMutation({
    mutationFn: (body: SignupCreate) => apiPost<Signup>("/signups", body),
  });
}
