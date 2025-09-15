import {
  LayoutDashboard,
  BookOpen,
  Users,
  Settings,
} from "lucide-react";

export const adminNav = [
  { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Courses", path: "/admin/courses", icon: BookOpen },
  { label: "Users", path: "/admin/users", icon: Users },
  { label: "Settings", path: "/admin/settings", icon: Settings },
];