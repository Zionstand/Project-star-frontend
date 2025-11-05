"use client";
import { ReactNode } from "react";
import { useAuth } from "@/store/useAuth";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { AppSidebarHeader } from "@/components/sidebar/app-sidebar-header";
import { useAutoRefresh } from "@/hooks/use-auto-refresh";
import { useSchoolFetcher } from "@/hooks/use-school-fetcher";
import { useRoleRedirect } from "@/hooks/use-role-redirect";

export default function Layout({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  useRoleRedirect(user);
  useSchoolFetcher();
  // useAutoRefresh();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppSidebarHeader />
        <div className="px-3 py-8 sm:px-4 md:px-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
