"use client";

import { useAutoLogin } from "@/hooks/use-auto-login";
import { PageGradient } from "./_components/PageGradient";
import { useAuth } from "@/store/useAuth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect } from "react";
import { FullLogo } from "./_components/Logo";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const unauthenticated = params.get("unauthenticated");
      const logout = params.get("logout");

      if (unauthenticated === "true") {
        toast.error("Your session has expired. Please log in again.");
      }

      if (logout === "true") {
        toast.success("You've been logged out successfully.");
      }

      // remove query from URL
      // const cleanUrl = window.location.origin + window.location.pathname;
      // window.history.replaceState({}, "", cleanUrl);
    }
  }, []);

  useEffect(() => {
    if (user) {
      router.replace("/a/dashboard");
    }
  }, [user, router]);

  return (
    <div className="relative">
      <PageGradient />
      <div className="container flex items-center justify-center min-h-screen py-16">
        {children}
      </div>
    </div>
  );
}
