import axios, { AxiosError } from "axios";
import { useAuth } from "@/store/useAuth";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

function clientRedirect(path: string) {
  if (typeof window !== "undefined") {
    console.warn("Redirecting to:", path);
    // always use assign to ensure full reload
    window.location.assign(path);
  }
}

// 🔁 Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError & { config?: any }) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const message = (error.response?.data as any)?.message;

    // safety
    if (!originalRequest) return Promise.reject(error);

    // 401 retry logic
    if (status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest });
        }).then(() => api(originalRequest));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await api.post("/auth/refresh");
        processQueue(null);
        isRefreshing = false;

        return api(originalRequest);
      } catch (err: any) {
        processQueue(err, null);
        isRefreshing = false;

        const { clearUser } = useAuth.getState();
        clearUser();

        // 🔥 Redirect guaranteed on client
        setTimeout(() => clientRedirect("/login"), 10);

        return Promise.reject(err);
      }
    }

    // fallback: any other Unauthorized case
    if (status === 401 || message === "Unauthorized") {
      const { clearUser } = useAuth.getState();
      clearUser();

      setTimeout(() => clientRedirect("/login"), 10);
    }

    return Promise.reject(error);
  }
);

export default api;
