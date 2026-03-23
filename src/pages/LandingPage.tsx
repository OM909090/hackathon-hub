import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { PageLoader, SkeletonBox, SkeletonLine } from "@/components/PageLoader";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Users, FolderUp, ClipboardCheck, Shield, Zap, Globe,
  ArrowRight, ChevronRight, Code2, Sparkles, Play,
  Trophy, Target, Calendar, Star, Cpu, Rocket
} from "lucide-react";

const stats = [
  { value: "2,000+", label: "Participants", icon: Users },
  { value: "400+", label: "Teams", icon: Target },
  { value: "100", label: "Selected", icon: Trophy },
  { value: "₹5L+", label: "Prizes", icon: Star },
];

const features = [
  { icon: Users, title: "Team Formation", description: "Create teams, invite members, and manage your squad with college-based grouping.", color: "bg-info/10 text-info" },
  { icon: FolderUp, title: "Project Submission", description: "Submit code, presentations, and demos through seamless Google Drive integration.", color: "bg-success/10 text-success" },
  { icon: ClipboardCheck, title: "Two-Stage Evaluation", description: "Online project review followed by deep technical evaluation with weighted scoring.", color: "bg-accent/10 text-accent" },
  { icon: Shield, title: "Secure Platform", description: "OTP-based auth, JWT security, and role-based access for all participants.", color: "bg-warning/10 text-warning" },
  { icon: Zap, title: "Real-time Updates", description: "Live notifications via WebSocket for submissions, results, and announcements.", color: "bg-info/10 text-info" },
  { icon: Globe, title: "College Dashboard", description: "Dedicated dashboards for each college to track and manage their participants.", color: "bg-success/10 text-success" },
];

const timeline = [
  { phase: "Phase 1", title: "Registration & Team Formation", date: "Week 1–2", description: "Register, form teams, select problem statement tracks." },
  { phase: "Phase 2", title: "Project Submission", date: "Week 3–4", description: "Build and submit your project with code, presentation, and demo." },
  { phase: "Phase 3", title: "Online Evaluation", date: "Week 5", description: "Stage 1 review — top 300-400 participants shortlisted." },
  { phase: "Phase 4", title: "Final Selection & Hackathon", date: "Week 6", description: "Stage 2 deep evaluation. Top 100 invited to Utkal University." },
];

const tracks = [
  { title: "Healthcare Innovation", desc: "Build solutions that improve patient care and health outcomes.", icon: "🏥" },
  { title: "EdTech Revolution", desc: "Create tools that transform learning experiences.", icon: "📚" },
  { title: "Sustainable Future", desc: "Design solutions for environmental challenges.", icon: "🌱" },
  { title: "Smart Infrastructure", desc: "Innovate urban systems with IoT and AI.", icon: "🏙️" },
  { title: "FinTech Solutions", desc: "Reimagine financial services and inclusion.", icon: "💳" },
  { title: "Open Innovation", desc: "Surprise us with your creative solution.", icon: "🚀" },
];

const LandingSkeleton = () => (
  <div className="min-h-screen bg-background">
    <div className="h-16 border-b border-border/50 flex items-center justify-between px-6 max-w-7xl mx-auto">
      <SkeletonBox className="h-5 w-36" />
      <div className="flex items-center gap-3">
        <SkeletonBox className="h-8 w-16 rounded-md" />
        <SkeletonBox className="h-8 w-28 rounded-md" />
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 grid lg:grid-cols-2 gap-12">
      <div>
        <SkeletonBox className="h-6 w-56 rounded-full mb-8" />
        <SkeletonBox className="h-14 w-full max-w-md mb-3" />
        <SkeletonBox className="h-14 w-72 mb-6" />
        <SkeletonLine width="80%" className="mb-2 !h-5" />
        <SkeletonLine width="60%" className="mb-10 !h-5" />
        <div className="flex gap-4">
          <SkeletonBox className="h-12 w-44 rounded-lg" />
          <SkeletonBox className="h-12 w-40 rounded-lg" />
        </div>
      </div>
      <SkeletonBox className="h-80 w-full rounded-2xl" />
    </div>
  </div>
);

const FloatingOrb = ({ className, style, delay = 0, duration = 6 }: { className: string; style?: React.CSSProperties; delay?: number; duration?: number }) => (
  <motion.div
    className={`absolute rounded-full blur-3xl opacity-20 ${className}`}
    style={style}
    animate={{ y: [-15, 15, -15], x: [-8, 8, -8], scale: [1, 1.08, 1] }}
    transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
  />
);

const LandingPage = () => {
  const videoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: videoRef,
    offset: ["start end", "end start"],
  });
  const videoScale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const videoY = useTransform(scrollYProgress, [0, 1], [60, -60]);

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
              <a href="#video" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a>
              <a href="#timeline" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Timeline</a>
              <a href="#tracks" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Tracks</a>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button variant="hero" size="sm">Register Now</Button>
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero — Split layout: Text + Video */}
        <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
          {/* Background decorations */}
          <div className="absolute inset-0 hero-gradient" />
          <div className="absolute inset-0 grid-pattern opacity-[0.03]" />
          <FloatingOrb className="w-96 h-96 top-20 -right-20" style={{ background: "radial-gradient(circle, hsl(var(--accent-warm)), transparent)" } as any} />
          <FloatingOrb className="w-64 h-64 bottom-32 left-10" style={{ background: "radial-gradient(circle, hsl(var(--info)), transparent)" } as any} delay={2} />
          <FloatingOrb className="w-48 h-48 top-1/2 left-1/3" style={{ background: "radial-gradient(circle, hsl(var(--success)), transparent)" } as any} delay={4} duration={8} />

          <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: Text Content */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/30 bg-accent/10 backdrop-blur-sm mb-6">
                    <Sparkles className="w-3.5 h-3.5 text-accent" />
                    <span className="text-xs font-medium text-accent mono">v2.0 — Project-Based Evaluation</span>
                  </div>
                </motion.div>

                <motion.h1
                  className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1] text-primary-foreground mb-5"
                  initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  Build. Submit.
                  <br />
                  <span className="text-gradient">Get Selected.</span>
                </motion.h1>

                <motion.p
                  className="text-base md:text-lg text-primary-foreground/60 max-w-lg mb-8 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                >
                  Utkal University's state-level hackathon. Submit your project online,
                  get evaluated by experts, and compete with the best 100 at campus.
                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-4 mb-10"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Link to="/register">
                    <Button variant="hero" size="xl" className="group">
                      Register Your Team
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                    </Button>
                  </Link>
                  <Link to="/dashboard">
                    <Button variant="hero-outline" size="xl">
                      View Dashboard
                    </Button>
                  </Link>
                </motion.div>

                {/* Stats Row */}
                <motion.div
                  className="grid grid-cols-2 md:grid-cols-4 gap-4"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.55 }}
                >
                  {stats.map((stat) => (
                    <div key={stat.label} className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary-foreground/10 flex items-center justify-center">
                        <stat.icon className="w-4 h-4 text-accent" />
                      </div>
                      <div>
                        <div className="text-xl font-bold text-primary-foreground tab-nums leading-tight">{stat.value}</div>
                        <div className="text-[11px] text-primary-foreground/40">{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Right: Featured Video */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92, x: 40 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-primary-foreground/10 bg-primary/80">
                  {/* Glow behind video */}
                  <div className="absolute -inset-4 rounded-3xl bg-accent/10 blur-2xl -z-10" />
                  
                  {/* Video Player */}
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full aspect-video object-cover rounded-2xl"
                  >
                    <source src="/videos/hero-3d.mp4" type="video/mp4" />
                  </video>

                  {/* Video overlay label */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/90 to-transparent p-5 pt-12">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                      <span className="text-[11px] text-primary-foreground/70 mono uppercase tracking-wider">Platform Preview</span>
                    </div>
                    <p className="text-sm text-primary-foreground/90 font-medium">
                      Utkal Hackathon 2026 — Powered by Project-Based Evaluation
                    </p>
                  </div>
                </div>

                {/* Floating badges around video */}
                <motion.div
                  className="absolute -top-3 -right-3 px-3 py-1.5 rounded-full bg-success/90 text-success-foreground text-xs font-bold shadow-lg"
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  🔴 Live
                </motion.div>
                <motion.div
                  className="absolute -bottom-3 -left-3 px-3 py-1.5 rounded-lg bg-card text-foreground text-xs font-medium shadow-lg border border-border flex items-center gap-1.5"
                  animate={{ y: [3, -3, 3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <Cpu className="w-3.5 h-3.5 text-accent" />
                  3D Animated
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Video Showcase Section */}
        <section id="video" className="py-20 md:py-28 section-padding bg-secondary/30">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="text-xs font-semibold uppercase tracking-widest text-accent mono">Watch the Experience</span>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mt-3">See the Platform in Action</h2>
                <p className="text-muted-foreground text-base mt-4 max-w-2xl mx-auto">
                  From registration to final selection — experience how our platform streamlines the entire hackathon journey with cutting-edge technology.
                </p>
              </div>
            </ScrollReveal>

            <motion.div
              ref={videoRef}
              style={{ scale: videoScale, y: videoY }}
              className="max-w-4xl mx-auto"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/50">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full aspect-video object-cover"
                >
                  <source src="/videos/hero-3d.mp4" type="video/mp4" />
                </video>

                {/* Video info bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 to-transparent p-6 pt-16">
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">Utkal Hackathon Platform</h3>
                      <p className="text-white/60 text-sm">State-Level Hackathon · 2,000+ Participants · 6 Problem Tracks</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-white/20 text-white text-xs font-medium backdrop-blur-sm">3D Preview</span>
                      <span className="px-2.5 py-1 rounded-md bg-accent/90 text-accent-foreground text-xs font-medium">v2.0</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Key highlights below video */}
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 max-w-4xl mx-auto">
              {[
                { icon: Rocket, label: "Project Submissions", detail: "Multi-format uploads" },
                { icon: Shield, label: "Secure Auth", detail: "OTP + JWT based" },
                { icon: Target, label: "Two-Stage Eval", detail: "Weighted scoring" },
                { icon: Calendar, label: "Real-time", detail: "WebSocket updates" },
              ].map((item) => (
                <StaggerItem key={item.label}>
                  <div className="glass-card rounded-xl p-4 text-center">
                    <item.icon className="w-5 h-5 text-accent mx-auto mb-2" />
                    <div className="text-sm font-semibold">{item.label}</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">{item.detail}</div>
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
                  Everything you need for a seamless hackathon experience
                </h2>
              </div>
            </ScrollReveal>

            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {features.map((feature) => (
                <StaggerItem key={feature.title}>
                  <div className="glass-card rounded-xl p-6 h-full group cursor-default transition-all duration-300">
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
                <span className="text-xs font-semibold uppercase tracking-widest text-accent mono">Problem Statements</span>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mt-3">Choose Your Track</h2>
              </div>
            </ScrollReveal>

            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {tracks.map((track) => (
                <StaggerItem key={track.title}>
                  <div className="glass-card rounded-xl p-6 h-full group cursor-pointer hover:border-accent/30 transition-all duration-300">
                    <span className="text-3xl">{track.icon}</span>
                    <h3 className="font-semibold text-lg mt-4 mb-2 group-hover:text-accent transition-colors">{track.title}</h3>
                    <p className="text-muted-foreground text-sm">{track.desc}</p>
                    <div className="mt-4 flex items-center gap-1 text-xs font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn more <ChevronRight className="w-3 h-3" />
                    </div>
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
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-primary-foreground mb-4">
                  Ready to hack?
                </h2>
                <p className="text-primary-foreground/60 text-lg max-w-xl mx-auto mb-8">
                  Register your team before spots fill up. Show Odisha what you can build.
                </p>
                <Link to="/register">
                  <Button variant="hero" size="xl" className="group">
                    Register Now
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
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
              <span className="font-semibold text-sm">Utkal Hackathon v2.0</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#features" className="hover:text-foreground transition-colors">Features</a>
              <a href="#timeline" className="hover:text-foreground transition-colors">Timeline</a>
              <a href="#tracks" className="hover:text-foreground transition-colors">Tracks</a>
              <Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
            </div>
            <p className="text-xs text-muted-foreground">© 2026 Utkal University. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </PageLoader>
  );
};

export default LandingPage;
