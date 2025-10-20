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
  ADMIN: "Administrator",
  COUNSELOR: "Counselor",
  LIBRARIAN: "Librarian",
  ADMINISTRATION: "Administration",
  MATHEMATICS: "Mathematics",
  SCIENCE: "Science",
  ENGLISH: "English",
  "LIBRARY SERVICE": "Library Service",
  PARTIAL: "Partial",
  OVERDUE: "Overdue",
};

export const getAcronym = (name?: string) => {
  if (!name) return "LGS"; // fallback
  const words = name.trim().split(/\s+/);
  return words
    .slice(0, 3)
    .map((word) => word[0]?.toUpperCase())
    .join("");
};
