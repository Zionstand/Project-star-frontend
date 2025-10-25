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
  IconDeviceImacUp,
  IconAlertCircle,
  IconFileDescription,
  IconMessage,
  IconServerBolt,
  IconUsersGroup,
  IconCurrencyDollar,
  IconChartInfographic,
  IconNotebook,
  IconTrendingUp,
  IconWallet,
  IconChalkboardTeacher,
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
        url: "/a/school/calendar",
        icon: IconCalendar,
      },
      {
        title: "Classes",
        url: "/a/classes",
        icon: IconBook,
      },
      {
        title: "Subjects",
        url: "/a/subjects",
        icon: IconSchool,
      },
      {
        title: "Teachers",
        url: "/a/teachers",
        icon: IconChalkboardTeacher,
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

export const teacherNavLinks = [
  {
    title: "Main",
    url: "#",
    icon: IconLayout,
    items: [
      {
        title: "Dashboard",
        url: "/t/dashboard",
        icon: IconLayout,
      },
    ],
  },
  {
    title: "Daily Operations",
    url: "#",
    icon: IconUsers,
    isActive: true,
    items: [
      {
        title: "Mark Attendance",
        url: "/t/attendances",
        icon: IconUsers,
      },
      {
        title: "Enter Grades",
        url: "/t/grades",
        icon: IconDeviceImacUp,
      },
      {
        title: "Behavior Notes",
        url: "/t/behavior-notes",
        icon: IconAlertCircle,
      },
      {
        title: "Assignments & Lessons",
        url: "/t/assignments",
        icon: IconFileDescription,
      },
    ],
  },
  {
    title: "Communication",
    url: "#",
    icon: IconMessage,
    items: [
      {
        title: "Messages",
        url: "/messages",
        icon: IconMessage,
      },
    ],
  },
  {
    title: "Academic",
    url: "#",
    icon: IconClock,
    items: [
      {
        title: "My Timetable",
        url: "/t/timetable",
        icon: IconClock,
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

export const ITSupportNavLinks = [
  {
    title: "Main",
    url: "#",
    icon: IconLayout,
    items: [
      {
        title: "Dashboard",
        url: "/t/dashboard",
        icon: IconLayout,
      },
    ],
  },
  {
    title: "System Management",
    url: "#",
    icon: IconUsers,
    isActive: true,
    items: [
      {
        title: "User Accounts",
        url: "/it/user-accounts",
        icon: IconUsers,
      },
      {
        title: "System Logs",
        url: "/it/system-logs",
        icon: IconFileDescription,
      },
      {
        title: "Backup & Recovery",
        url: "/it/backups",
        icon: IconServerBolt,
      },
    ],
  },
  {
    title: "Support",
    url: "#",
    icon: IconAlertCircle,
    items: [
      {
        title: "Support Tickets",
        url: "/it/tickets",
        icon: IconAlertCircle,
      },
    ],
  },
  {
    title: "System",
    url: "#",
    icon: IconSettings,
    items: [
      {
        title: "Configuration",
        url: "/it/configuration",
        icon: IconSettings,
      },
    ],
  },
];

export const dataAnalystNavLinks = [
  {
    title: "Main",
    url: "#",
    icon: IconLayout,
    items: [
      {
        title: "Dashboard",
        url: "/da/dashboard",
        icon: IconLayout,
      },
    ],
  },
  {
    title: "Analytics",
    url: "#",
    icon: IconUsers,
    isActive: true,
    items: [
      {
        title: "Student Performance",
        url: "/da/students",
        icon: IconUsers,
      },
      {
        title: "Staff Analyst",
        url: "/da/staffs",
        icon: IconUsersGroup,
      },
      {
        title: "Attendance Trends",
        url: "/da/attendance",
        icon: IconClock,
      },
      {
        title: "Financial Analysis",
        url: "/da/financial",
        icon: IconCurrencyDollar,
      },
    ],
  },
  {
    title: "Reports",
    url: "#",
    icon: IconChartInfographic,
    items: [
      {
        title: "Custom Reports",
        url: "da/custom-reports",
        icon: IconChartInfographic,
      },
    ],
  },
  {
    title: "System",
    url: "#",
    icon: IconSettings,
    items: [
      {
        title: "Configuration",
        url: "/da/configuration",
        icon: IconSettings,
      },
    ],
  },
];

export const librarianNavLinks = [
  {
    title: "Main",
    url: "#",
    icon: IconLayout,
    items: [
      {
        title: "Dashboard",
        url: "/l/dashboard",
        icon: IconLayout,
      },
    ],
  },
  {
    title: "Library Management",
    url: "#",
    icon: IconBook,
    isActive: true,
    items: [
      {
        title: "Book Catalog",
        url: "/l/books",
        icon: IconBook,
      },
      {
        title: "Lending & Returns",
        url: "/l/lending",
        icon: IconNotebook,
      },
      {
        title: "Library Members",
        url: "/l/members",
        icon: IconUsersGroup,
      },
      {
        title: "Overdue Books",
        url: "/l/overdue",
        icon: IconAlertCircle,
      },
    ],
  },
  {
    title: "Reports",
    url: "#",
    icon: IconChartInfographic,
    items: [
      {
        title: "Library Reports",
        url: "/l/reports",
        icon: IconChartInfographic,
      },
    ],
  },
  {
    title: "System",
    url: "#",
    icon: IconSettings,
    items: [
      {
        title: "Configuration",
        url: "/da/configuration",
        icon: IconSettings,
      },
    ],
  },
];

export const bursarNavLinks = [
  {
    title: "Main",
    url: "#",
    icon: IconLayout,
    items: [
      {
        title: "Dashboard",
        url: "/b/dashboard",
        icon: IconLayout,
      },
    ],
  },
  {
    title: "Finance",
    url: "#",
    icon: IconCreditCard,
    isActive: true,
    items: [
      {
        title: "Book Catalog",
        url: "/b/fee-collection",
        icon: IconCreditCard,
      },
      {
        title: "Expense Management",
        url: "/b/expenses",
        icon: IconTrendingUp,
      },
      {
        title: "Salary Processing",
        url: "/b/salary",
        icon: IconWallet,
      },
      {
        title: "Budget Planning",
        url: "/b/budget",
        icon: IconCurrencyDollar,
      },
    ],
  },
  {
    title: "Reports",
    url: "#",
    icon: IconChartInfographic,
    items: [
      {
        title: "Financial Reports",
        url: "/b/financial",
        icon: IconChartInfographic,
      },
    ],
  },
  {
    title: "System",
    url: "#",
    icon: IconSettings,
    items: [
      {
        title: "Configuration",
        url: "/da/configuration",
        icon: IconSettings,
      },
    ],
  },
];

export const roleNavMap: Record<string, any[]> = {
  ADMINISTRATOR: adminNavLinks,
  TEACHER: teacherNavLinks,
  "IT SUPPORT": ITSupportNavLinks,
  "DATA ANALYST": dataAnalystNavLinks,
  LIBRARIAN: librarianNavLinks,
  BURSAR: bursarNavLinks,
  //   STUDENT: studentNavLinks,
  //   PARENT: parentNavLinks,
};
