import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, Users, FolderUp, ClipboardCheck,
  Calendar, Bell, Shield, ChevronLeft, Menu,
  Home, Trophy, Hash, Settings, Search, Plus,
  Inbox, Star, Filter, CheckCircle2
} from "lucide-react";
import { useState } from "react";

const mainNav = [
  { label: "Inbox", icon: Inbox, path: "/dashboard" },
  { label: "Today", icon: Calendar, path: "/schedule" },
  { label: "Upcoming", icon: Star, path: "/notifications" },
];

const platformNav = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Registration", icon: Users, path: "/register" },
  { label: "Submissions", icon: FolderUp, path: "/submissions" },
  { label: "Evaluation", icon: ClipboardCheck, path: "/evaluation" },
  { label: "Schedule", icon: Calendar, path: "/schedule" },
  { label: "Notifications", icon: Bell, path: "/notifications" },
  { label: "Admin", icon: Shield, path: "/admin" },
];

const favoriteItems = [
  { label: "Home", icon: Hash, path: "/dashboard" },
  { label: "Problem Statements", icon: Hash, path: "/evaluation" },
];

const projectItems = [
  { label: "My Team", icon: Hash, path: "/register" },
  { label: "Submissions", icon: Hash, path: "/submissions" },
];

export const DashboardSidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const NavItem = ({ item, showBullet = false }: { item: { label: string; icon: React.ElementType; path: string }; showBullet?: boolean }) => {
    const isActive = location.pathname === item.path;
    return (
      <li>
        <Link
          to={item.path}
          className={cn(
            "flex items-center gap-3 px-3 py-1.5 rounded-md text-[13px] transition-all duration-150",
            isActive
              ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
              : "text-sidebar-foreground hover:bg-muted/60"
          )}
        >
          {showBullet ? (
            <span className="w-4 h-4 flex items-center justify-center">
              <item.icon className="w-3.5 h-3.5 shrink-0 opacity-60" />
            </span>
          ) : (
            <item.icon className="w-4 h-4 shrink-0" />
          )}
          {!collapsed && <span>{item.label}</span>}
        </Link>
      </li>
    );
  };

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-card text-foreground p-2 rounded-lg shadow-md"
        onClick={() => setCollapsed(!collapsed)}
      >
        <Menu className="w-5 h-5" />
      </button>

      <aside
        className={cn(
          "fixed left-0 top-0 h-screen bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col transition-all duration-300 z-40",
          collapsed ? "w-0 md:w-14 overflow-hidden" : "w-60"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-3 pt-3 pb-2">
          {!collapsed && (
            <Link to="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[hsl(var(--accent))] to-[hsl(14,80%,48%)] flex items-center justify-center">
                <Home className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-semibold text-sm text-foreground">Utkal Hackathon</span>
            </Link>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex p-1 rounded-md hover:bg-muted/60 transition-colors"
          >
            <ChevronLeft className={cn("w-4 h-4 text-muted-foreground transition-transform", collapsed && "rotate-180")} />
          </button>
        </div>

        {/* Search */}
        {!collapsed && (
          <div className="px-3 pb-2">
            <button className="w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-[13px] text-muted-foreground hover:bg-muted/60 transition-colors">
              <Search className="w-3.5 h-3.5" />
              <span>Search</span>
            </button>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-2">
          {/* Platform */}
          <ul className="space-y-0.5">
            {platformNav.map((item) => (
              <NavItem key={item.path + item.label} item={item} />
            ))}
          </ul>

          {/* Favorites */}
          {!collapsed && (
            <>
              <div className="mt-5 mb-1 px-3 flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                  Favorites
                </span>
              </div>
              <ul className="space-y-0.5">
                {favoriteItems.map((item) => (
                  <NavItem key={item.label} item={item} showBullet />
                ))}
              </ul>
            </>
          )}

          {/* My Projects */}
          {!collapsed && (
            <>
              <div className="mt-5 mb-1 px-3 flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                  My Projects
                </span>
                <button className="p-0.5 rounded hover:bg-muted/60 transition-colors">
                  <Plus className="w-3 h-3 text-muted-foreground" />
                </button>
              </div>
              <ul className="space-y-0.5">
                {projectItems.map((item) => (
                  <NavItem key={item.label} item={item} showBullet />
                ))}
              </ul>
            </>
          )}
        </nav>

        {/* Footer */}
        {!collapsed && (
          <div className="px-2 py-3 border-t border-sidebar-border">
            <Link
              to="/dashboard"
              className="flex items-center gap-3 px-3 py-1.5 rounded-md text-[13px] text-sidebar-foreground hover:bg-muted/60 transition-colors"
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
      <main className="md:ml-60 p-6 md:p-8">
        {children}
      </main>
    </div>
  );
};
