"use client";

import React, { useEffect } from "react";
import { useAuth } from "../context/auth-context";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, error, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <p className="text-lg font-bold">Authentication Error</p>
          <p className="text-red-500">{error.message}</p>
        </div>
      </div>
    );
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2
          className="h-12 w-12 animate-spin"
          aria-label="Loading authentication"
        />
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
