"use client";
import { useAutoLogin } from "@/hooks/use-auto-login";
import { PageGradient } from "./_components/PageGradient";
import { useAuth } from "@/store/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useEffect } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { user } = useAuth();

  const searchParams = useSearchParams(); // ✅ access query params

  useEffect(() => {
    const unauthenticated = searchParams.get("unauthenticated");

    if (unauthenticated === "true") {
      toast.error("Your session has expired. Please log in again.");
    }
  }, [searchParams]);

  useEffect(() => {
    if (user) {
      // toast.success("Authenticated");
      router.replace("/a/dashboard");
    }
  }, [user, router]);

  return (
    <div className="relative">
      <PageGradient />
      <div className="container flex items-center justify-center min-h-screen">
        {children}
      </div>
    </div>
  );
}
