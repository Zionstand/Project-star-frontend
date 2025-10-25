// // "use client";

// // import { useEffect, useRef } from "react";
// // import api from "@/lib/api";
// // import { useAuth } from "@/store/useAuth";

// // const REFRESH_INTERVAL = 14 * 60 * 1000; // 14 minutes (production)
// // const TEST_INTERVAL = 50 * 1000; // 50s for local tests with 1min token

// // export function useAutoRefresh({ testing = false } = {}) {
// //   const { user, clearUser } = useAuth();
// //   const intervalRef = useRef<number | null>(null);

// //   console.log("yesss");
// //   useEffect(() => {
// //     if (!user) {
// //       if (intervalRef.current) {
// //         clearInterval(intervalRef.current);
// //         intervalRef.current = null;
// //       }
// //       return;
// //     }

// //     const refresh = async () => {
// //       try {
// //         await api.post("/auth/refresh", {}, { withCredentials: true });
// //         console.log("🔁 token refreshed");
// //       } catch (err) {
// //         console.error("❌ refresh failed:", err);
// //         clearUser();
// //         if (typeof window !== "undefined") window.location.assign("/");
// //       }
// //     };

// //     // Immediate refresh once (useful for ensuring cookies exist)
// //     refresh();

// //     const intervalMs = testing ? TEST_INTERVAL : REFRESH_INTERVAL;
// //     intervalRef.current = window.setInterval(refresh, intervalMs);

// //     return () => {
// //       if (intervalRef.current) {
// //         clearInterval(intervalRef.current);
// //       }
// //     };
// //   }, [user, clearUser, testing]);
// // }

// "use client";

// import { useEffect, useRef } from "react";
// import api from "@/lib/api";
// import { useAuth } from "@/store/useAuth";

// const REFRESH_INTERVAL = 14 * 60 * 1000; // 14 minutes
// const TEST_INTERVAL = 50 * 1000; // 50 seconds

// export function useAutoRefresh({ testing = false } = {}) {
//   const { user, clearUser } = useAuth();
//   const hasStarted = useRef(false);
//   const intervalRef = useRef<number | null>(null);

//   useEffect(() => {
//     // 🚫 Don't run until user exists
//     if (!user || hasStarted.current) return;

//     hasStarted.current = true;

//     const refresh = async () => {
//       try {
//         // await api.post("/auth/refresh", {}, { withCredentials: true });
//         // console.log("🔁 token refreshed");

//         console.log(user);
//       } catch (err) {
//         // console.error("❌ refresh failed:", err);
//         // clearUser();
//         // if (typeof window !== "undefined") window.location.assign("/");
//       }
//     };

//     // First refresh immediately
//     refresh();

//     // Schedule next refresh
//     const intervalMs = testing ? TEST_INTERVAL : REFRESH_INTERVAL;
//     intervalRef.current = window.setInterval(refresh, intervalMs);

//     // Cleanup on unmount
//     return () => {
//       if (intervalRef.current) clearInterval(intervalRef.current);
//       hasStarted.current = false;
//     };
//   }, [user, clearUser, testing]);
// }

// hooks/use-auto-refresh.tsx
"use client";
import { useEffect, useRef } from "react";
import api from "@/lib/api";
import { useAuth } from "@/store/useAuth";

const REFRESH_INTERVAL = 14 * 60 * 1000; // 14 minutes
const TEST_INTERVAL = 50 * 1000; // 50s for testing

export function useAutoRefresh({ testing = false } = {}) {
  const { user, clearUser } = useAuth();
  const startedRef = useRef(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!user) {
      // If no user, cleanup and reset started flag
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      startedRef.current = false;
      return;
    }

    // Only start once per session/user set
    if (startedRef.current) return;
    startedRef.current = true;

    const doRefresh = async () => {
      try {
        // POST refresh endpoint, cookies included by axios config
        const res = await api.post(
          "/auth/refresh",
          {},
          { withCredentials: true }
        );
        console.log("🔁 token refreshed via auto-refresh", res?.status);
      } catch (err: any) {
        console.error("❌ refresh failed:", err?.response?.status || err);
        // Clear user and redirect to login
        clearUser();
        if (typeof window !== "undefined") {
          // Force hard navigation so cookies cleared and app resets
          window.location.assign("/");
        }
      }
    };

    // Immediately attempt a refresh to ensure cookies are good
    doRefresh();

    // schedule interval
    const ms = testing ? TEST_INTERVAL : REFRESH_INTERVAL;
    intervalRef.current = window.setInterval(doRefresh, ms);

    // also try refresh once when user comes back to tab
    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        doRefresh();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      document.removeEventListener("visibilitychange", onVisibility);
      startedRef.current = false;
    };
  }, [user, clearUser, testing]);
}
