import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, Users, FolderUp, ClipboardCheck,
  Calendar, Bell, Settings, Shield, ChevronLeft, Menu,
  Home, Trophy
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Registration", icon: Users, path: "/register" },
  { label: "Submissions", icon: FolderUp, path: "/submissions" },
  { label: "Evaluation", icon: ClipboardCheck, path: "/evaluation" },
  { label: "Schedule", icon: Calendar, path: "/schedule" },
  { label: "Notifications", icon: Bell, path: "/notifications" },
  { label: "Admin", icon: Shield, path: "/admin" },
];

const favoriteItems = [
  { label: "Problem Statements", icon: Trophy, path: "/dashboard" },
  { label: "My Team", icon: Users, path: "/dashboard" },
];

export const DashboardSidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-sidebar text-sidebar-foreground p-2 rounded-lg"
        onClick={() => setCollapsed(!collapsed)}
      >
        <Menu className="w-5 h-5" />
      </button>

      <aside
        className={cn(
          "fixed left-0 top-0 h-screen bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col transition-all duration-300 z-40",
          collapsed ? "w-0 md:w-16 overflow-hidden" : "w-64"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          {!collapsed && (
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg accent-gradient flex items-center justify-center">
                <Home className="w-4 h-4 text-accent-foreground" />
              </div>
              <span className="font-semibold text-sm text-sidebar-accent-foreground">Utkal Hackathon</span>
            </Link>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex p-1.5 rounded-md hover:bg-sidebar-accent transition-colors"
          >
            <ChevronLeft className={cn("w-4 h-4 transition-transform", collapsed && "rotate-180")} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto">
          <div className={cn("px-3 mb-2", collapsed && "px-2")}>
            {!collapsed && (
              <span className="text-[10px] uppercase tracking-widest text-sidebar-foreground/50 px-3">
                Platform
              </span>
            )}
          </div>
          <ul className="space-y-0.5 px-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150",
                      isActive
                        ? "bg-sidebar-primary text-sidebar-primary-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )}
                  >
                    <item.icon className="w-4 h-4 shrink-0" />
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>

          {!collapsed && (
            <>
              <div className="px-3 mt-6 mb-2">
                <span className="text-[10px] uppercase tracking-widest text-sidebar-foreground/50 px-3">
                  Favorites
                </span>
              </div>
              <ul className="space-y-0.5 px-2">
                {favoriteItems.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.path}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-150"
                    >
                      <item.icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </nav>

        {/* Footer */}
        {!collapsed && (
          <div className="p-4 border-t border-sidebar-border">
            <Link
              to="/dashboard"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </Link>
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
      <main className="md:ml-64 p-6 md:p-8">
        {children}
      </main>
    </div>
  );
};
