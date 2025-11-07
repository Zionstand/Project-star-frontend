import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  IconBook,
  IconCalendar,
  IconSchool,
  IconUser,
  IconUserPlus,
} from "@tabler/icons-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatMoneyInput = (inputValue: string | number) => {
  if (inputValue == null) return "";

  let value = String(inputValue);

  // Allow spaces in text — don't format unless it's a pure number
  const numericOnly = value.replace(/,/g, ""); // remove commas to check

  if (!/^\d+(\.\d+)?$/.test(numericOnly)) {
    // Not a number → return raw text
    return value;
  }

  // Split whole and decimal
  let [whole, decimal] = numericOnly.split(".");

  // Add commas to whole number
  whole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return decimal !== undefined ? `${whole}.${decimal}` : whole;
};

export const activityIconMap: Record<
  string,
  { icon: React.ElementType; color: string }
> = {
  STUDENT: { icon: IconUser, color: "text-primary" },
  ASSIGNMENT: { icon: IconBook, color: "text-green-500" },
  CALENDAR: { icon: IconCalendar, color: "text-orange-500" },
  GRADE: { icon: IconSchool, color: "text-purple-500" },
};

export function getRelativeTime(date: Date): string {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 5) return "just now";
  if (seconds < 60) return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days !== 1 ? "s" : ""} ago`;

  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months !== 1 ? "s" : ""} ago`;

  const years = Math.floor(days / 365);
  return `${years} year${years !== 1 ? "s" : ""} ago`;
}

export function formatDate(dateString: string | any): string {
  const date = new Date(dateString);

  // Get the day, month and year
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  // Function to get the ordinal suffix
  const getOrdinalSuffix = (num: number): string => {
    const suffixes = ["th", "st", "nd", "rd"];
    const modulo100 = num % 100;
    const modulo10 = num % 10;
    const suffix =
      modulo10 <= 3 && modulo10 > 0 && modulo100 !== 11
        ? suffixes[modulo10]
        : suffixes[0];
    return `${num}${suffix}`;
  };

  // Format the date
  return `${month} ${getOrdinalSuffix(day)}, ${year}`;
}

export const maskEmail = (email: string) => {
  const [name, domain] = email.split("@");
  if (!name || !domain) return email; // fallback for invalid emails

  const maskedName =
    name.length > 2
      ? name.slice(0, 2) + "*".repeat(name.length - 2)
      : name[0] + "*";
  const maskedDomain =
    domain.length > 3
      ? domain[0] + "*".repeat(domain.length - 2) + domain.slice(-4)
      : domain;

  return `${maskedName}@${maskedDomain}`;
};

export const formatWord: Record<string, string> = {
  PENDING: "Pending",
  FAILED: "Failed",
  REFUNDED: "Refunded",
  SUCCESS: "Success",
  APPROVED: "Approved",
  REJECTED: "Rejected",
  ACTIVE: "Active",
  EXPIRED: "Expired",
  CANCELED: "Canceled",
  MONTHLY: "Monthly",
  ANNUALLY: "Yearly",
  DRAFT: "Draft",
  PUBLISHED: "Published",
  DELETED: "Deleted",
  ARCHIVED: "Archived",
  PAID: "Paid",
  CREDIT: "Credit",
  PROCESSING: "Processing",
  DEBIT: "Debit",
  CORE: "Core",
  ELECTIVE: "Elective",
  VOCATIONAL: "Vocational",
  INACTIVE: "Inactive",
  "ON LEAVE": "On leave",
  TEACHER: "Teacher",
  PRINCIPAL: "Principal",
  ADMINISTRATOR: "Administrator",
  COUNSELOR: "Counselor",
  LIBRARIAN: "Librarian",
  ADMINISTRATION: "Administration",
  MATHEMATICS: "Mathematics",
  SCIENCE: "Science",
  ENGLISH: "English",
  "LIBRARY SERVICE": "Library Service",
  PARTIAL: "Partial",
  OVERDUE: "Overdue",
  PRIMARY: "Primary",
  SECONDARY: "Secondary",
  COMBINED: "Combined",
  "EXAM OFFICER": "Examination officer",
  BURSAR: "Bursar",
  "IT SUPPORT": "IT Support",
  "DATA ANALYST": "Data Analyst",
  STUDENT: "Student",
};

export function formatPhoneNumber(
  phone: string | null = "",
  style: "international" | "local" = "international"
): string {
  if (!phone) return "";

  // Remove all non-digit chars but keep +
  const cleaned = phone.replace(/[^\d+]/g, "");

  // Nigerian numbers start with +234 or 0
  if (style === "international") {
    // Format as +234 802 783 6001
    return cleaned.replace(/^(\+234)(\d{3})(\d{3})(\d{4})$/, "$1 $2 $3 $4");
  } else {
    // Convert +2348027836001 → 08027836001
    return cleaned.replace(/^\+234(\d{3})(\d{3})(\d{4})$/, "0$1 $2 $3");
  }
}

export function calculateAge(dob: string | Date): number {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

// export const calculateTimeLeft = (dueDate: string | Date): string => {
//   if (!dueDate) return "No due date";

//   const now = new Date();
//   const due = new Date(dueDate);

//   const diffInMs = due.getTime() - now.getTime(); // ensure both are numbers

//   if (diffInMs <= 0) return "Past due";

//   const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
//   const diffInHours = Math.floor(
//     (diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//   );
//   const diffInMinutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));

//   if (diffInDays > 0) {
//     return `${diffInDays} day${diffInDays > 1 ? "s" : ""} left`;
//   } else if (diffInHours > 0) {
//     return `${diffInHours} hour${
//       diffInHours > 1 ? "s" : ""
//     } ${diffInMinutes} min left`;
//   } else {
//     return `${diffInMinutes} min left`;
//   }
// };

type TimeLeftResult = {
  label: string;
  colorClass: string;
};

export const calculateTimeLeft = (dueDate: string | Date): TimeLeftResult => {
  if (!dueDate) return { label: "No due date", colorClass: "text-gray-300" };

  const now = new Date();
  const due = new Date(dueDate);
  const diffInMs = due.getTime() - now.getTime();

  if (diffInMs <= 0) return { label: "Past due", colorClass: "text-red-400" };

  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInHours = Math.floor(
    (diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const diffInMinutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));

  // Logic for display + color
  if (diffInDays > 1)
    return { label: `${diffInDays} days left`, colorClass: "text-green-500" }; // soft green
  if (diffInDays === 1)
    return { label: "1 day left", colorClass: "text-green-400" }; // slightly lighter green
  if (diffInHours > 0)
    return {
      label: `${diffInHours}h ${diffInMinutes}m left`,
      colorClass: "text-yellow-500",
    }; // yellow on blue
  return { label: `${diffInMinutes} min left`, colorClass: "text-orange-500" }; // orange for urgency
};

export const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};
