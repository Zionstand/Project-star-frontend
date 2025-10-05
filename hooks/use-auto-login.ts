"use client";
import api from "@/lib/api";
import { useAuth } from "@/store/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useAutoLogin() {
  const { setUser, clearUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await api.post("/auth/refresh");
        if (res.data.user) {
          setUser(res.data.user);
        } else {
          clearUser();
          router.replace("/");
        }
      } catch (error) {
        clearUser();
        router.replace("/");
      }
    };

    checkSession();
  }, [setUser, clearUser]);
}
