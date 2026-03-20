import { DashboardLayout } from "@/components/DashboardSidebar";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { Bell, CheckCircle2, AlertCircle, Info, Clock } from "lucide-react";

type NotificationType = "success" | "warning" | "info";

const notifications: { type: NotificationType; title: string; message: string; time: string; read: boolean }[] = [
  { type: "success", title: "Submission Confirmed", message: "Your project 'MedTrack' has been submitted successfully.", time: "2 hours ago", read: false },
  { type: "info", title: "Stage 1 Review Started", message: "Your project is now under Stage 1 online review.", time: "5 hours ago", read: false },
  { type: "warning", title: "Deadline Reminder", message: "Project submission deadline is in 48 hours. Complete your uploads.", time: "1 day ago", read: false },
  { type: "info", title: "New Announcement", message: "Webinar on 'Preparing Your Demo' — March 25 at 3 PM IST.", time: "2 days ago", read: true },
  { type: "success", title: "Team Complete", message: "Rohan Behera joined your team 'CodeCrafters'.", time: "3 days ago", read: true },
  { type: "info", title: "Registration Confirmed", message: "Your registration for Utkal Hackathon v2.0 is confirmed.", time: "5 days ago", read: true },
];

const typeConfig = {
  success: { icon: CheckCircle2, bg: "bg-success/10", text: "text-success" },
  warning: { icon: AlertCircle, bg: "bg-warning/10", text: "text-warning" },
  info: { icon: Info, bg: "bg-info/10", text: "text-info" },
};

const Notifications = () => {
  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Notifications</h1>
              <p className="text-muted-foreground text-sm mt-1">Stay updated on your hackathon journey</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-accent font-medium cursor-pointer hover:underline">
              <Bell className="w-4 h-4" /> Mark all read
            </div>
          </div>
        </ScrollReveal>

        <StaggerContainer className="space-y-3">
          {notifications.map((n, i) => {
            const config = typeConfig[n.type];
            return (
              <StaggerItem key={i}>
                <div className={`card-elevated rounded-xl p-4 flex gap-4 transition-all ${!n.read ? "border-l-2 border-l-accent" : "opacity-70"}`}>
                  <div className={`w-10 h-10 rounded-lg ${config.bg} flex items-center justify-center shrink-0`}>
                    <config.icon className={`w-5 h-5 ${config.text}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-medium text-sm">{n.title}</div>
                      {!n.read && <div className="w-2 h-2 rounded-full bg-accent shrink-0 mt-1.5" />}
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">{n.message}</p>
                    <span className="text-xs text-muted-foreground mt-2 flex items-center gap-1 mono">
                      <Clock className="w-3 h-3" />{n.time}
                    </span>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </DashboardLayout>
  );
};

export default Notifications;
