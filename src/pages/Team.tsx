import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardSidebar";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { PageLoader, SkeletonBox, SkeletonLine } from "@/components/PageLoader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Users, Plus, Copy, Check, Crown, LogOut, UserPlus,
  ArrowRightLeft, Trash2, Shield, UserMinus
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  isLeader: boolean;
  photo?: string;
  verified: boolean;
}

const mockTeam = {
  name: "CodeCrafters",
  inviteCode: "UTKAL-CC-7X3K",
  members: [
    { id: "1", name: "Rahul Kumar", email: "rahul@example.com", isLeader: true, verified: true },
    { id: "2", name: "Priya Sharma", email: "priya@example.com", isLeader: false, verified: true },
    { id: "3", name: "Arjun Patel", email: "arjun@example.com", isLeader: false, verified: true },
  ] as TeamMember[],
};

const TeamSkeleton = () => (
  <div className="max-w-3xl mx-auto">
    <SkeletonBox className="h-8 w-40 mb-2" />
    <SkeletonLine width="200px" className="mb-8" />
    <div className="card-elevated rounded-xl p-6 mb-6">
      <SkeletonBox className="h-6 w-36 mb-4" />
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
            <SkeletonBox className="w-10 h-10 rounded-full" />
            <div className="flex-1">
              <SkeletonBox className="h-4 w-28 mb-1" />
              <SkeletonLine width="60%" />
            </div>
            <SkeletonBox className="h-6 w-16 rounded-full" />
          </div>
        ))}
      </div>
    </div>
    <div className="card-elevated rounded-xl p-6">
      <SkeletonBox className="h-6 w-36 mb-4" />
      <SkeletonBox className="h-10 w-full rounded-lg mb-4" />
      <SkeletonBox className="h-10 w-full rounded-lg" />
    </div>
  </div>
);

const Team = () => {
  const [hasTeam, setHasTeam] = useState(true);
  const [copied, setCopied] = useState(false);
  const [joinCode, setJoinCode] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [teamName, setTeamName] = useState("");

  const handleCopy = () => {
    navigator.clipboard.writeText(mockTeam.inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCreateTeam = () => {
    if (teamName.trim()) {
      setHasTeam(true);
      setShowCreateForm(false);
    }
  };

  const handleJoinTeam = () => {
    if (joinCode.trim()) setHasTeam(true);
  };

  return (
    <DashboardLayout>
      <PageLoader skeleton={<TeamSkeleton />}>
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
                <Users className="w-7 h-7 text-accent" /> Team Management
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                {hasTeam ? "Manage your team and invite members" : "Create or join a team to participate"}
              </p>
            </div>
          </ScrollReveal>

          {hasTeam ? (
            <>
              {/* Team Info */}
              <ScrollReveal>
                <div className="card-elevated rounded-xl p-6 mb-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-lg font-bold">{mockTeam.name}</h2>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {mockTeam.members.length}/4 members · Min 3 required
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted text-sm mono">
                        <span className="text-muted-foreground">{mockTeam.inviteCode}</span>
                        <button onClick={handleCopy} className="text-accent hover:text-accent/80">
                          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Members */}
                  <div className="space-y-3">
                    {mockTeam.members.map((member) => (
                      <div key={member.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-sm">
                          {member.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{member.name}</span>
                            {member.isLeader && (
                              <span className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full bg-accent/10 text-accent font-medium">
                                <Crown className="w-3 h-3" /> Leader
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">{member.email}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          {!member.isLeader && (
                            <>
                              <button className="p-1.5 rounded-md hover:bg-muted transition-colors" title="Transfer leadership">
                                <ArrowRightLeft className="w-3.5 h-3.5 text-muted-foreground" />
                              </button>
                              <button className="p-1.5 rounded-md hover:bg-destructive/10 transition-colors" title="Remove member">
                                <UserMinus className="w-3.5 h-3.5 text-muted-foreground hover:text-destructive" />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}

                    {mockTeam.members.length < 4 && (
                      <div className="flex items-center justify-center gap-2 p-3 rounded-lg border-2 border-dashed border-border text-sm text-muted-foreground">
                        <UserPlus className="w-4 h-4" />
                        Share invite code to add members ({4 - mockTeam.members.length} spot{4 - mockTeam.members.length > 1 ? "s" : ""} left)
                      </div>
                    )}
                  </div>
                </div>
              </ScrollReveal>

              {/* Actions */}
              <ScrollReveal delay={0.1}>
                <div className="card-elevated rounded-xl p-6">
                  <h3 className="font-semibold mb-4">Team Actions</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="gap-2 text-sm">
                      <ArrowRightLeft className="w-4 h-4" /> Transfer Leadership
                    </Button>
                    <Button variant="outline" className="gap-2 text-sm text-destructive hover:text-destructive">
                      <LogOut className="w-4 h-4" /> Leave Team
                    </Button>
                  </div>
                </div>
              </ScrollReveal>
            </>
          ) : (
            <StaggerContainer className="space-y-6">
              {/* Create Team */}
              <StaggerItem>
                <div className="card-elevated rounded-xl p-6">
                  <h2 className="font-semibold mb-1 flex items-center gap-2">
                    <Plus className="w-5 h-5 text-accent" /> Create a Team
                  </h2>
                  <p className="text-xs text-muted-foreground mb-4">You'll become the team leader</p>
                  {showCreateForm ? (
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label>Team Name</Label>
                        <Input
                          placeholder="e.g., CodeCrafters"
                          value={teamName}
                          onChange={(e) => setTeamName(e.target.value)}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button variant="hero" className="flex-1" onClick={handleCreateTeam}>Create Team</Button>
                        <Button variant="outline" onClick={() => setShowCreateForm(false)}>Cancel</Button>
                      </div>
                    </div>
                  ) : (
                    <Button variant="hero" className="w-full gap-2" onClick={() => setShowCreateForm(true)}>
                      <Plus className="w-4 h-4" /> Create New Team
                    </Button>
                  )}
                </div>
              </StaggerItem>

              {/* Join Team */}
              <StaggerItem>
                <div className="card-elevated rounded-xl p-6">
                  <h2 className="font-semibold mb-1 flex items-center gap-2">
                    <UserPlus className="w-5 h-5 text-info" /> Join a Team
                  </h2>
                  <p className="text-xs text-muted-foreground mb-4">Enter the invite code from your team leader</p>
                  <div className="flex gap-2">
                    <Input
                      placeholder="e.g., UTKAL-XX-XXXX"
                      value={joinCode}
                      onChange={(e) => setJoinCode(e.target.value)}
                      className="mono"
                    />
                    <Button variant="outline" onClick={handleJoinTeam} disabled={!joinCode.trim()}>
                      Join
                    </Button>
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          )}
        </div>
      </PageLoader>
    </DashboardLayout>
  );
};

export default Team;
