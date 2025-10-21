"use client";

import { Button } from "@/components/ui/button";
import ProtectedRoute from "@/features/auth/components/protected-route";
import { useAuth } from "@/features/auth/context/auth-context";
import { useLogout } from "@/features/auth/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DashboardPage = () => {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  const handleLogout = () => {
    logout();
  };
  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin" />
      </div>
    );
  }
  if (!user) return null;
  return (
    <ProtectedRoute>
      Dashboard Page <hr />
      <Button onClick={handleLogout}>Logout</Button>
    </ProtectedRoute>
  );
};

export default DashboardPage;
