// import axios, { AxiosError } from "axios";
// import { useAuth } from "@/store/useAuth";

// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
//   withCredentials: true,
// });

// let isRefreshing = false;
// let failedQueue: any[] = [];

// const processQueue = (error: any, token: string | null = null) => {
//   failedQueue.forEach((prom) => {
//     if (error) prom.reject(error);
//     else prom.resolve(token);
//   });
//   failedQueue = [];
// };

// function clientRedirect(path: string) {
//   if (typeof window !== "undefined") {
//     console.warn("Redirecting to:", path);
//     // always use assign to ensure full reload
//     window.location.assign(path);
//   }
// }

// // 🔁 Response interceptor
// api.interceptors.response.use(
//   (response) => response,
//   async (error: AxiosError & { config?: any }) => {
//     const originalRequest = error.config;
//     const status = error.response?.status;
//     const message = (error.response?.data as any)?.message;

//     // safety
//     if (!originalRequest) return Promise.reject(error);

//     // 401 retry logic
//     if (status === 401 && !originalRequest._retry) {
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject, config: originalRequest });
//         }).then(() => api(originalRequest));
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         const res = await api.post("/auth/refresh");
//         processQueue(null);
//         isRefreshing = false;

//         return api(originalRequest);
//       } catch (err: any) {
//         processQueue(err, null);
//         isRefreshing = false;

//         const { clearUser } = useAuth.getState();
//         clearUser();

//         // 🔥 Redirect guaranteed on client
//         setTimeout(() => clientRedirect("/login"), 10);

//         return Promise.reject(err);
//       }
//     }

//     // fallback: any other Unauthorized case
//     if (status === 401 || message === "Unauthorized") {
//       const { clearUser } = useAuth.getState();
//       clearUser();

//       setTimeout(() => clientRedirect("/login"), 10);
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;

// lib/api.ts
import axios, { AxiosError, AxiosInstance } from "axios";
import { useAuth } from "@/store/useAuth";

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// 🧭 Public routes that should NOT trigger refresh/redirect logic
const PUBLIC_ROUTES = [
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
  "/auth/verify-code",
  "/auth/set-new-password",
];

// 🧠 Helper — determines if a route is public
function isPublicRoute(url?: string) {
  if (!url) return false;
  return PUBLIC_ROUTES.some((r) => url.includes(r));
}

// 🔁 Refresh token state control
let isRefreshing = false;
let failedQueue: any[] = [];

function processQueue(error: any, token: string | null = null) {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
}

// 🚀 Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError & { config?: any }) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const message = (error.response?.data as any)?.message;
    const path = originalRequest?.url || "";

    // If it's a public route → just reject normally
    if (isPublicRoute(path)) {
      return Promise.reject(error);
    }

    // 🔐 401 token expired → try refresh
    if (status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => api(originalRequest));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await api.post("/auth/refresh");
        processQueue(null);
        isRefreshing = false;

        // Optionally set token header if your backend returns a new access token
        if (res.data?.access_token) {
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${res.data.access_token}`;
        }

        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        isRefreshing = false;

        // Clear user session globally
        const { clearUser } = useAuth.getState();
        clearUser();

        if (typeof window !== "undefined") {
          window.location.assign("/login");
        }

        return Promise.reject(err);
      }
    }

    // Generic unauthorized (but not refreshable)
    if (status === 401 || message === "Unauthorized") {
      const { clearUser } = useAuth.getState();
      clearUser();
      if (typeof window !== "undefined") {
        window.location.assign("/login");
      }
    }

    return Promise.reject(error);
  }
);

export default api;
