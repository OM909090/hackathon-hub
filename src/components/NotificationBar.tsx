import { useState } from "react";
import { Bell, X, CheckCircle2, AlertTriangle, Info, Megaphone } from "lucide-react";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: "success" | "warning" | "info" | "announcement";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  { id: "1", type: "announcement", title: "Hackathon Registration Open", message: "Registration is now open. Form your teams and get ready!", time: "1h ago", read: false },
  { id: "2", type: "success", title: "Profile Verified", message: "Your profile has been verified successfully.", time: "3h ago", read: false },
  { id: "3", type: "info", title: "Team Created", message: "Your team 'CodeCrafters' has been created.", time: "1d ago", read: true },
  { id: "4", type: "warning", title: "Deadline Approaching", message: "Submission deadline is in 2 days.", time: "2d ago", read: true },
];

const typeIcons = {
  success: CheckCircle2,
  warning: AlertTriangle,
  info: Info,
  announcement: Megaphone,
};

const typeColors = {
  success: "text-success",
  warning: "text-warning",
  info: "text-info",
  announcement: "text-accent",
};

export const NotificationBar = () => {
  const [open, setOpen] = useState(false);
  const [notifications] = useState(mockNotifications);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-lg hover:bg-muted/60 transition-colors"
      >
        <Bell className="w-5 h-5 text-muted-foreground" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-accent text-accent-foreground text-[10px] font-bold flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-12 w-80 md:w-96 z-50 card-elevated rounded-xl overflow-hidden shadow-xl">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="font-semibold text-sm">Notifications</h3>
              <button onClick={() => setOpen(false)}>
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="max-h-80 overflow-y-auto divide-y divide-border">
              {notifications.map((n) => {
                const Icon = typeIcons[n.type];
                return (
                  <div key={n.id} className={cn("p-4 hover:bg-muted/30 transition-colors", !n.read && "bg-accent/5")}>
                    <div className="flex gap-3">
                      <Icon className={cn("w-4 h-4 mt-0.5 shrink-0", typeColors[n.type])} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium truncate">{n.title}</span>
                          {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{n.message}</p>
                        <span className="text-[10px] text-muted-foreground mono mt-1 block">{n.time}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
