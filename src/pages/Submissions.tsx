import { DashboardLayout } from "@/components/DashboardSidebar";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { PageLoader, SkeletonBox, SkeletonLine } from "@/components/PageLoader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileText, Video, Code2, ExternalLink, CheckCircle2 } from "lucide-react";

const submissionTypes = [
  { icon: Code2, label: "Source Code", desc: "GitHub repo or zip archive", accepted: ".zip, .tar.gz, GitHub URL", uploaded: true },
  { icon: FileText, label: "Presentation", desc: "Project pitch deck", accepted: ".pptx, .pdf, Google Slides", uploaded: true },
  { icon: Video, label: "Demo Video", desc: "3-5 min walkthrough", accepted: ".mp4, YouTube/Loom link", uploaded: false },
  { icon: FileText, label: "Abstract", desc: "Project summary document", accepted: ".pdf, .docx", uploaded: false },
];

const SubmissionsSkeleton = () => (
  <div className="max-w-4xl mx-auto">
    <div className="mb-8">
      <SkeletonBox className="h-8 w-52 mb-2" />
      <SkeletonLine width="240px" />
    </div>
    <div className="card-elevated rounded-xl p-5 mb-6 flex flex-col sm:flex-row gap-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex-1">
          <SkeletonLine width="40%" className="mb-2" />
          <SkeletonBox className="h-5 w-28" />
        </div>
      ))}
    </div>
    <div className="grid md:grid-cols-2 gap-4 mb-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="card-elevated rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <SkeletonBox className="w-10 h-10 rounded-lg" />
            <div>
              <SkeletonBox className="h-4 w-24 mb-1" />
              <SkeletonLine width="80px" />
            </div>
          </div>
          <SkeletonLine width="60%" className="mb-3" />
          <SkeletonBox className="h-16 w-full rounded-lg" />
        </div>
      ))}
    </div>
    <div className="card-elevated rounded-xl p-6">
      <SkeletonBox className="h-5 w-32 mb-4" />
      <div className="space-y-4">
        <SkeletonBox className="h-10 w-full rounded-lg" />
        <SkeletonBox className="h-24 w-full rounded-lg" />
        <SkeletonBox className="h-10 w-full rounded-lg" />
        <SkeletonBox className="h-10 w-full rounded-lg" />
      </div>
    </div>
  </div>
);

const Submissions = () => {
  return (
    <DashboardLayout>
      <PageLoader skeleton={<SubmissionsSkeleton />}>
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Project Submission</h1>
              <p className="text-muted-foreground text-sm mt-1">Upload your project files for evaluation</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="card-elevated rounded-xl p-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Team</div>
                <div className="font-semibold">CodeCrafters</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Track</div>
                <div className="font-semibold">Healthcare Innovation</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Deadline</div>
                <div className="font-semibold text-accent mono">Mar 28, 2024 23:59</div>
              </div>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid md:grid-cols-2 gap-4 mb-6">
            {submissionTypes.map((type) => (
              <StaggerItem key={type.label}>
                <div className={`card-elevated rounded-xl p-5 transition-all duration-300 ${type.uploaded ? "border-success/30" : "hover:border-accent/30"}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${type.uploaded ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
                        <type.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{type.label}</div>
                        <div className="text-xs text-muted-foreground">{type.desc}</div>
                      </div>
                    </div>
                    {type.uploaded && <CheckCircle2 className="w-5 h-5 text-success" />}
                  </div>
                  <div className="text-xs text-muted-foreground mb-3 mono">Accepted: {type.accepted}</div>
                  {type.uploaded ? (
                    <div className="flex items-center gap-2 text-sm text-success">
                      <span>project_code.zip</span>
                      <ExternalLink className="w-3 h-3" />
                    </div>
                  ) : (
                    <label className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-accent/50 hover:bg-accent/5 transition-colors">
                      <Upload className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Drop file or click to upload</span>
                      <input type="file" className="hidden" />
                    </label>
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <ScrollReveal>
            <div className="card-elevated rounded-xl p-6">
              <h2 className="font-semibold mb-4">Project Details</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input id="title" placeholder="MedTrack — AI-Powered Patient Monitoring" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="desc">Short Description</Label>
                  <textarea
                    id="desc"
                    rows={4}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                    placeholder="Describe your project, the problem it solves, and how it aligns with the chosen track..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="techStack">Tech Stack</Label>
                  <Input id="techStack" placeholder="React, Node.js, PostgreSQL, TensorFlow" />
                </div>
                <Button variant="hero" className="w-full mt-2">
                  Submit Project
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </PageLoader>
    </DashboardLayout>
  );
};

export default Submissions;
