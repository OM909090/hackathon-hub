import { DashboardLayout } from "@/components/DashboardSidebar";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { PageLoader, SkeletonBox, SkeletonLine } from "@/components/PageLoader";
import { Button } from "@/components/ui/button";
import { Star, ExternalLink, ChevronDown, Filter } from "lucide-react";
import { useState } from "react";

const projects = [
  { team: "CodeCrafters", track: "Healthcare", title: "MedTrack — AI Patient Monitoring", stage1: 87, stage2: 91, combined: 89.6, status: "Selected" },
  { team: "ByteForce", track: "EdTech", title: "LearnFlow — Adaptive Learning Platform", stage1: 82, stage2: 88, combined: 85.9, status: "Selected" },
  { team: "InnoMinds", track: "FinTech", title: "PaySafe — Rural Payment Gateway", stage1: 79, stage2: 85, combined: 82.9, status: "Selected" },
  { team: "TechTitans", track: "Smart Infra", title: "UrbanPulse — City Monitoring", stage1: 75, stage2: 80, combined: 78.3, status: "Waitlisted" },
  { team: "DataDrivers", track: "Sustainability", title: "GreenGrid — Energy Optimization", stage1: 72, stage2: 78, combined: 75.9, status: "Waitlisted" },
  { team: "CloudNine", track: "Open Innovation", title: "VoiceBot — Odia Language AI", stage1: 70, stage2: 74, combined: 72.6, status: "Under Review" },
];

const statusStyles: Record<string, string> = {
  "Selected": "bg-success/10 text-success",
  "Waitlisted": "bg-warning/10 text-warning",
  "Under Review": "bg-info/10 text-info",
};

const EvaluationSkeleton = () => (
  <div className="max-w-5xl mx-auto">
    <div className="flex items-center justify-between mb-8">
      <div>
        <SkeletonBox className="h-8 w-36 mb-2" />
        <SkeletonLine width="240px" />
      </div>
      <SkeletonBox className="h-9 w-24 rounded-md" />
    </div>
    <div className="card-elevated rounded-xl p-5 mb-6">
      <div className="flex flex-wrap items-center gap-3">
        <SkeletonBox className="h-6 w-16" />
        <SkeletonBox className="h-6 w-64 rounded" />
        <SkeletonBox className="h-4 w-32" />
      </div>
    </div>
    <div className="card-elevated rounded-xl overflow-hidden">
      <div className="border-b border-border bg-muted/50 p-4 flex gap-4">
        {[20, 120, 60, 50, 50, 60, 60].map((w, i) => (
          <SkeletonBox key={i} className="h-3" style={{ width: `${w}px` }} />
        ))}
      </div>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="flex items-center gap-4 p-4 border-b border-border last:border-0">
          <SkeletonBox className="h-4 w-6" />
          <div className="flex-1">
            <SkeletonBox className="h-4 w-28 mb-1" />
            <SkeletonLine width="200px" />
          </div>
          <SkeletonBox className="h-4 w-16" />
          <SkeletonBox className="h-4 w-8" />
          <SkeletonBox className="h-4 w-8" />
          <SkeletonBox className="h-4 w-10" />
          <SkeletonBox className="h-6 w-20 rounded-full" />
        </div>
      ))}
    </div>
  </div>
);

const Evaluation = () => {
  const [expandedTeam, setExpandedTeam] = useState<string | null>(null);

  return (
    <DashboardLayout>
      <PageLoader skeleton={<EvaluationSkeleton />}>
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Evaluation</h1>
                <p className="text-muted-foreground text-sm mt-1">Two-stage scoring with weighted results</p>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="w-4 h-4" /> Filter
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="card-elevated rounded-xl p-5 mb-6">
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="text-muted-foreground">Formula:</span>
                <code className="mono text-xs bg-muted px-2 py-1 rounded">
                  Combined = (Stage 1 × 0.35) + (Stage 2 × 0.65)
                </code>
                <span className="text-muted-foreground">|</span>
                <span className="text-muted-foreground">Stage 1: Online Review</span>
                <span className="text-muted-foreground">|</span>
                <span className="text-muted-foreground">Stage 2: Deep Evaluation</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="card-elevated rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider p-4">#</th>
                      <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider p-4">Team / Project</th>
                      <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider p-4">Track</th>
                      <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider p-4">Stage 1</th>
                      <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider p-4">Stage 2</th>
                      <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider p-4">Combined</th>
                      <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider p-4">Status</th>
                      <th className="p-4" />
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((p, i) => (
                      <tr
                        key={p.team}
                        className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors cursor-pointer"
                        onClick={() => setExpandedTeam(expandedTeam === p.team ? null : p.team)}
                      >
                        <td className="p-4 text-sm text-muted-foreground tab-nums">{i + 1}</td>
                        <td className="p-4">
                          <div className="font-medium text-sm">{p.team}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{p.title}</div>
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">{p.track}</td>
                        <td className="p-4 text-center text-sm font-medium tab-nums">{p.stage1}</td>
                        <td className="p-4 text-center text-sm font-medium tab-nums">{p.stage2}</td>
                        <td className="p-4 text-center text-sm font-bold tab-nums">{p.combined}</td>
                        <td className="p-4 text-center">
                          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusStyles[p.status]}`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${expandedTeam === p.team ? "rotate-180" : ""}`} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </PageLoader>
    </DashboardLayout>
  );
};

export default Evaluation;
