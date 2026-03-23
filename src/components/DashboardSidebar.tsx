import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, Users, FolderUp, ClipboardCheck,
  Calendar, Bell, Shield, ChevronLeft, Menu,
  Home, Settings, LogOut, User, FileText, CheckSquare
} from "lucide-react";
import { useState } from "react";

const sidebarNav = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "My Profile", icon: User, path: "/register" },
  { label: "Teams", icon: Users, path: "/register" },
  { label: "Submissions", icon: FolderUp, path: "/submissions" },
  { label: "Problem Statements", icon: FileText, path: "/evaluation" },
  { label: "Selection Status", icon: CheckSquare, path: "/evaluation" },
  { label: "Evaluation", icon: ClipboardCheck, path: "/evaluation" },
  { label: "Schedule", icon: Calendar, path: "/schedule" },
  { label: "Notifications", icon: Bell, path: "/notifications" },
  { label: "Admin Panel", icon: Shield, path: "/admin" },
];

export const DashboardSidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-sidebar p-2 rounded-lg shadow-md border border-sidebar-border"
        onClick={() => setCollapsed(!collapsed)}
      >
        <Menu className="w-5 h-5 text-sidebar-foreground" />
      </button>

      <aside
        className={cn(
          "fixed left-0 top-0 h-screen bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col transition-all duration-300 z-40",
          collapsed ? "w-0 md:w-16 overflow-hidden" : "w-60"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-sidebar-border">
          {!collapsed && (
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg accent-gradient flex items-center justify-center">
                <Home className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-sm text-foreground">Utkal Hackathon</span>
            </Link>
          )}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1.5 rounded-md hover:bg-sidebar-accent transition-colors"
            >
              <ChevronLeft className={cn("w-4 h-4 text-muted-foreground transition-transform", collapsed && "rotate-180")} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 px-2">
          <ul className="space-y-1">
            {sidebarNav.map((item) => {
              const isActive = location.pathname === item.path && 
                (item.label === "Admin Panel" ? location.pathname === "/admin" : true);
              // More precise active check for items sharing paths
              const isExactActive = item.label === "Admin Panel" 
                ? location.pathname === "/admin"
                : item.label === "Dashboard" 
                  ? location.pathname === "/dashboard"
                  : item.label === "Submissions"
                    ? location.pathname === "/submissions"
                    : item.label === "Schedule"
                      ? location.pathname === "/schedule"
                      : item.label === "Notifications"
                        ? location.pathname === "/notifications"
                        : item.label === "My Profile"
                          ? location.pathname === "/register"
                          : false;

              return (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-150",
                      isExactActive
                        ? "bg-sidebar-accent text-sidebar-primary"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                    )}
                  >
                    <item.icon className={cn("w-[18px] h-[18px] shrink-0", isExactActive && "text-sidebar-primary")} />
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        {!collapsed && (
          <div className="px-2 py-3 border-t border-sidebar-border space-y-1">
            <Link
              to="/dashboard"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
            >
              <Settings className="w-[18px] h-[18px]" />
              <span>Settings</span>
            </Link>
            <button
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
            >
              <LogOut className="w-[18px] h-[18px]" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      <main className="md:ml-60 p-6 md:p-8">
        {children}
      </main>
    </div>
  );
};
