import { DashboardLayout } from "@/components/DashboardSidebar";
import { ScrollReveal } from "@/components/ScrollReveal";
import { PageLoader, SkeletonBox, SkeletonLine } from "@/components/PageLoader";
import { useHackathon } from "@/contexts/HackathonContext";
import { Trophy, Clock, XCircle, CheckCircle2, PartyPopper, Users } from "lucide-react";
import { motion } from "framer-motion";

type SelectionResult = "selected" | "not_selected" | "pending";

const SelectionStatusSkeleton = () => (
  <div className="max-w-2xl mx-auto">
    <SkeletonBox className="h-8 w-52 mb-2" />
    <SkeletonLine width="240px" className="mb-8" />
    <div className="card-elevated rounded-2xl p-12">
      <SkeletonBox className="w-20 h-20 rounded-full mx-auto mb-6" />
      <SkeletonBox className="h-8 w-48 mx-auto mb-3" />
      <SkeletonLine width="80%" className="mx-auto mb-2" />
      <SkeletonLine width="60%" className="mx-auto" />
    </div>
  </div>
);

const SelectionStatus = () => {
  const { phase } = useHackathon();
  const resultsOut = phase === "results_announced";

  // Mock data — in real app this comes from backend
  const teamName = "CodeCrafters";
  const result: SelectionResult = resultsOut ? "selected" : "pending";
  // Note: "not_selected" would be set from backend when results show rejection
  const teamMembers = ["Rahul Kumar", "Priya Sharma", "Arjun Patel"];

  return (
    <DashboardLayout>
      <PageLoader skeleton={<SelectionStatusSkeleton />}>
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
                <Trophy className="w-7 h-7 text-accent" /> Selection Status
              </h1>
              <p className="text-muted-foreground text-sm mt-1">Check your team's hackathon selection result</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            {result === "pending" && (
              <div className="card-elevated rounded-2xl p-12 text-center">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
                  <Clock className="w-16 h-16 text-warning mx-auto" />
                </motion.div>
                <h2 className="text-2xl font-bold mt-6 mb-3">Results Pending</h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Your team's submission is under review. We will notify you via email and update this page once results are announced.
                </p>
                <div className="mt-6 p-4 rounded-xl bg-muted/50">
                  <div className="text-sm font-medium">Team: {teamName}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {teamMembers.join(" · ")}
                  </div>
                </div>
              </div>
            )}

            {result === "selected" && (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, ease: "backOut" }}>
                <div className="card-elevated rounded-2xl p-12 text-center border-success/30">
                  <div className="w-24 h-24 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
                    <PartyPopper className="w-12 h-12 text-success" />
                  </div>
                  <h2 className="text-3xl font-bold text-success mb-3">Congratulations! 🎉</h2>
                  <p className="text-lg text-muted-foreground mb-2">
                    Team <span className="font-semibold text-foreground">{teamName}</span> has been selected!
                  </p>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    You and your team members are invited to the offline hackathon at Utkal University. 
                    Check your email for detailed instructions and venue information.
                  </p>

                  <div className="mt-8 p-4 rounded-xl bg-success/5 border border-success/20">
                    <div className="flex items-center gap-2 justify-center mb-3">
                      <Users className="w-4 h-4 text-success" />
                      <span className="text-sm font-semibold text-success">Selected Team Members</span>
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {teamMembers.map((m) => (
                        <span key={m} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-success/10 text-sm text-success font-medium">
                          <CheckCircle2 className="w-3 h-3" /> {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {result === "not_selected" && (
              <div className="card-elevated rounded-2xl p-12 text-center">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                  <XCircle className="w-10 h-10 text-muted-foreground" />
                </div>
                <h2 className="text-2xl font-bold mb-3">Not Selected</h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Unfortunately, your team was not selected for the offline hackathon this time. 
                  Keep building and improving — there will be more opportunities!
                </p>
                <div className="mt-6 p-4 rounded-xl bg-muted/50">
                  <div className="text-sm font-medium">Team: {teamName}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {teamMembers.join(" · ")}
                  </div>
                </div>
              </div>
            )}
          </ScrollReveal>
        </div>
      </PageLoader>
    </DashboardLayout>
  );
};

export default SelectionStatus;
