import { DashboardLayout } from "@/components/DashboardSidebar";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, Users, Mail, Building2, Phone, ArrowRight } from "lucide-react";
import { useState } from "react";

const Registration = () => {
  const [step, setStep] = useState(1);

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Registration</h1>
            <p className="text-muted-foreground text-sm mt-1">Create your account and join the hackathon</p>
          </div>
        </ScrollReveal>

        {/* Steps */}
        <ScrollReveal>
          <div className="flex items-center gap-2 mb-8">
            {["Personal Info", "College Details", "Team Setup"].map((label, i) => (
              <div key={label} className="flex items-center gap-2 flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${step > i + 1 ? "bg-success text-success-foreground" : step === i + 1 ? "accent-gradient text-accent-foreground" : "bg-muted text-muted-foreground"}`}>
                  {i + 1}
                </div>
                <span className={`text-sm hidden sm:block ${step === i + 1 ? "font-medium text-foreground" : "text-muted-foreground"}`}>{label}</span>
                {i < 2 && <div className="flex-1 h-px bg-border" />}
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="card-elevated rounded-xl p-6 md:p-8">
            {step === 1 && (
              <StaggerContainer className="space-y-5">
                <StaggerItem>
                  <h2 className="text-lg font-semibold flex items-center gap-2 mb-6">
                    <UserPlus className="w-5 h-5 text-accent" /> Personal Information
                  </h2>
                </StaggerItem>
                <StaggerItem>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="Ananya" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Patel" />
                    </div>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="email" placeholder="ananya@university.ac.in" className="pl-10" />
                    </div>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Mobile Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="phone" placeholder="+91 98765 43210" className="pl-10" />
                    </div>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <Button variant="hero" className="w-full mt-4" onClick={() => setStep(2)}>
                    Continue <ArrowRight className="w-4 h-4" />
                  </Button>
                </StaggerItem>
              </StaggerContainer>
            )}

            {step === 2 && (
              <StaggerContainer className="space-y-5">
                <StaggerItem>
                  <h2 className="text-lg font-semibold flex items-center gap-2 mb-6">
                    <Building2 className="w-5 h-5 text-accent" /> College Details
                  </h2>
                </StaggerItem>
                <StaggerItem>
                  <div className="space-y-2">
                    <Label htmlFor="college">College / University</Label>
                    <Input id="college" placeholder="KIIT University, Bhubaneswar" />
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Input id="department" placeholder="Computer Science" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="year">Year of Study</Label>
                      <Input id="year" placeholder="3rd Year" />
                    </div>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="space-y-2">
                    <Label htmlFor="studentId">Student ID</Label>
                    <Input id="studentId" placeholder="2021BTECH1234" />
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="flex gap-3 mt-4">
                    <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>Back</Button>
                    <Button variant="hero" className="flex-1" onClick={() => setStep(3)}>
                      Continue <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </StaggerItem>
              </StaggerContainer>
            )}

            {step === 3 && (
              <StaggerContainer className="space-y-5">
                <StaggerItem>
                  <h2 className="text-lg font-semibold flex items-center gap-2 mb-6">
                    <Users className="w-5 h-5 text-accent" /> Team Setup
                  </h2>
                </StaggerItem>
                <StaggerItem>
                  <div className="space-y-2">
                    <Label htmlFor="teamName">Team Name</Label>
                    <Input id="teamName" placeholder="CodeCrafters" />
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="space-y-2">
                    <Label>Invite Team Members (up to 3)</Label>
                    <Input placeholder="teammate1@college.ac.in" className="mb-2" />
                    <Input placeholder="teammate2@college.ac.in" className="mb-2" />
                    <Input placeholder="teammate3@college.ac.in" />
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="p-4 rounded-lg bg-accent/5 border border-accent/20 text-sm text-muted-foreground">
                    💡 Your team members will receive an invite email with OTP verification to join.
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="flex gap-3 mt-4">
                    <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>Back</Button>
                    <Button variant="hero" className="flex-1">
                      Complete Registration
                    </Button>
                  </div>
                </StaggerItem>
              </StaggerContainer>
            )}
          </div>
        </ScrollReveal>
      </div>
    </DashboardLayout>
  );
};

export default Registration;
