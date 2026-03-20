import { DashboardLayout } from "@/components/DashboardSidebar";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import {
  Users, FolderUp, ClipboardCheck, Settings, Download,
  TrendingUp, BarChart3, Shield, Building2
} from "lucide-react";

const adminStats = [
  { label: "Total Users", value: "1,847", icon: Users, color: "text-info" },
  { label: "Active Teams", value: "462", icon: Users, color: "text-success" },
  { label: "Submissions", value: "389", icon: FolderUp, color: "text-accent" },
  { label: "Stage 1 Complete", value: "214", icon: ClipboardCheck, color: "text-warning" },
  { label: "Stage 2 Complete", value: "98", icon: BarChart3, color: "text-info" },
  { label: "Selected Teams", value: "72", icon: TrendingUp, color: "text-success" },
];

const colleges = [
  { name: "KIIT University", users: 312, teams: 48, submissions: 45, completion: 94 },
  { name: "NIT Rourkela", users: 228, teams: 35, submissions: 34, completion: 97 },
  { name: "ITER Bhubaneswar", users: 274, teams: 42, submissions: 38, completion: 90 },
  { name: "CET Bhubaneswar", users: 182, teams: 28, submissions: 26, completion: 93 },
  { name: "SOA University", users: 196, teams: 31, submissions: 28, completion: 90 },
];

const Admin = () => {
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
                <Shield className="w-7 h-7 text-accent" /> Admin Panel
              </h1>
              <p className="text-muted-foreground text-sm mt-1">System overview and management</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" /> Export Data
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Settings className="w-4 h-4" /> Settings
              </Button>
            </div>
          </div>
        </ScrollReveal>

        {/* Stats */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {adminStats.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="card-elevated rounded-xl p-4 text-center">
                <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-2`} />
                <div className="text-xl font-bold tab-nums">{stat.value}</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* College-level overview */}
        <ScrollReveal>
          <div className="card-elevated rounded-xl">
            <div className="p-5 border-b border-border flex items-center justify-between">
              <h2 className="font-semibold flex items-center gap-2">
                <Building2 className="w-4 h-4 text-accent" /> College Overview
              </h2>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider p-4">College</th>
                    <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider p-4">Users</th>
                    <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider p-4">Teams</th>
                    <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider p-4">Submissions</th>
                    <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider p-4">Completion</th>
                  </tr>
                </thead>
                <tbody>
                  {colleges.map((c) => (
                    <tr key={c.name} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-medium text-sm">{c.name}</td>
                      <td className="p-4 text-center text-sm tab-nums">{c.users}</td>
                      <td className="p-4 text-center text-sm tab-nums">{c.teams}</td>
                      <td className="p-4 text-center text-sm tab-nums">{c.submissions}</td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-success rounded-full" style={{ width: `${c.completion}%` }} />
                          </div>
                          <span className="text-xs text-muted-foreground tab-nums">{c.completion}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </DashboardLayout>
  );
};

export default Admin;
