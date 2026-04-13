import { DashboardLayout } from "@/components/DashboardSidebar";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { PageLoader, SkeletonBox, SkeletonLine } from "@/components/PageLoader";
import { useHackathon, PHASE_LABELS } from "@/contexts/HackathonContext";
import { Users, FolderUp, CheckCircle2, Trophy, TrendingUp, Clock, Bell, Megaphone, Shield } from "lucide-react";

const statCards = [
  { label: "Team Members", value: "3", icon: Users, color: "text-info" },
  { label: "Submission", value: "Pending", icon: FolderUp, color: "text-warning" },
  { label: "Profile", value: "Verified", icon: CheckCircle2, color: "text-success" },
  { label: "Selection", value: "Awaiting", icon: Trophy, color: "text-accent" },
];

const recentActivity = [
  { action: "Team 'CodeCrafters' created", time: "2 days ago", type: "info" },
  { action: "Profile verified successfully", time: "2 days ago", type: "success" },
  { action: "Joined the platform", time: "3 days ago", type: "info" },
];

const mockAnnouncements = [
  { title: "Registration Open!", content: "Registration for Utkal Hackathon 2024 is now open. Form your teams!", date: "Mar 1" },
  { title: "Problem Statements Released", content: "All 6 domains are now available. Start building!", date: "Mar 15" },
];

const DashboardSkeleton = () => (
  <div className="max-w-6xl">
    <div className="mb-8">
      <SkeletonBox className="h-8 w-48 mb-2" />
      <SkeletonLine width="220px" />
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="card-elevated rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <SkeletonBox className="h-5 w-5 rounded" />
            <SkeletonBox className="h-4 w-10 rounded" />
          </div>
          <SkeletonBox className="h-7 w-20 mb-2" />
          <SkeletonLine width="80%" />
        </div>
      ))}
    </div>
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 card-elevated rounded-xl">
        <div className="p-5 border-b border-border"><SkeletonBox className="h-5 w-40" /></div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center justify-between p-4 border-b border-border last:border-0">
            <SkeletonBox className="h-4 w-48" />
            <SkeletonBox className="h-4 w-16" />
          </div>
        ))}
      </div>
      <div className="card-elevated rounded-xl">
        <div className="p-5 border-b border-border"><SkeletonBox className="h-5 w-32" /></div>
        <div className="p-4 space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="p-3 rounded-lg bg-muted/30">
              <SkeletonBox className="h-4 w-36 mb-1" />
              <SkeletonLine width="90%" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const { phase } = useHackathon();

  return (
    <DashboardLayout>
      <PageLoader skeleton={<DashboardSkeleton />}>
        <div className="max-w-6xl">
          <ScrollReveal>
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground text-sm mt-1">
                Utkal Hackathon 2024 — <span className="text-accent font-medium">{PHASE_LABELS[phase]}</span>
              </p>
            </div>
          </ScrollReveal>

          {/* Phase Banner */}
          <ScrollReveal>
            <div className="card-elevated rounded-xl p-4 mb-6 flex items-center gap-3 bg-accent/5 border-accent/20">
              <Shield className="w-5 h-5 text-accent" />
              <div className="flex-1">
                <div className="text-sm font-medium">Current Phase: {PHASE_LABELS[phase]}</div>
                <div className="text-xs text-muted-foreground">Complete your profile and form a team to participate</div>
              </div>
            </div>
          </ScrollReveal>

          {/* Stats */}
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statCards.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="card-elevated rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div className="text-2xl font-bold tab-nums">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Activity */}
            <ScrollReveal className="lg:col-span-2">
              <div className="card-elevated rounded-xl">
                <div className="p-5 border-b border-border">
                  <h2 className="font-semibold flex items-center gap-2">
                    <Clock className="w-4 h-4 text-accent" /> Recent Activity
                  </h2>
                </div>
                <div className="divide-y divide-border">
                  {recentActivity.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${item.type === "success" ? "bg-success" : "bg-info"}`} />
                        <span className="text-sm">{item.action}</span>
                      </div>
                      <span className="text-xs text-muted-foreground mono">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Announcements */}
            <ScrollReveal delay={0.1}>
              <div className="card-elevated rounded-xl">
                <div className="p-5 border-b border-border">
                  <h2 className="font-semibold flex items-center gap-2">
                    <Megaphone className="w-4 h-4 text-accent" /> Announcements
                  </h2>
                </div>
                <div className="p-4 space-y-3">
                  {mockAnnouncements.map((a, i) => (
                    <div key={i} className="p-3 rounded-lg bg-muted/30">
                      <div className="text-sm font-medium">{a.title}</div>
                      <p className="text-xs text-muted-foreground mt-1">{a.content}</p>
                      <span className="text-[10px] text-muted-foreground mono mt-1 block">{a.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </PageLoader>
    </DashboardLayout>
  );
};

export default Dashboard;
