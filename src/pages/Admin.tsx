import { DashboardLayout } from "@/components/DashboardSidebar";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { PageLoader, SkeletonBox, SkeletonLine } from "@/components/PageLoader";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Users, FolderUp, ClipboardCheck, Settings, Download, RefreshCw,
  TrendingUp, BarChart3, Shield, Building2, Clock, Megaphone,
  FileText, CheckCircle, AlertCircle, UserCheck, GraduationCap
} from "lucide-react";

const adminTabs = [
  "Overview", "Hackathon", "Problem Statements", "Evaluation",
  "Verification", "Users", "Teams", "Colleges", "Announcements", "Audit Logs"
];

const adminStats = [
  { label: "Total Students", value: "1,847", icon: Users, color: "text-info", bgColor: "bg-info/10" },
  { label: "Total Teams", value: "462", icon: Users, color: "text-success", bgColor: "bg-success/10" },
  { label: "Submitted", value: "389", icon: FolderUp, color: "text-accent", bgColor: "bg-accent/10" },
  { label: "Shortlisted", value: "214", icon: TrendingUp, color: "text-warning", bgColor: "bg-warning/10" },
  { label: "Selected", value: "98", icon: CheckCircle, color: "text-success", bgColor: "bg-success/10" },
  { label: "Waitlisted", value: "24", icon: Clock, color: "text-info", bgColor: "bg-info/10" },
];

const colleges = [
  { name: "KIIT University", users: 312, teams: 48, submissions: 45, completion: 94 },
  { name: "NIT Rourkela", users: 228, teams: 35, submissions: 34, completion: 97 },
  { name: "ITER Bhubaneswar", users: 274, teams: 42, submissions: 38, completion: 90 },
  { name: "CET Bhubaneswar", users: 182, teams: 28, submissions: 26, completion: 93 },
  { name: "SOA University", users: 196, teams: 31, submissions: 28, completion: 90 },
];

const announcements = [
  { title: "Stage 1 Results Announced", time: "2h ago", type: "success" },
  { title: "Submission Deadline Extended", time: "1d ago", type: "warning" },
  { title: "New Problem Statement Added", time: "2d ago", type: "info" },
  { title: "Evaluation Started for Track 3", time: "3d ago", type: "info" },
];

const auditLogs = [
  { action: "Updated hackathon settings", user: "Admin", time: "10 min ago" },
  { action: "Published Stage 1 results", user: "Admin", time: "2h ago" },
  { action: "Added new evaluator", user: "Admin", time: "5h ago" },
  { action: "Exported participant data", user: "College Admin", time: "8h ago" },
  { action: "Modified scoring rubric", user: "Admin", time: "1d ago" },
];

const problemStatements = [
  { id: "PS-01", title: "Healthcare Innovation", teams: 78, submissions: 65, status: "Active" },
  { id: "PS-02", title: "EdTech Revolution", teams: 64, submissions: 52, status: "Active" },
  { id: "PS-03", title: "Sustainable Future", teams: 55, submissions: 48, status: "Active" },
  { id: "PS-04", title: "Smart Infrastructure", teams: 71, submissions: 60, status: "Active" },
  { id: "PS-05", title: "FinTech Solutions", teams: 48, submissions: 39, status: "Active" },
  { id: "PS-06", title: "Open Innovation", teams: 42, submissions: 35, status: "Active" },
];

const AdminSkeleton = () => (
  <div className="max-w-6xl mx-auto">
    <div className="flex items-center justify-between mb-6">
      <div>
        <SkeletonBox className="h-8 w-52 mb-2" />
        <SkeletonLine width="240px" />
      </div>
      <SkeletonBox className="h-9 w-24 rounded-md" />
    </div>
    <SkeletonBox className="h-10 w-full mb-6 rounded-lg" />
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3 mb-6">
      {[1, 2, 3, 4, 5, 6, 7].map((i) => (
        <div key={i} className="card-elevated rounded-xl p-4">
          <SkeletonBox className="w-5 h-5 mb-3 rounded" />
          <SkeletonBox className="h-7 w-10 mb-1" />
          <SkeletonBox className="h-3 w-16" />
        </div>
      ))}
    </div>
    <div className="grid lg:grid-cols-3 gap-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="card-elevated rounded-xl p-5">
          <SkeletonBox className="h-5 w-36 mb-4" />
          <SkeletonBox className="h-3 w-full mb-2" />
          <SkeletonBox className="h-2 w-full rounded-full" />
        </div>
      ))}
    </div>
  </div>
);

const OverviewTab = () => (
  <>
    <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3 mb-6">
      {adminStats.map((stat) => (
        <StaggerItem key={stat.label}>
          <div className="card-elevated rounded-xl p-4">
            <stat.icon className={`w-5 h-5 ${stat.color} mb-3`} />
            <div className="text-2xl font-bold tab-nums">{stat.value}</div>
            <div className="text-[11px] text-muted-foreground mt-1">{stat.label}</div>
          </div>
        </StaggerItem>
      ))}
      <StaggerItem>
        <div className="card-elevated rounded-xl p-4 border-accent/30">
          <div className="text-[11px] text-muted-foreground mb-1">Available Spots</div>
          <div className="text-3xl font-bold text-accent tab-nums">100</div>
          <div className="text-[11px] text-muted-foreground">of 25 squads</div>
        </div>
      </StaggerItem>
    </StaggerContainer>

    <div className="grid lg:grid-cols-3 gap-4 mb-6">
      <ScrollReveal>
        <div className="card-elevated rounded-xl p-5">
          <h3 className="font-semibold text-sm mb-4">Reviewer Progress</h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Completion</span>
            <span className="text-xs font-semibold tab-nums">67%</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-info rounded-full transition-all duration-700" style={{ width: "67%" }} />
          </div>
          <div className="mt-3 text-xs text-muted-foreground">12 of 18 reviewers active</div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="card-elevated rounded-xl p-5">
          <h3 className="font-semibold text-sm mb-4">Evaluator Progress</h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Completion</span>
            <span className="text-xs font-semibold tab-nums">42%</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-accent rounded-full transition-all duration-700" style={{ width: "42%" }} />
          </div>
          <div className="mt-3 text-xs text-muted-foreground">8 of 15 evaluators active</div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="card-elevated rounded-xl p-5">
          <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-accent" /> Colleges
          </h3>
          <div className="text-3xl font-bold tab-nums">12</div>
          <div className="text-xs text-muted-foreground mt-1">Participating colleges</div>
          <div className="mt-3 flex gap-1">
            {[85, 92, 78, 95, 88].map((v, i) => (
              <div key={i} className="flex-1 h-8 bg-muted rounded-sm overflow-hidden flex flex-col-reverse">
                <div className="bg-accent/60 rounded-sm" style={{ height: `${v}%` }} />
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>

    {/* College Table */}
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
  </>
);

const ProblemStatementsTab = () => (
  <ScrollReveal>
    <div className="card-elevated rounded-xl">
      <div className="p-5 border-b border-border flex items-center justify-between">
        <h2 className="font-semibold flex items-center gap-2">
          <FileText className="w-4 h-4 text-accent" /> Problem Statements
        </h2>
        <Button variant="outline" size="sm">Add New</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/50 border-b border-border">
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider p-4">ID</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider p-4">Title</th>
              <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider p-4">Teams</th>
              <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider p-4">Submissions</th>
              <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {problemStatements.map((ps) => (
              <tr key={ps.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                <td className="p-4 text-sm mono text-muted-foreground">{ps.id}</td>
                <td className="p-4 font-medium text-sm">{ps.title}</td>
                <td className="p-4 text-center text-sm tab-nums">{ps.teams}</td>
                <td className="p-4 text-center text-sm tab-nums">{ps.submissions}</td>
                <td className="p-4 text-center">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-success/10 text-success font-medium">{ps.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </ScrollReveal>
);

const AnnouncementsTab = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <h2 className="font-semibold">Announcements</h2>
      <Button variant="outline" size="sm" className="gap-2">
        <Megaphone className="w-4 h-4" /> New Announcement
      </Button>
    </div>
    <StaggerContainer className="space-y-3">
      {announcements.map((a, i) => (
        <StaggerItem key={i}>
          <div className="card-elevated rounded-xl p-4 flex items-center gap-4">
            <div className={`w-2 h-2 rounded-full shrink-0 ${
              a.type === "success" ? "bg-success" : a.type === "warning" ? "bg-warning" : "bg-info"
            }`} />
            <div className="flex-1">
              <div className="font-medium text-sm">{a.title}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{a.time}</div>
            </div>
            <Button variant="ghost" size="sm">Edit</Button>
          </div>
        </StaggerItem>
      ))}
    </StaggerContainer>
  </div>
);

const AuditLogsTab = () => (
  <ScrollReveal>
    <div className="card-elevated rounded-xl">
      <div className="p-5 border-b border-border">
        <h2 className="font-semibold">Audit Logs</h2>
      </div>
      <div className="divide-y divide-border">
        {auditLogs.map((log, i) => (
          <div key={i} className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
            <div>
              <div className="text-sm font-medium">{log.action}</div>
              <div className="text-xs text-muted-foreground mt-0.5">by {log.user}</div>
            </div>
            <span className="text-xs text-muted-foreground mono flex items-center gap-1">
              <Clock className="w-3 h-3" /> {log.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  </ScrollReveal>
);

const UsersTab = () => (
  <ScrollReveal>
    <div className="card-elevated rounded-xl">
      <div className="p-5 border-b border-border flex items-center justify-between">
        <h2 className="font-semibold flex items-center gap-2">
          <Users className="w-4 h-4 text-accent" /> All Users
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" /> Export
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/50 border-b border-border">
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider p-4">Name</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider p-4">Email</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider p-4">College</th>
              <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider p-4">Role</th>
              <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: "Rahul Sharma", email: "rahul@kiit.ac.in", college: "KIIT University", role: "User", status: "Active" },
              { name: "Priya Das", email: "priya@nit.ac.in", college: "NIT Rourkela", role: "Team Lead", status: "Active" },
              { name: "Amit Patel", email: "amit@iter.ac.in", college: "ITER Bhubaneswar", role: "User", status: "Pending" },
              { name: "Sneha Mishra", email: "sneha@cet.ac.in", college: "CET Bhubaneswar", role: "User", status: "Active" },
              { name: "Vikash Kumar", email: "vikash@soa.ac.in", college: "SOA University", role: "Team Lead", status: "Active" },
            ].map((u) => (
              <tr key={u.email} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                <td className="p-4 font-medium text-sm">{u.name}</td>
                <td className="p-4 text-sm text-muted-foreground">{u.email}</td>
                <td className="p-4 text-sm">{u.college}</td>
                <td className="p-4 text-center">
                  <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground font-medium">{u.role}</span>
                </td>
                <td className="p-4 text-center">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    u.status === "Active" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                  }`}>{u.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </ScrollReveal>
);

const TeamsTab = () => (
  <ScrollReveal>
    <div className="card-elevated rounded-xl">
      <div className="p-5 border-b border-border flex items-center justify-between">
        <h2 className="font-semibold flex items-center gap-2">
          <Users className="w-4 h-4 text-accent" /> Teams
        </h2>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="w-4 h-4" /> Export
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/50 border-b border-border">
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider p-4">Team Name</th>
              <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider p-4">Members</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider p-4">Track</th>
              <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider p-4">Stage 1</th>
              <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider p-4">Stage 2</th>
              <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: "CodeCrafters", members: 4, track: "Healthcare", s1: 82, s2: 78, status: "Selected" },
              { name: "ByteForce", members: 3, track: "EdTech", s1: 79, s2: 85, status: "Selected" },
              { name: "InnoMinds", members: 4, track: "FinTech", s1: 75, s2: null, status: "Stage 2" },
              { name: "TechTitans", members: 4, track: "Smart Infra", s1: 71, s2: null, status: "Stage 2" },
              { name: "DataDrivers", members: 3, track: "Open Innovation", s1: 68, s2: null, status: "Stage 1" },
            ].map((t) => (
              <tr key={t.name} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                <td className="p-4 font-medium text-sm">{t.name}</td>
                <td className="p-4 text-center text-sm tab-nums">{t.members}</td>
                <td className="p-4 text-sm">{t.track}</td>
                <td className="p-4 text-center text-sm tab-nums font-medium">{t.s1}</td>
                <td className="p-4 text-center text-sm tab-nums font-medium">{t.s2 ?? "—"}</td>
                <td className="p-4 text-center">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    t.status === "Selected" ? "bg-success/10 text-success" 
                    : t.status === "Stage 2" ? "bg-info/10 text-info" 
                    : "bg-warning/10 text-warning"
                  }`}>{t.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </ScrollReveal>
);

const PlaceholderTab = ({ title }: { title: string }) => (
  <ScrollReveal>
    <div className="card-elevated rounded-xl p-8 text-center">
      <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mx-auto mb-4">
        <Settings className="w-6 h-6 text-muted-foreground" />
      </div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm max-w-md mx-auto">
        This section allows you to manage {title.toLowerCase()} settings and configurations for the hackathon platform.
      </p>
    </div>
  </ScrollReveal>
);

const Admin = () => {
  const [activeTab, setActiveTab] = useState("Overview");

  const renderTab = () => {
    switch (activeTab) {
      case "Overview": return <OverviewTab />;
      case "Problem Statements": return <ProblemStatementsTab />;
      case "Announcements": return <AnnouncementsTab />;
      case "Audit Logs": return <AuditLogsTab />;
      case "Users": return <UsersTab />;
      case "Teams": return <TeamsTab />;
      default: return <PlaceholderTab title={activeTab} />;
    }
  };

  return (
    <DashboardLayout>
      <PageLoader skeleton={<AdminSkeleton />}>
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-success/10 text-success font-medium">Online</span>
                </div>
                <p className="text-muted-foreground text-sm">
                  Managing: Utkal University State-Level Hackathon 2026
                </p>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <RefreshCw className="w-4 h-4" /> Refresh
              </Button>
            </div>
          </ScrollReveal>

          {/* Tabs */}
          <ScrollReveal>
            <div className="mb-6 overflow-x-auto">
              <div className="flex items-center gap-1 p-1 bg-muted/50 rounded-lg w-fit min-w-full md:min-w-0">
                {adminTabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-2 rounded-md text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                      activeTab === tab
                        ? "bg-card text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {renderTab()}
        </div>
      </PageLoader>
    </DashboardLayout>
  );
};

export default Admin;
