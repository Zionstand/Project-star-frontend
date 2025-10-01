import React, { ReactNode } from "react";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/sidebar/app-sidebar";
import { AppSidebarHeader } from "./_components/sidebar/app-sidebar-header";

export default function Layout({ children }: { children: ReactNode }) {
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
