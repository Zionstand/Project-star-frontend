import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = { id: string; email: string; name: string } | null;

type AuthState = {
  user: User;
  setUser: (user: User) => void;
  clearUser: () => void;
};

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    { name: "auth-user" }
  )
);
