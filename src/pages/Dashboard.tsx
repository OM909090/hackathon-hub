import { DashboardLayout } from "@/components/DashboardSidebar";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
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

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="max-w-6xl">
        <ScrollReveal>
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-1">Utkal Hackathon v2.0 — Overview</p>
          </div>
        </ScrollReveal>

        {/* Stats */}
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
          {/* Recent Submissions */}
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

          {/* Leaderboard */}
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
    </DashboardLayout>
  );
};

export default Dashboard;
