import { DashboardLayout } from "@/components/DashboardSidebar";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { PageLoader, SkeletonBox, SkeletonLine } from "@/components/PageLoader";
import { useHackathon, PHASE_LABELS } from "@/contexts/HackathonContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Upload, FileText, CheckCircle2, Lock, AlertCircle, FolderUp
} from "lucide-react";

const SubmissionsSkeleton = () => (
  <div className="max-w-3xl mx-auto">
    <SkeletonBox className="h-8 w-52 mb-2" />
    <SkeletonLine width="240px" className="mb-8" />
    <div className="card-elevated rounded-xl p-6 mb-6">
      <SkeletonBox className="h-5 w-32 mb-4" />
      <SkeletonBox className="h-40 w-full rounded-xl" />
    </div>
    <div className="space-y-4">
      <SkeletonBox className="h-10 w-full rounded-lg" />
      <SkeletonBox className="h-24 w-full rounded-lg" />
      <SkeletonBox className="h-11 w-full rounded-lg" />
    </div>
  </div>
);

const Submissions = () => {
  const { phase, isTeamLeader } = useHackathon();
  const canSubmit = phase === "stage1_open" && isTeamLeader;
  const hasSubmitted = false; // Mock
  const teamName = "CodeCrafters";
  const leaderName = "Rahul Kumar";

  return (
    <DashboardLayout>
      <PageLoader skeleton={<SubmissionsSkeleton />}>
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
                <FolderUp className="w-7 h-7 text-accent" /> Submission
              </h1>
              <p className="text-muted-foreground text-sm mt-1">Submit your team's solution</p>
            </div>
          </ScrollReveal>

          {/* Phase check */}
          {phase !== "stage1_open" && phase !== "stage1_closed" && phase !== "review" && phase !== "results_announced" ? (
            <ScrollReveal>
              <div className="card-elevated rounded-2xl p-12 text-center">
                <Lock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-xl font-bold mb-2">Submissions Not Open</h2>
                <p className="text-muted-foreground text-sm max-w-md mx-auto">
                  Submissions will open when Stage 1 begins. Current phase: {PHASE_LABELS[phase]}
                </p>
              </div>
            </ScrollReveal>
          ) : !isTeamLeader ? (
            /* Member view */
            <ScrollReveal>
              <div className="card-elevated rounded-2xl p-12 text-center">
                {hasSubmitted ? (
                  <>
                    <CheckCircle2 className="w-12 h-12 text-success mx-auto mb-4" />
                    <h2 className="text-xl font-bold mb-2">Solution Submitted!</h2>
                    <p className="text-muted-foreground text-sm max-w-md mx-auto">
                      Your leader <span className="font-medium text-foreground">{leaderName}</span> has submitted the solution for team <span className="font-medium text-foreground">{teamName}</span>.
                      Wait for results in the Selection Status page, or we will notify you soon.
                    </p>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-12 h-12 text-warning mx-auto mb-4" />
                    <h2 className="text-xl font-bold mb-2">Waiting for Team Leader</h2>
                    <p className="text-muted-foreground text-sm max-w-md mx-auto">
                      Only your team leader <span className="font-medium text-foreground">{leaderName}</span> can submit the solution. Please coordinate with them.
                    </p>
                  </>
                )}
              </div>
            </ScrollReveal>
          ) : phase === "stage1_closed" || phase === "review" || phase === "results_announced" ? (
            <ScrollReveal>
              <div className="card-elevated rounded-2xl p-12 text-center">
                <Lock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-xl font-bold mb-2">Submissions Closed</h2>
                <p className="text-muted-foreground text-sm max-w-md mx-auto">
                  The submission window has ended. Wait for results in the Selection Status page.
                </p>
              </div>
            </ScrollReveal>
          ) : (
            /* Leader submission form */
            <div className="space-y-6">
              {/* Domain selection */}
              <ScrollReveal>
                <div className="card-elevated rounded-xl p-6">
                  <h2 className="font-semibold mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-accent" /> Select Domain
                  </h2>
                  <select className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <option value="">Choose the domain for your solution</option>
                    <option>🏥 Healthcare Innovation</option>
                    <option>📚 EdTech Revolution</option>
                    <option>🌱 Sustainable Future</option>
                    <option>🏙️ Smart Infrastructure</option>
                    <option>💳 FinTech Solutions</option>
                    <option>🚀 Open Innovation</option>
                  </select>
                </div>
              </ScrollReveal>

              {/* File Upload */}
              <ScrollReveal delay={0.1}>
                <div className="card-elevated rounded-xl p-6">
                  <h2 className="font-semibold mb-2 flex items-center gap-2">
                    <Upload className="w-5 h-5 text-accent" /> Upload Solution
                  </h2>
                  <p className="text-xs text-muted-foreground mb-4">
                    Upload your solution files. Accepted formats: PDF, PPT, ZIP, or any other format.
                  </p>
                  <label className="flex flex-col items-center justify-center gap-3 p-10 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-accent/50 hover:bg-accent/5 transition-all">
                    <Upload className="w-10 h-10 text-muted-foreground" />
                    <div className="text-center">
                      <p className="text-sm font-medium">Drop files or click to upload</p>
                      <p className="text-xs text-muted-foreground mt-1">PDF, PPT, ZIP, DOC, etc. — Max 50MB</p>
                    </div>
                    <input type="file" className="hidden" multiple />
                  </label>
                </div>
              </ScrollReveal>

              {/* Project Details */}
              <ScrollReveal delay={0.2}>
                <div className="card-elevated rounded-xl p-6">
                  <h2 className="font-semibold mb-4">Project Details</h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Project Title</Label>
                      <Input id="title" placeholder="e.g., MedTrack — AI Patient Monitoring" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="desc">Short Description</Label>
                      <textarea
                        id="desc"
                        rows={3}
                        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                        placeholder="Briefly describe your solution and how it solves the problem..."
                      />
                    </div>
                    <Button variant="hero" className="w-full gap-2">
                      <FolderUp className="w-4 h-4" /> Submit Solution
                    </Button>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          )}
        </div>
      </PageLoader>
    </DashboardLayout>
  );
};

export default Submissions;
