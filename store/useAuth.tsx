import { Class } from "@/app/(app)/(admin)/a/classes/page";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type School = {
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
  schoolID: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
} | null;

export type User = {
  id: string;
  email: string;
  title?: string;
  firstName: string;
  lastName: string;
  username: School;
  phoneNumber: string;
  image: string | null;
  employeeID: string | null;
  department: string | null;
  medicalConditions: string | null;
  dob: string | null;
  createdAt: string | null;
  city: string | null;
  address: string | null;
  state: string | null;
  country: string | null;
  emergencyContactName: string | null;
  emergencyPhoneNumber: string | null;
  role: string;
  gender: string | null;
  school?: School;
  schoolId: string;
  classes?: Class[];
} | null;

type AuthState = {
  user: User;
  setUser: (user: User) => void;
  clearUser: () => void;
  updateSchool: (school: School) => void;
  _hasHydrated: boolean; // ✅ added
  setHasHydrated: (hasHydrated: boolean) => void; // ✅ added
};

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      updateSchool: (school) =>
        set((state) => ({
          user: state.user ? { ...state.user, school } : null,
        })),
      _hasHydrated: false,
      setHasHydrated: (hasHydrated) => set({ _hasHydrated: hasHydrated }),
    }),
    {
      name: "auth-user",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
