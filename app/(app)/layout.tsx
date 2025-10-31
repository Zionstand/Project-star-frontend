"use client";
import { ReactNode } from "react";
import { useAuth } from "@/store/useAuth";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { AppSidebarHeader } from "@/components/sidebar/app-sidebar-header";
import { useAutoRefresh } from "@/hooks/use-auto-refresh";
import { redirectByRole } from "@/hooks/use-role-redirect";
import { useRouter } from "next/navigation";
import { useSchoolFetcher } from "@/hooks/use-school-fetcher";

export default function Layout({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();
  useSchoolFetcher();
  redirectByRole(user, router);
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
