"use client";
import { useAutoLogin } from "@/hooks/use-auto-login";
import { PageGradient } from "./_components/PageGradient";
import { useAuth } from "@/store/useAuth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { user } = useAuth();

  if (user) {
    toast.success("Authenticated");
    router.replace("/a/dashboard");
  }

  return (
    <div className="relative">
      <PageGradient />
      <div className="container flex items-center justify-center min-h-screen">
        {children}
      </div>
    </div>
  );
}
