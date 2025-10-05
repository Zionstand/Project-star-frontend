"use client";
import React, { ReactNode, useEffect, useState } from "react";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/sidebar/app-sidebar";
import { AppSidebarHeader } from "./_components/sidebar/app-sidebar-header";
import { useAuth } from "@/store/useAuth";
import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();

  const user = useAuth((s) => s.user);
  // const [hydrated, setHydrated] = useState(false);

  // useEffect(() => {
  //   setHydrated(true);
  // }, []);

  // useEffect(() => {
  //   if (hydrated && !user) {
  //     router.push("/?unauthenticated=true");
  //   }
  // }, [hydrated, user, router]);
  // useEffect(() => {
  //   if (hydrated && !user) {
  //     window.location.href = "/?unauthenticated=true";
  //   }
  // }, [hydrated, user]);

  // if (!hydrated) return null;
  if (!user) return null;

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
