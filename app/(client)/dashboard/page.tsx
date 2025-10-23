// "use client";

// import { AppSidebar } from "@/components/sidebar/app-sidebar";
// import SiteHeader from "@/components/sidebar/site-header";
// import { Button } from "@/components/ui/button";
// import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
// import ProtectedRoute from "@/features/auth/components/protected-route";
// import { useAuth } from "@/features/auth/context/auth-context";
// import { useLogout } from "@/features/auth/hooks/use-auth";
import { redirect } from "next/navigation";

const DashboardPage = () => {
  redirect("/dashboard/home");
};

export default DashboardPage;
