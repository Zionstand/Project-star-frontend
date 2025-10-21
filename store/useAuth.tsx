import { create } from "zustand";
import { persist } from "zustand/middleware";

type School = {
  id: string;
  name: string;
  acronym: string | null;
  motto: string | null;
  visionStatement: string | null;
  missionStatement: string | null;
  establishmentYear: string | null;
  logo: string | null;
  schoolType: string | null;
  ownershipType: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
  state: string | null;
  postalCode: string | null;
  primaryPhone: string | null;
  alternatePhone: string | null;
  email: string | null;
  website: string | null;
  currentSession: string | null;
  currentTerm: string | null;
  termsPerSession: string | null;
  academicStartDate: string | null;
  academicEndDate: string | null;
  gradingSystem: string | null;
  passMark: string | null;
  schoolRegistrationNumber: string | null;
  accreditationBody: string | null;
  accreditationNumber: string | null;
  createdAt: Date | null;
  updatedAT: Date | null;
} | null;

type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string | null;
  role: string;
  ownedSchool?: School;
} | null;

type AuthState = {
  user: User;
  setUser: (user: User) => void;
  clearUser: () => void;
  updateSchool: (school: School) => void; // Update school details
};

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      updateSchool: (school) =>
        set((state) => ({
          user: state.user ? { ...state.user, ownedSchool: school } : null,
        })),
    }),
    { name: "auth-user" }
  )
);
