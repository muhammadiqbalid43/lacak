import BottomNav from "@/components/navigation/bottom-nav";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import SiteHeader from "@/components/sidebar/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import ProtectedRoute from "@/features/auth/components/protected-route";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectedRoute>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" className="hidden md:flex" />
        <SidebarInset>
          <SiteHeader className="hidden md:flex" />

          <main className="pb-16 md:pb-0">{children}</main>
        </SidebarInset>
        <BottomNav className="md:hidden" />
      </SidebarProvider>
    </ProtectedRoute>
  );
};

export default DashboardLayout;
