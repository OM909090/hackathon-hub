import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardSidebar";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { PageLoader, SkeletonBox, SkeletonLine } from "@/components/PageLoader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Shield, Settings, Layers, FileText, Users, CheckCircle2,
  Megaphone, UserCog, Play, Pause, ChevronRight, Crown,
  Trash2, Eye, Check, X, Clock, Target, AlertCircle,
  ArrowRight, Send, Edit, Plus, ToggleLeft, ToggleRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PHASE_LABELS, PHASE_ORDER, type HackathonPhase } from "@/contexts/HackathonContext";

const adminTabs = [
  { id: "phases", label: "Phase Control", icon: Layers },
  { id: "problems", label: "Problem Statements", icon: FileText },
  { id: "teams", label: "Teams", icon: Users },
  { id: "selection", label: "Selection", icon: CheckCircle2 },
  { id: "announcements", label: "Announcements", icon: Megaphone },
  { id: "users", label: "Users", icon: UserCog },
];

// Mock data
const mockTeams = [
  { id: "1", name: "CodeCrafters", domain: "Healthcare", members: [
    { name: "Rahul Kumar", email: "rahul@ex.com", verified: true },
    { name: "Priya Sharma", email: "priya@ex.com", verified: true },
    { name: "Arjun Patel", email: "arjun@ex.com", verified: true },
  ], submitted: true, status: "pending" as const },
  { id: "2", name: "ByteForce", domain: "EdTech", members: [
    { name: "Sneha Das", email: "sneha@ex.com", verified: true },
    { name: "Vikram Singh", email: "vikram@ex.com", verified: true },
    { name: "Anita Roy", email: "anita@ex.com", verified: true },
    { name: "Deepak Nair", email: "deepak@ex.com", verified: true },
  ], submitted: true, status: "pending" as const },
  { id: "3", name: "InnoMinds", domain: "FinTech", members: [
    { name: "Kiran Mehra", email: "kiran@ex.com", verified: true },
    { name: "Pooja Jena", email: "pooja@ex.com", verified: true },
    { name: "Suresh Panda", email: "suresh@ex.com", verified: true },
  ], submitted: true, status: "pending" as const },
  { id: "4", name: "TechTitans", domain: "Healthcare", members: [
    { name: "Amir Khan", email: "amir@ex.com", verified: true },
    { name: "Fatima Ali", email: "fatima@ex.com", verified: true },
    { name: "Raj Patel", email: "raj@ex.com", verified: true },
  ], submitted: false, status: "pending" as const },
];

const mockUsers = [
  { id: "1", name: "Rahul Kumar", email: "rahul@ex.com", verified: true, team: "CodeCrafters", role: "user" },
  { id: "2", name: "Priya Sharma", email: "priya@ex.com", verified: true, team: "CodeCrafters", role: "user" },
  { id: "3", name: "Admin User", email: "admin@utkal.edu", verified: true, team: null, role: "admin" },
  { id: "4", name: "Sneha Das", email: "sneha@ex.com", verified: true, team: "ByteForce", role: "user" },
  { id: "5", name: "Unverified User", email: "new@ex.com", verified: false, team: null, role: "user" },
];

const mockAnnouncements = [
  { id: "1", title: "Registration Open!", content: "Registration for Utkal Hackathon 2024 is now open.", date: "2024-03-01", active: true },
  { id: "2", title: "Problem Statements Released", content: "All 6 domains are now available. Start building!", date: "2024-03-15", active: true },
];

const AdminSkeleton = () => (
  <div className="max-w-6xl mx-auto">
    <SkeletonBox className="h-8 w-44 mb-2" />
    <SkeletonLine width="200px" className="mb-6" />
    <div className="flex gap-2 mb-6 overflow-x-auto">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <SkeletonBox key={i} className="h-9 w-32 rounded-lg shrink-0" />
      ))}
    </div>
    <div className="card-elevated rounded-xl p-6">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-center gap-4 py-4 border-b border-border last:border-0">
          <SkeletonBox className="h-5 w-5 rounded" />
          <SkeletonBox className="h-4 w-40" />
          <div className="flex-1" />
          <SkeletonBox className="h-8 w-20 rounded-md" />
        </div>
      ))}
    </div>
  </div>
);

// === TAB COMPONENTS ===

const PhaseControlTab = () => {
  const [currentPhase, setCurrentPhase] = useState<HackathonPhase>("registration_open");
  const [regOpenDate, setRegOpenDate] = useState("2024-03-01");
  const [regCloseDate, setRegCloseDate] = useState("2024-03-14");
  const [stage1OpenDate, setStage1OpenDate] = useState("2024-03-15");
  const [stage1CloseDate, setStage1CloseDate] = useState("2024-03-28");

  return (
    <div className="space-y-6">
      {/* Current Phase */}
      <div className="card-elevated rounded-xl p-6">
        <h3 className="font-semibold mb-4">Current Phase</h3>
        <div className="flex items-center gap-3 p-4 rounded-xl bg-accent/5 border border-accent/20 mb-6">
          <Play className="w-5 h-5 text-accent" />
          <div>
            <div className="font-semibold text-accent">{PHASE_LABELS[currentPhase]}</div>
            <div className="text-xs text-muted-foreground">Phase is active and visible to all users</div>
          </div>
        </div>

        {/* Phase Timeline */}
        <div className="space-y-2">
          {PHASE_ORDER.map((p, i) => {
            const isActive = p === currentPhase;
            const isPast = PHASE_ORDER.indexOf(p) < PHASE_ORDER.indexOf(currentPhase);
            return (
              <button
                key={p}
                onClick={() => setCurrentPhase(p)}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left",
                  isActive ? "bg-accent/10 border border-accent/30" :
                  isPast ? "bg-success/5 border border-success/20" :
                  "hover:bg-muted/50 border border-transparent"
                )}
              >
                <div className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0",
                  isActive ? "bg-accent text-accent-foreground" :
                  isPast ? "bg-success text-success-foreground" :
                  "bg-muted text-muted-foreground"
                )}>
                  {isPast ? <Check className="w-3.5 h-3.5" /> : i + 1}
                </div>
                <div className="flex-1">
                  <div className={cn("text-sm font-medium", isActive && "text-accent")}>{PHASE_LABELS[p]}</div>
                </div>
                {isActive && <span className="text-[10px] uppercase tracking-wider text-accent font-semibold">Active</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Date Configuration */}
      <div className="card-elevated rounded-xl p-6">
        <h3 className="font-semibold mb-4">Phase Dates</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Registration Open</Label>
            <Input type="date" value={regOpenDate} onChange={(e) => setRegOpenDate(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Registration Close</Label>
            <Input type="date" value={regCloseDate} onChange={(e) => setRegCloseDate(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Stage 1 Open</Label>
            <Input type="date" value={stage1OpenDate} onChange={(e) => setStage1OpenDate(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Stage 1 Close</Label>
            <Input type="date" value={stage1CloseDate} onChange={(e) => setStage1CloseDate(e.target.value)} />
          </div>
        </div>
        <Button variant="hero" className="mt-4">Save Phase Configuration</Button>
      </div>
    </div>
  );
};

const ProblemStatementsTab = () => {
  const domains = [
    { id: "1", title: "Healthcare Innovation", emoji: "🏥", released: true },
    { id: "2", title: "EdTech Revolution", emoji: "📚", released: true },
    { id: "3", title: "Sustainable Future", emoji: "🌱", released: true },
    { id: "4", title: "Smart Infrastructure", emoji: "🏙️", released: false },
    { id: "5", title: "FinTech Solutions", emoji: "💳", released: false },
    { id: "6", title: "Open Innovation", emoji: "🚀", released: false },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Manage Domains & Criteria</h3>
        <Button variant="outline" size="sm" className="gap-2"><Plus className="w-4 h-4" /> Add Domain</Button>
      </div>
      <div className="space-y-3">
        {domains.map((d) => (
          <div key={d.id} className="card-elevated rounded-xl p-4 flex items-center gap-4">
            <span className="text-2xl">{d.emoji}</span>
            <div className="flex-1">
              <div className="font-medium text-sm">{d.title}</div>
              <div className="text-xs text-muted-foreground">4 criteria defined</div>
            </div>
            <div className="flex items-center gap-2">
              <button className={cn("p-1.5 rounded-md transition-colors", d.released ? "text-success" : "text-muted-foreground hover:text-foreground")}>
                {d.released ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
              </button>
              <span className={cn("text-xs font-medium", d.released ? "text-success" : "text-muted-foreground")}>
                {d.released ? "Released" : "Draft"}
              </span>
              <Button variant="ghost" size="sm"><Edit className="w-3.5 h-3.5" /></Button>
            </div>
          </div>
        ))}
      </div>
      <Button variant="hero" className="w-full">Release All Problem Statements</Button>
    </div>
  );
};

const TeamsTab = () => {
  const [expandedTeam, setExpandedTeam] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">All Teams ({mockTeams.length})</h3>
        <Input placeholder="Search teams..." className="w-48" />
      </div>
      {mockTeams.map((team) => (
        <div key={team.id} className="card-elevated rounded-xl overflow-hidden">
          <button
            onClick={() => setExpandedTeam(expandedTeam === team.id ? null : team.id)}
            className="w-full flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors text-left"
          >
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-sm">
              {team.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{team.name}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground">{team.domain}</span>
              </div>
              <div className="text-xs text-muted-foreground">{team.members.length} members · {team.submitted ? "Submitted" : "No submission"}</div>
            </div>
            <ChevronRight className={cn("w-4 h-4 text-muted-foreground transition-transform", expandedTeam === team.id && "rotate-90")} />
          </button>
          {expandedTeam === team.id && (
            <div className="px-4 pb-4 border-t border-border pt-3">
              <div className="space-y-2">
                {team.members.map((m, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
                    <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center text-accent text-xs font-bold">
                      {m.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-medium flex items-center gap-1">
                        {m.name}
                        {i === 0 && <Crown className="w-3 h-3 text-accent" />}
                      </div>
                      <div className="text-[10px] text-muted-foreground">{m.email}</div>
                    </div>
                    {m.verified && <CheckCircle2 className="w-3.5 h-3.5 text-success" />}
                    <button className="p-1 rounded hover:bg-destructive/10"><Trash2 className="w-3 h-3 text-muted-foreground hover:text-destructive" /></button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-3">
                <Button variant="outline" size="sm" className="text-xs gap-1"><Eye className="w-3 h-3" /> View Docs</Button>
                <Button variant="outline" size="sm" className="text-xs gap-1 text-destructive hover:text-destructive"><Trash2 className="w-3 h-3" /> Delete Team</Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const SelectionTab = () => {
  const [teamStatuses, setTeamStatuses] = useState<Record<string, "pending" | "selected" | "rejected">>({
    "1": "pending", "2": "pending", "3": "pending",
  });
  const submittedTeams = mockTeams.filter(t => t.submitted);
  const domainGroups = submittedTeams.reduce((acc, t) => {
    if (!acc[t.domain]) acc[t.domain] = [];
    acc[t.domain].push(t);
    return acc;
  }, {} as Record<string, typeof mockTeams>);

  const handleSelect = (id: string) => setTeamStatuses(prev => ({ ...prev, [id]: "selected" }));
  const handleReject = (id: string) => setTeamStatuses(prev => ({ ...prev, [id]: "rejected" }));

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="card-elevated rounded-xl p-4 text-center">
          <div className="text-2xl font-bold tab-nums">{submittedTeams.length}</div>
          <div className="text-xs text-muted-foreground">Total Submitted</div>
        </div>
        <div className="card-elevated rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-success tab-nums">{Object.values(teamStatuses).filter(s => s === "selected").length}</div>
          <div className="text-xs text-muted-foreground">Selected</div>
        </div>
        <div className="card-elevated rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-destructive tab-nums">{Object.values(teamStatuses).filter(s => s === "rejected").length}</div>
          <div className="text-xs text-muted-foreground">Rejected</div>
        </div>
      </div>

      {/* Domain Groups */}
      {Object.entries(domainGroups).map(([domain, teams]) => (
        <div key={domain}>
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Target className="w-4 h-4 text-accent" /> {domain}
            <span className="text-xs text-muted-foreground font-normal">({teams.length} teams)</span>
          </h4>
          <div className="space-y-2">
            {teams.map((team) => {
              const status = teamStatuses[team.id] || "pending";
              return (
                <div key={team.id} className={cn(
                  "card-elevated rounded-xl p-4 flex items-center gap-4",
                  status === "selected" && "border-success/30",
                  status === "rejected" && "border-destructive/30 opacity-60"
                )}>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{team.name}</div>
                    <div className="text-xs text-muted-foreground">{team.members.length} members</div>
                  </div>
                  {status === "pending" ? (
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="gap-1 text-success hover:text-success text-xs" onClick={() => handleSelect(team.id)}>
                        <Check className="w-3 h-3" /> Select
                      </Button>
                      <Button size="sm" variant="outline" className="gap-1 text-destructive hover:text-destructive text-xs" onClick={() => handleReject(team.id)}>
                        <X className="w-3 h-3" /> Reject
                      </Button>
                    </div>
                  ) : (
                    <span className={cn(
                      "text-xs font-medium px-2 py-1 rounded-full",
                      status === "selected" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                    )}>
                      {status === "selected" ? "Selected ✓" : "Rejected ✗"}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <Button variant="hero" className="w-full gap-2">
        <Send className="w-4 h-4" /> Announce Results & Send Emails
      </Button>
    </div>
  );
};

const AnnouncementsTab = () => {
  const [announcements, setAnnouncements] = useState(mockAnnouncements);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Announcements</h3>
        <Button variant="outline" size="sm" className="gap-2" onClick={() => setShowForm(!showForm)}>
          <Plus className="w-4 h-4" /> New Announcement
        </Button>
      </div>

      {showForm && (
        <div className="card-elevated rounded-xl p-6 space-y-4">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input placeholder="Announcement title" />
          </div>
          <div className="space-y-2">
            <Label>Content</Label>
            <textarea
              rows={3}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
              placeholder="Write your announcement..."
            />
          </div>
          <div className="flex gap-2">
            <Button variant="hero" className="gap-2"><Send className="w-4 h-4" /> Publish</Button>
            <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {announcements.map((a) => (
          <div key={a.id} className="card-elevated rounded-xl p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-medium text-sm flex items-center gap-2">
                  <Megaphone className="w-4 h-4 text-accent" />
                  {a.title}
                </div>
                <p className="text-xs text-muted-foreground mt-1">{a.content}</p>
                <span className="text-[10px] text-muted-foreground mono mt-2 block">{a.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full", a.active ? "bg-success/10 text-success" : "bg-muted text-muted-foreground")}>
                  {a.active ? "Active" : "Inactive"}
                </span>
                <Button variant="ghost" size="sm"><Edit className="w-3 h-3" /></Button>
                <Button variant="ghost" size="sm"><Trash2 className="w-3 h-3 text-destructive" /></Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const UsersTab = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-between mb-2">
      <h3 className="font-semibold">All Users ({mockUsers.length})</h3>
      <Input placeholder="Search users..." className="w-48" />
    </div>
    <div className="card-elevated rounded-xl overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-muted/50 border-b border-border">
            <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider p-4">User</th>
            <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider p-4">Verified</th>
            <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider p-4">Team</th>
            <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider p-4">Role</th>
            <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {mockUsers.map((u) => (
            <tr key={u.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
              <td className="p-4">
                <div className="text-sm font-medium">{u.name}</div>
                <div className="text-xs text-muted-foreground">{u.email}</div>
              </td>
              <td className="p-4 text-center">
                {u.verified ? <CheckCircle2 className="w-4 h-4 text-success mx-auto" /> : <AlertCircle className="w-4 h-4 text-warning mx-auto" />}
              </td>
              <td className="p-4 text-center text-sm">{u.team || "—"}</td>
              <td className="p-4 text-center">
                <span className={cn(
                  "text-xs px-2 py-1 rounded-full font-medium",
                  u.role === "admin" ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"
                )}>
                  {u.role}
                </span>
              </td>
              <td className="p-4 text-center">
                <div className="flex items-center justify-center gap-1">
                  <Button variant="ghost" size="sm"><Eye className="w-3.5 h-3.5" /></Button>
                  {u.role !== "admin" && (
                    <Button variant="ghost" size="sm" title="Promote to Admin"><Crown className="w-3.5 h-3.5 text-accent" /></Button>
                  )}
                  <Button variant="ghost" size="sm"><Trash2 className="w-3.5 h-3.5 text-destructive" /></Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const Admin = () => {
  const [activeTab, setActiveTab] = useState("phases");

  const tabComponents: Record<string, JSX.Element> = {
    phases: <PhaseControlTab />,
    problems: <ProblemStatementsTab />,
    teams: <TeamsTab />,
    selection: <SelectionTab />,
    announcements: <AnnouncementsTab />,
    users: <UsersTab />,
  };

  return (
    <DashboardLayout>
      <PageLoader skeleton={<AdminSkeleton />}>
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
                <Shield className="w-7 h-7 text-accent" /> Admin Panel
              </h1>
              <p className="text-muted-foreground text-sm mt-1">Platform management and control center</p>
            </div>
          </ScrollReveal>

          {/* Tabs */}
          <ScrollReveal>
            <div className="flex gap-1.5 mb-6 overflow-x-auto pb-1 -mx-1 px-1">
              {adminTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap shrink-0",
                    activeTab === tab.id
                      ? "bg-accent text-accent-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                  )}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Tab Content */}
          <ScrollReveal key={activeTab}>
            {tabComponents[activeTab]}
          </ScrollReveal>
        </div>
      </PageLoader>
    </DashboardLayout>
  );
};

export default Admin;
