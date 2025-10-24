import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import api from "@/lib/api";
import { env } from "@/lib/env";
import { useAuth, User } from "@/store/useAuth";
import { useSignout } from "./use-signout";

export function useRoleRedirect(user: User) {
  const router = useRouter();
  const pathname = usePathname();
  const handleSignout = useSignout();
  const setSchool = useAuth((s) => s.updateSchool);

  const hasRedirected = useRef(false);
  const hasFetchedSchool = useRef(false);

  useEffect(() => {
    if (!user || hasRedirected.current) return;

    const roleRoutes: Record<string, string> = {
      ADMINISTRATOR: "/a/dashboard",
      TEACHER: "/t/dashboard",
      STUDENT: "/s/dashboard",
      PARENT: "/p/dashboard",
      "IT SUPPORT": "/it/dashboard",
      "DATA ANALYST": "/da/dashboard",
      BURSAR: "/b/dashboard",
      "EXAM OFFICER": "/eo/dashboard",
    };

    const path = roleRoutes[user.role];

    // Fetch school only once per session
    if (!hasFetchedSchool.current) {
      hasFetchedSchool.current = true;
      api
        .get(`${env.NEXT_PUBLIC_BACKEND_URL}/schools/${user.schoolId}`)
        .then((res) => {
          setSchool(res.data);
        })
        .catch((err) => {
          handleSignout;
          console.error("Failed to fetch school:", err);
        });
    }

    // Redirect only if necessary
    if (path && pathname !== path) {
      hasRedirected.current = true;
      router.push(path);
    }
  }, [user, pathname, router, setSchool]);
}
