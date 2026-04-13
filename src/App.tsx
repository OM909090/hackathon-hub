import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HackathonProvider } from "@/contexts/HackathonContext";
import LandingPage from "./pages/LandingPage";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import ProfileVerification from "./pages/ProfileVerification";
import Team from "./pages/Team";
import ProblemStatements from "./pages/ProblemStatements";
import Submissions from "./pages/Submissions";
import SelectionStatus from "./pages/SelectionStatus";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <HackathonProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile-verification" element={<ProfileVerification />} />
            <Route path="/team" element={<Team />} />
            <Route path="/problem-statements" element={<ProblemStatements />} />
            <Route path="/submissions" element={<Submissions />} />
            <Route path="/selection-status" element={<SelectionStatus />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </HackathonProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
