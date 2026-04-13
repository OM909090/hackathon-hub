import { createContext, useContext, useState, ReactNode } from "react";

export type HackathonPhase = 
  | "not_started" 
  | "registration_open" 
  | "registration_closed" 
  | "stage1_open" 
  | "stage1_closed" 
  | "review" 
  | "results_announced";

export const PHASE_LABELS: Record<HackathonPhase, string> = {
  not_started: "Not Started",
  registration_open: "Registration Open",
  registration_closed: "Registration Closed",
  stage1_open: "Stage 1 — Submissions Open",
  stage1_closed: "Stage 1 — Submissions Closed",
  review: "Under Review",
  results_announced: "Results Announced",
};

export const PHASE_ORDER: HackathonPhase[] = [
  "not_started",
  "registration_open",
  "registration_closed",
  "stage1_open",
  "stage1_closed",
  "review",
  "results_announced",
];

interface HackathonContextType {
  phase: HackathonPhase;
  setPhase: (p: HackathonPhase) => void;
  hackathonName: string;
  isProfileVerified: boolean;
  setIsProfileVerified: (v: boolean) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (v: boolean) => void;
  isAdmin: boolean;
  setIsAdmin: (v: boolean) => void;
  isTeamLeader: boolean;
  setIsTeamLeader: (v: boolean) => void;
  hasTeam: boolean;
  setHasTeam: (v: boolean) => void;
}

const HackathonContext = createContext<HackathonContextType | null>(null);

export const HackathonProvider = ({ children }: { children: ReactNode }) => {
  const [phase, setPhase] = useState<HackathonPhase>("registration_open");
  const [isProfileVerified, setIsProfileVerified] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isTeamLeader, setIsTeamLeader] = useState(true);
  const [hasTeam, setHasTeam] = useState(true);

  return (
    <HackathonContext.Provider value={{
      phase, setPhase,
      hackathonName: "Utkal Hackathon 2024",
      isProfileVerified, setIsProfileVerified,
      isLoggedIn, setIsLoggedIn,
      isAdmin, setIsAdmin,
      isTeamLeader, setIsTeamLeader,
      hasTeam, setHasTeam,
    }}>
      {children}
    </HackathonContext.Provider>
  );
};

export const useHackathon = () => {
  const ctx = useContext(HackathonContext);
  if (!ctx) throw new Error("useHackathon must be used within HackathonProvider");
  return ctx;
};
