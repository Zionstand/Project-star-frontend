import {
  IconLayout,
  IconUserCheck,
  IconSchool,
  IconCalendar,
  IconBook,
  IconUsers,
  IconUserCog,
  IconShield,
  IconClipboardList,
  IconClock,
  IconCreditCard,
  IconChartHistogram,
  IconSettings,
  IconDownload,
  IconDeviceLaptop,
} from "@tabler/icons-react";

export const adminNavLinks = [
  {
    title: "Main",
    url: "#",
    icon: IconLayout,
    items: [
      {
        title: "Dashboard",
        url: "/a/dashboard",
        icon: IconLayout,
      },
      {
        title: "Students Approvals",
        url: "/a/students/approval",
        icon: IconUserCheck,
      },
    ],
  },
  {
    title: "School Setup",
    url: "#",
    icon: IconSchool,
    isActive: true,
    items: [
      {
        title: "School Profile",
        url: "/a/school",
        icon: IconSchool,
      },
      {
        title: "Academic Calendar",
        url: "/a/students/calendar",
        icon: IconCalendar,
      },
      {
        title: "Classes & Subjects",
        url: "/a/classes",
        icon: IconBook,
      },
    ],
  },
  {
    title: "Management",
    url: "#",
    icon: IconUsers,
    items: [
      {
        title: "Students Management",
        url: "/a/students",
        icon: IconUsers,
      },
      {
        title: "Staff Management",
        url: "/a/staffs",
        icon: IconUserCog,
      },
      {
        title: "Roles & Permissions",
        url: "/a/roles",
        icon: IconShield,
      },
    ],
  },
  {
    title: "Academic",
    url: "#",
    icon: IconClipboardList,
    items: [
      {
        title: "Assessment Setup",
        url: "/a/assessment",
        icon: IconClipboardList,
      },
      {
        title: "Timetables",
        url: "/a/timetables",
        icon: IconClock,
      },
    ],
  },
  {
    title: "Finance",
    url: "#",
    icon: IconCreditCard,
    items: [
      {
        title: "Fees & Payments",
        url: "/a/fees",
        icon: IconCreditCard,
      },
      {
        title: "Reports",
        url: "/a/reports",
        icon: IconChartHistogram,
      },
    ],
  },
  {
    title: "System",
    url: "#",
    icon: IconDeviceLaptop,
    items: [
      {
        title: "Import",
        url: "/a/import",
        icon: IconDownload,
      },
      {
        title: "Settings",
        url: "/a/settings",
        icon: IconSettings,
      },
    ],
  },
];

export const DEFAULT_PROFILE_IMAGE = "/assets/images/profile-img.jpg";

export const allClasses = [
  {
    value: "JSS1",
    label: "Junior Secondary School 1",
  },
  {
    value: "JSS2",
    label: "Junior Secondary School 2",
  },
  {
    value: "JSS3",
    label: "Junior Secondary School 3",
  },
  {
    value: "SSS1",
    label: "Senior Secondary School 1",
  },
  {
    value: "SSS2",
    label: "Senior Secondary School 2",
  },
  {
    value: "SSS3",
    label: "Senior Secondary School 3",
  },
];

export const studentStatuses = ["PENDING", "APPROVED", "REJECTED"];

export const subjectStatuses = ["ACTIVE", "INACTIVE", "DRAFT"];
export const staffStatuses = ["ACTIVE", "INACTIVE", "ON LEAVE"];
export const subjectTypes = ["CORE", "ELECTIVE", "VOCATIONAL"];
export const departments = [
  "ADMINISTRATION",
  "MATHEMATICS",
  "SCIENCE",
  "ENGLISH",
  "LIBRARY SERVICE",
];
export const allRoles = [
  "TEACHER",
  "PRINCIPAL",
  "ADMIN",
  "COUNSELOR",
  "LIBRARIAN",
];
export const feesStatus = ["PAID", "PENDING", "OVERDUE", "PARTIAL"];
