import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { PageLoader, SkeletonBox, SkeletonLine } from "@/components/PageLoader";
import { motion } from "framer-motion";
import {
  Users, FolderUp, ClipboardCheck, Shield, Zap, Trophy,
  ArrowRight, ChevronRight, Code2, Sparkles, Megaphone
} from "lucide-react";

const stats = [
  { value: "2,000+", label: "Participants" },
  { value: "400+", label: "Teams" },
  { value: "25", label: "Selected Teams" },
  { value: "100", label: "Finalists" },
];

const features = [
  { icon: Users, title: "Team Formation", description: "Create or join teams of 3-4 members using invite codes.", color: "bg-info/10 text-info" },
  { icon: FolderUp, title: "Project Submission", description: "Upload solutions in any format — PDF, PPT, ZIP, and more.", color: "bg-success/10 text-success" },
  { icon: ClipboardCheck, title: "Domain-Based Tracks", description: "Choose from multiple problem statement domains and build your solution.", color: "bg-accent/10 text-accent" },
  { icon: Shield, title: "Verified Profiles", description: "Upload your photo and student ID for instant verification.", color: "bg-warning/10 text-warning" },
  { icon: Zap, title: "Real-time Updates", description: "Get notified about phases, results, and announcements instantly.", color: "bg-info/10 text-info" },
  { icon: Trophy, title: "Selection Results", description: "Top 25 teams (100 students) selected for the offline hackathon.", color: "bg-success/10 text-success" },
];

const timeline = [
  { phase: "Phase 1", title: "Registration & Team Formation", date: "Week 1–2", description: "Register, verify profile, form teams of 3-4 members." },
  { phase: "Phase 2", title: "Problem Statements Released", date: "Week 3", description: "Choose your domain, review criteria, and start building." },
  { phase: "Phase 3", title: "Submission Window", date: "Week 4", description: "Team leaders submit solutions before the deadline." },
  { phase: "Phase 4", title: "Review & Selection", date: "Week 5", description: "Top 25 teams selected and invited to campus." },
];

const mockAnnouncements = [
  { title: "Registration is Open!", content: "Register now and form your team before spots fill up.", date: "Mar 1, 2024" },
  { title: "Stage 1 Opens March 15", content: "Problem statements will be released. Get ready to build!", date: "Mar 10, 2024" },
];

const LandingSkeleton = () => (
  <div className="min-h-screen bg-background">
    <div className="h-16 border-b border-border/50 flex items-center justify-between px-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-2.5">
        <SkeletonBox className="w-8 h-8 rounded-lg" />
        <SkeletonBox className="h-5 w-36" />
      </div>
      <div className="flex items-center gap-3">
        <SkeletonBox className="h-8 w-16 rounded-md" />
        <SkeletonBox className="h-8 w-28 rounded-md" />
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-24">
      <div className="max-w-3xl">
        <SkeletonBox className="h-6 w-56 rounded-full mb-8" />
        <SkeletonBox className="h-16 w-full max-w-lg mb-3" />
        <SkeletonBox className="h-16 w-80 mb-6" />
        <SkeletonLine width="70%" className="mb-2 !h-5" />
        <SkeletonLine width="50%" className="mb-10 !h-5" />
        <div className="flex gap-4">
          <SkeletonBox className="h-12 w-44 rounded-lg" />
          <SkeletonBox className="h-12 w-40 rounded-lg" />
        </div>
      </div>
    </div>
  </div>
);

const LandingPage = () => {
  return (
    <PageLoader skeleton={<LandingSkeleton />} delay={800}>
      <div className="min-h-screen bg-background overflow-hidden">
        {/* Navbar */}
        <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg accent-gradient flex items-center justify-center">
                <Code2 className="w-4 h-4 text-accent-foreground" />
              </div>
              <span className="font-bold text-lg tracking-tight">Utkal Hackathon</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#timeline" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Timeline</a>
              <a href="#tracks" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Tracks</a>
              <a href="#announcements" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Announcements</a>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/auth">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link to="/auth">
                <Button variant="hero" size="sm">Register Now</Button>
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section className="relative min-h-screen flex items-center hero-gradient overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-[0.03]" />
          <motion.div
            className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, hsl(var(--accent-warm)), transparent)" }}
            animate={{ y: [-12, 12, -12], scale: [1, 1.05, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-24">
            <div className="max-w-3xl">
              <motion.div initial={{ opacity: 0, y: 20, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/30 bg-accent/10 mb-8">
                  <Sparkles className="w-3.5 h-3.5 text-accent" />
                  <span className="text-xs font-medium text-accent mono">25 Teams · 100 Students · Offline Hackathon</span>
                </div>
              </motion.div>

              <motion.h1
                className="text-5xl md:text-7xl font-bold tracking-tight leading-[0.95] text-primary-foreground mb-6"
                initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                Build. Submit.
                <br />
                <span className="text-gradient">Get Selected.</span>
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-primary-foreground/60 max-w-xl mb-10 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
              >
                Utkal University's state-level hackathon. Register, form your team, submit your solution, and compete for a spot at the offline event.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Link to="/auth">
                  <Button variant="hero" size="xl" className="group">
                    Register Your Team
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button variant="hero-outline" size="xl">Sign In</Button>
                </Link>
              </motion.div>
            </div>

            <motion.div
              className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {stats.map((stat) => (
                <div key={stat.label} className="text-center md:text-left">
                  <div className="text-3xl md:text-4xl font-bold text-primary-foreground tab-nums">{stat.value}</div>
                  <div className="text-sm text-primary-foreground/40 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Announcements */}
        <section id="announcements" className="py-16 bg-accent/5 section-padding">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <div className="flex items-center gap-2 mb-6">
                <Megaphone className="w-5 h-5 text-accent" />
                <h2 className="text-xl font-bold">Announcements</h2>
              </div>
            </ScrollReveal>
            <StaggerContainer className="grid md:grid-cols-2 gap-4">
              {mockAnnouncements.map((a, i) => (
                <StaggerItem key={i}>
                  <div className="glass-card rounded-xl p-5">
                    <div className="flex items-start gap-3">
                      <Megaphone className="w-4 h-4 text-accent mt-1 shrink-0" />
                      <div>
                        <h3 className="font-semibold text-sm">{a.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{a.content}</p>
                        <span className="text-[10px] text-muted-foreground mono mt-2 block">{a.date}</span>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-24 md:py-32 section-padding">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="max-w-2xl mb-16">
                <span className="text-xs font-semibold uppercase tracking-widest text-accent mono">Platform Features</span>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mt-3 leading-[1.1]">
                  Everything you need for the hackathon
                </h2>
              </div>
            </ScrollReveal>
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {features.map((feature) => (
                <StaggerItem key={feature.title}>
                  <div className="glass-card rounded-xl p-6 h-full">
                    <div className={`w-10 h-10 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                      <feature.icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Timeline */}
        <section id="timeline" className="py-24 md:py-32 bg-secondary/50 section-padding">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16">
                <span className="text-xs font-semibold uppercase tracking-widest text-accent mono">How It Works</span>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mt-3">From Registration to Campus</h2>
              </div>
            </ScrollReveal>
            <div className="relative">
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border" />
              <div className="space-y-12">
                {timeline.map((item, i) => (
                  <ScrollReveal key={item.phase} delay={i * 0.1} direction={i % 2 === 0 ? "left" : "right"}>
                    <div className={`flex items-start gap-6 md:gap-12 ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}>
                      <div className={`flex-1 ${i % 2 !== 0 ? "md:text-right" : ""}`}>
                        <div className="glass-card rounded-xl p-6">
                          <span className="mono text-xs font-semibold text-accent">{item.phase}</span>
                          <h3 className="font-semibold text-lg mt-1">{item.title}</h3>
                          <p className="text-muted-foreground text-sm mt-2">{item.description}</p>
                          <span className="inline-block mt-3 text-xs text-muted-foreground mono">{item.date}</span>
                        </div>
                      </div>
                      <div className="relative shrink-0">
                        <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold text-sm shadow-lg glow-accent">
                          {i + 1}
                        </div>
                      </div>
                      <div className="flex-1 hidden md:block" />
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tracks */}
        <section id="tracks" className="py-24 md:py-32 section-padding">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16">
                <span className="text-xs font-semibold uppercase tracking-widest text-accent mono">Problem Domains</span>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mt-3">Choose Your Track</h2>
              </div>
            </ScrollReveal>
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { title: "Healthcare Innovation", desc: "Build solutions for patient care and health outcomes.", icon: "🏥" },
                { title: "EdTech Revolution", desc: "Transform learning and education access.", icon: "📚" },
                { title: "Sustainable Future", desc: "Address environmental challenges.", icon: "🌱" },
                { title: "Smart Infrastructure", desc: "Innovate urban systems with IoT and AI.", icon: "🏙️" },
                { title: "FinTech Solutions", desc: "Reimagine financial services.", icon: "💳" },
                { title: "Open Innovation", desc: "Surprise us with your creative solution.", icon: "🚀" },
              ].map((track) => (
                <StaggerItem key={track.title}>
                  <div className="glass-card rounded-xl p-6 h-full group cursor-default hover:border-accent/30 transition-all">
                    <span className="text-3xl">{track.icon}</span>
                    <h3 className="font-semibold text-lg mt-4 mb-2 group-hover:text-accent transition-colors">{track.title}</h3>
                    <p className="text-muted-foreground text-sm">{track.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 md:py-32 section-padding">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center hero-gradient rounded-3xl p-12 md:p-20 relative overflow-hidden">
              <div className="absolute inset-0 grid-pattern opacity-[0.03]" />
              <div className="relative">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-primary-foreground mb-4">Ready to hack?</h2>
                <p className="text-primary-foreground/60 text-lg max-w-xl mx-auto mb-8">
                  Register your team and show what you can build.
                </p>
                <Link to="/auth">
                  <Button variant="hero" size="xl" className="group">
                    Register Now <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Footer */}
        <footer className="border-t border-border py-12 section-padding">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-md accent-gradient flex items-center justify-center">
                <Code2 className="w-3.5 h-3.5 text-accent-foreground" />
              </div>
              <span className="font-semibold text-sm">Utkal Hackathon 2024</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#features" className="hover:text-foreground transition-colors">Features</a>
              <a href="#timeline" className="hover:text-foreground transition-colors">Timeline</a>
              <a href="#tracks" className="hover:text-foreground transition-colors">Tracks</a>
              <Link to="/auth" className="hover:text-foreground transition-colors">Dashboard</Link>
            </div>
            <p className="text-xs text-muted-foreground">© 2024 Utkal University. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </PageLoader>
  );
};

export default LandingPage;
