import { DashboardLayout } from "@/components/DashboardSidebar";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { PageLoader, SkeletonBox, SkeletonLine } from "@/components/PageLoader";
import { Users, FolderUp, ClipboardCheck, Trophy, TrendingUp, Clock } from "lucide-react";

const statCards = [
  { label: "Total Registrations", value: "1,847", change: "+12%", icon: Users, color: "text-info" },
  { label: "Teams Formed", value: "462", change: "+8%", icon: Users, color: "text-success" },
  { label: "Submissions", value: "389", change: "+23%", icon: FolderUp, color: "text-accent" },
  { label: "Evaluated", value: "214", change: "+5%", icon: ClipboardCheck, color: "text-warning" },
];

const recentSubmissions = [
  { team: "CodeCrafters", college: "ITER Bhubaneswar", track: "Healthcare", status: "Under Review", time: "2h ago" },
  { team: "ByteForce", college: "CET Bhubaneswar", track: "EdTech", status: "Evaluated", time: "4h ago" },
  { team: "InnoMinds", college: "NIT Rourkela", track: "FinTech", status: "Submitted", time: "6h ago" },
  { team: "TechTitans", college: "KIIT University", track: "Smart Infra", status: "Under Review", time: "8h ago" },
  { team: "DataDrivers", college: "SOA University", track: "Open Innovation", status: "Evaluated", time: "12h ago" },
];

const statusColors: Record<string, string> = {
  "Under Review": "bg-warning/10 text-warning",
  "Evaluated": "bg-success/10 text-success",
  "Submitted": "bg-info/10 text-info",
};

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
        <div className="p-5 border-b border-border">
          <SkeletonBox className="h-5 w-40" />
        </div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center justify-between p-4 border-b border-border last:border-0">
            <div className="flex-1">
              <SkeletonBox className="h-4 w-28 mb-2" />
              <SkeletonLine width="60%" />
            </div>
            <SkeletonBox className="h-6 w-20 rounded-full" />
          </div>
        ))}
      </div>
      <div className="card-elevated rounded-xl">
        <div className="p-5 border-b border-border">
          <SkeletonBox className="h-5 w-28" />
        </div>
        <div className="p-4 space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <SkeletonBox className="w-6 h-6 rounded-full" />
              <div className="flex-1">
                <SkeletonBox className="h-4 w-32 mb-1" />
                <SkeletonLine width="50%" />
              </div>
              <SkeletonBox className="h-4 w-8" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <DashboardLayout>
      <PageLoader skeleton={<DashboardSkeleton />}>
        <div className="max-w-6xl">
          <ScrollReveal>
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground text-sm mt-1">Utkal Hackathon v2.0 — Overview</p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statCards.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="card-elevated rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    <span className="flex items-center gap-1 text-xs text-success font-medium mono">
                      <TrendingUp className="w-3 h-3" />
                      {stat.change}
                    </span>
                  </div>
                  <div className="text-2xl font-bold tab-nums">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="grid lg:grid-cols-3 gap-6">
            <ScrollReveal className="lg:col-span-2">
              <div className="card-elevated rounded-xl">
                <div className="p-5 border-b border-border">
                  <h2 className="font-semibold">Recent Submissions</h2>
                </div>
                <div className="divide-y divide-border">
                  {recentSubmissions.map((sub) => (
                    <div key={sub.team} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm">{sub.team}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{sub.college} · {sub.track}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[sub.status]}`}>
                          {sub.status}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1 mono">
                          <Clock className="w-3 h-3" />{sub.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="card-elevated rounded-xl">
                <div className="p-5 border-b border-border">
                  <h2 className="font-semibold flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-accent" /> Top Colleges
                  </h2>
                </div>
                <div className="p-4 space-y-3">
                  {[
                    { name: "KIIT University", teams: 48, score: 92 },
                    { name: "NIT Rourkela", teams: 35, score: 88 },
                    { name: "ITER Bhubaneswar", teams: 42, score: 85 },
                    { name: "CET Bhubaneswar", teams: 28, score: 81 },
                    { name: "SOA University", teams: 31, score: 78 },
                  ].map((college, i) => (
                    <div key={college.name} className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${i < 3 ? "accent-gradient text-accent-foreground" : "bg-muted text-muted-foreground"}`}>
                        {i + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{college.name}</div>
                        <div className="text-xs text-muted-foreground">{college.teams} teams</div>
                      </div>
                      <div className="text-sm font-semibold tab-nums">{college.score}</div>
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
