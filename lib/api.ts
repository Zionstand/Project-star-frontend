import axios, { AxiosError, AxiosInstance } from "axios";
import { useAuth } from "@/store/useAuth";

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

const PUBLIC_ROUTES = [
  "/auth",
  "/auth/register",
  "/auth/forgot-password",
  "/auth/verify-code",
  "/auth/set-new-password",
];

function isPublicRoute(url?: string) {
  if (!url) return false;
  return PUBLIC_ROUTES.some((r) => url.includes(r));
}

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (v?: any) => void;
  reject: (e?: any) => void;
}> = [];

function processQueue(error: any) {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve();
  });
  failedQueue = [];
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError & { config?: any }) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const message = (error.response?.data as any)?.message;
    const path = originalRequest?.url || "";

    if (isPublicRoute(path)) {
      return Promise.reject(error);
    }

    // 401 => attempt refresh (if not retried already)
    if (status === 401 && !originalRequest._retry) {
      // If another refresh is in progress, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => api(originalRequest));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Explicit withCredentials here ensures cookie is sent
        await api.post("/auth/refresh", {}, { withCredentials: true });

        // Refresh succeeded, resolve queued requests
        processQueue(null);
        isRefreshing = false;

        // Retry the original request
        return api(originalRequest);
      } catch (err) {
        // Refresh failed — reject queue and logout
        processQueue(err);
        isRefreshing = false;

        const { clearUser } = useAuth.getState();
        clearUser();

        if (typeof window !== "undefined") {
          window.location.assign("/");
        }

        return Promise.reject(err);
      }
    }

    // Generic 401 or Unauthorized message — force logout
    if (status === 401 || message === "Unauthorized") {
      const { clearUser } = useAuth.getState();
      clearUser();
      if (typeof window !== "undefined") {
        window.location.assign("/");
      }
    }

    return Promise.reject(error);
  }
);

export default api;

export async function fetchData<T>(url: string): Promise<T> {
  const res = await api.get(url);
  return res.data;
}
export async function postData<T>(url: string, data: any): Promise<T> {
  const res = await api.post(url, data);
  return res.data;
}
export async function updateData<T>(url: string, data: any): Promise<T> {
  const res = await api.patch(url, data);
  return res.data;
}
