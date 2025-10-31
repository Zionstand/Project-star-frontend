// import { useEffect, useRef } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import api from "@/lib/api";
// import { env } from "@/lib/env";
// import { useAuth, User } from "@/store/useAuth";
// import { useSignout } from "./use-signout";

// export function useRoleRedirect(user: User) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const handleSignout = useSignout();
//   const setSchool = useAuth((s) => s.updateSchool);

//   const hasFetchedSchool = useRef(false);

//   useEffect(() => {
//     if (!user) return;

//     const roleRoutes: Record<string, string> = {
//       ADMINISTRATOR: "/a/dashboard",
//       TEACHER: "/t/dashboard",
//       STUDENT: "/s/dashboard",
//       PARENT: "/p/dashboard",
//       "IT SUPPORT": "/it/dashboard",
//       "DATA ANALYST": "/da/dashboard",
//       BURSAR: "/b/dashboard",
//       "EXAM OFFICER": "/eo/dashboard",
//     };

//     const path = roleRoutes[user.role];
//     if (!path) return;

//     // ✅ Only redirect if the user is on a root route (like /a, /t, etc)
//     const rolePrefix = `/${path.split("/")[1]}`; // e.g., "/a"
//     const isAtRoleRoot =
//       pathname === "/" ||
//       pathname === rolePrefix ||
//       pathname === `${rolePrefix}/`;

//     if (isAtRoleRoot && pathname !== path) {
//       router.replace(path);
//     }

//     // ✅ Fetch school data only once per session
//     if (!hasFetchedSchool.current) {
//       hasFetchedSchool.current = true;
//       api
//         .get(`${env.NEXT_PUBLIC_BACKEND_URL}/schools/${user.schoolId}`)
//         .then((res) => setSchool(res.data))
//         .catch((err) => {
//           handleSignout();
//           console.error("Failed to fetch school:", err);
//         });
//     }
//   }, [user, pathname, router, setSchool, handleSignout]);
// }

// import { useEffect, useRef } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import api from "@/lib/api";
// import { env } from "@/lib/env";
// import { useAuth, User } from "@/store/useAuth";
// import { useSignout } from "./use-signout";

// /** ✅ Hook version (auto-redirect when needed) */
// export function useRoleRedirect(user: User) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const handleSignout = useSignout();
//   const setSchool = useAuth((s) => s.updateSchool);
//   const hasFetchedSchool = useRef(false);

//   useEffect(() => {
//     if (!user || user.schoolId) return;

//     console.log(user);

//     const path = getDashboardPath(user.role);
//     if (!path) return;

//     // Only redirect if they're at role root
//     const rolePrefix = `/${path.split("/")[1]}`;
//     const isAtRoleRoot =
//       pathname === "/" ||
//       pathname === rolePrefix ||
//       pathname === `${rolePrefix}/`;

//     if (isAtRoleRoot && pathname !== path) {
//       router.replace(path);
//     }

//     console.log("yesss");

//     // // Fetch school only once
//     // if (!hasFetchedSchool.current) {
//     //   hasFetchedSchool.current = true;
//     //   api
//     //     .get(`${env.NEXT_PUBLIC_BACKEND_URL}/schools/${user.schoolId}`)
//     //     .then((res) => {
//     //       setSchool(res.data);
//     //     })
//     //     .catch((err) => {
//     //       handleSignout();
//     //       console.error("Failed to fetch school:", err);
//     //     });
//     // }
//   }, [user, pathname, router, setSchool, handleSignout]);
// }

// use-role-redirect.ts
import { User } from "@/store/useAuth";
import { useRouter } from "next/navigation";

export function redirectByRole(
  user: User,
  router: ReturnType<typeof useRouter>
) {
  if (!user) return;
  const path = getDashboardPath(user.role);
  if (path) router.replace(path);
}

/** ✅ Utility version (imperative redirect for logo click, etc.) */
export function getDashboardPath(role: string) {
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

  return roleRoutes[role] ?? "/";
}
