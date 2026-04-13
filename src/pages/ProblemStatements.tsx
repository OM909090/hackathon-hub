import { DashboardLayout } from "@/components/DashboardSidebar";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { PageLoader, SkeletonBox, SkeletonLine } from "@/components/PageLoader";
import { useHackathon, PHASE_LABELS } from "@/contexts/HackathonContext";
import { FileText, Lock, ExternalLink, Target, Clock, AlertCircle } from "lucide-react";

const mockDomains = [
  {
    id: "1",
    title: "Healthcare Innovation",
    emoji: "🏥",
    description: "Build solutions that improve patient care, health monitoring, or medical data management.",
    criteria: ["Relevance to healthcare challenges", "Technical implementation quality", "Innovation and impact", "Scalability and feasibility"],
    teams: 45,
  },
  {
    id: "2",
    title: "EdTech Revolution",
    emoji: "📚",
    description: "Create tools and platforms that transform learning experiences and education access.",
    criteria: ["User experience and accessibility", "Pedagogical value", "Technical robustness", "Potential reach"],
    teams: 38,
  },
  {
    id: "3",
    title: "Sustainable Future",
    emoji: "🌱",
    description: "Design solutions that address environmental challenges and promote sustainability.",
    criteria: ["Environmental impact potential", "Innovation approach", "Real-world applicability", "Data-driven insights"],
    teams: 32,
  },
  {
    id: "4",
    title: "Smart Infrastructure",
    emoji: "🏙️",
    description: "Innovate urban systems with IoT, AI, and smart technology for better cities.",
    criteria: ["IoT integration quality", "AI/ML implementation", "Urban relevance", "Demonstration quality"],
    teams: 28,
  },
  {
    id: "5",
    title: "FinTech Solutions",
    emoji: "💳",
    description: "Reimagine financial services, digital payments, and financial inclusion tools.",
    criteria: ["Security implementation", "User trust and UX", "Financial inclusion impact", "Technical innovation"],
    teams: 25,
  },
  {
    id: "6",
    title: "Open Innovation",
    emoji: "🚀",
    description: "Surprise us with your creative solution to any real-world problem.",
    criteria: ["Problem identification", "Creativity and uniqueness", "Technical execution", "Presentation quality"],
    teams: 20,
  },
];

const ProblemStatementsSkeleton = () => (
  <div className="max-w-5xl mx-auto">
    <SkeletonBox className="h-8 w-56 mb-2" />
    <SkeletonLine width="300px" className="mb-8" />
    <div className="grid md:grid-cols-2 gap-5">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="card-elevated rounded-xl p-6">
          <SkeletonBox className="h-8 w-8 mb-3" />
          <SkeletonBox className="h-5 w-40 mb-2" />
          <SkeletonLine width="90%" className="mb-1" />
          <SkeletonLine width="70%" className="mb-4" />
          <div className="space-y-2">
            {[1, 2, 3].map((j) => (
              <SkeletonLine key={j} width={`${60 + j * 10}%`} />
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ProblemStatements = () => {
  const { phase } = useHackathon();
  const isReleased = phase === "stage1_open" || phase === "stage1_closed" || phase === "review" || phase === "results_announced";

  return (
    <DashboardLayout>
      <PageLoader skeleton={<ProblemStatementsSkeleton />}>
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
                <FileText className="w-7 h-7 text-accent" /> Problem Statements
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                {isReleased ? "Choose a domain and build your solution" : "Problem statements will be released soon"}
              </p>
            </div>
          </ScrollReveal>

          {/* Phase Banner */}
          <ScrollReveal>
            <div className={`card-elevated rounded-xl p-4 mb-6 flex items-center gap-3 ${isReleased ? "border-success/30" : "border-warning/30"}`}>
              {isReleased ? (
                <>
                  <Target className="w-5 h-5 text-success" />
                  <div>
                    <div className="text-sm font-medium text-success">Problem Statements Released</div>
                    <div className="text-xs text-muted-foreground">Select a domain and prepare your solution for submission</div>
                  </div>
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5 text-warning" />
                  <div>
                    <div className="text-sm font-medium text-warning">Not Yet Released</div>
                    <div className="text-xs text-muted-foreground">
                      Current phase: {PHASE_LABELS[phase]}. Problem statements will be available when Stage 1 opens.
                    </div>
                  </div>
                </>
              )}
            </div>
          </ScrollReveal>

          {isReleased ? (
            <StaggerContainer className="grid md:grid-cols-2 gap-5">
              {mockDomains.map((domain) => (
                <StaggerItem key={domain.id}>
                  <div className="card-elevated rounded-xl p-6 hover:border-accent/30 transition-all duration-300 group">
                    <span className="text-3xl">{domain.emoji}</span>
                    <h3 className="font-semibold text-lg mt-3 mb-2 group-hover:text-accent transition-colors">{domain.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{domain.description}</p>

                    <div className="mb-4">
                      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Selection Criteria</div>
                      <ul className="space-y-1.5">
                        {domain.criteria.map((c, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <Target className="w-3 h-3 text-accent mt-0.5 shrink-0" />
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <span className="text-xs text-muted-foreground">{domain.teams} teams participating</span>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <div className="card-elevated rounded-2xl p-16 text-center">
              <Lock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2">Coming Soon</h2>
              <p className="text-muted-foreground text-sm max-w-md mx-auto">
                Problem statements will be released when the admin opens Stage 1. Stay tuned for updates!
              </p>
            </div>
          )}
        </div>
      </PageLoader>
    </DashboardLayout>
  );
};

export default ProblemStatements;
