"use client";

import api from "@/lib/api";
import { useAuth } from "@/store/useAuth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// export const useSignout = () => {
//   const router = useRouter();

//   const handleSignout = async function signout() {
//     try {
//       const res = await api.post("/auth/logout");
//       toast.success(res.data.message);
//       router.push("/?logout=true");
//     } catch (error) {
//       toast.error("Oops! Failed to logout");
//       router.push("/?logout=true");
//     } finally {
//       useAuth.getState().clearUser();
//       router.push("/?logout=true");
//     }
//   };

//   return handleSignout;
// };

export const useSignout = () => {
  const router = useRouter();

  const handleSignout = async function signout() {
    try {
      const res = await api.post("/auth/logout");
      toast.success(res.data.message);
    } catch {
      toast.error("Oops! Failed to logout");
    } finally {
      useAuth.getState().clearUser();
      localStorage.removeItem("lastVisitedPath"); // 🔹 clear last page
      router.push("/?logout=true");
    }
  };

  return handleSignout;
};
