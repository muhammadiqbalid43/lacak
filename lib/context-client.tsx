"use client";

import { AuthProvider } from "@/features/auth/context/auth-context";

export function ContextClient({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
