import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollReveal } from "@/components/ScrollReveal";
import { PageLoader, SkeletonBox, SkeletonLine } from "@/components/PageLoader";
import { Code2, Mail, Lock, Eye, EyeOff, Phone, User, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type AuthMode = "login" | "register";
type RegisterStep = "email" | "credentials" | "done";

const AuthSkeleton = () => (
  <div className="min-h-screen flex items-center justify-center bg-background p-6">
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <SkeletonBox className="w-12 h-12 rounded-xl mx-auto mb-4" />
        <SkeletonBox className="h-7 w-48 mx-auto mb-2" />
        <SkeletonLine width="60%" className="mx-auto" />
      </div>
      <div className="card-elevated rounded-2xl p-8">
        <SkeletonBox className="h-10 w-full rounded-lg mb-4" />
        <SkeletonBox className="h-10 w-full rounded-lg mb-4" />
        <SkeletonBox className="h-10 w-full rounded-lg mb-6" />
        <SkeletonBox className="h-11 w-full rounded-lg" />
      </div>
    </div>
  </div>
);

const Auth = () => {
  const [mode, setMode] = useState<AuthMode>("login");
  const [registerStep, setRegisterStep] = useState<RegisterStep>("email");
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const navigate = useNavigate();

  const handleGoogleAuth = () => {
    // Mock: redirect to credentials page after Google OAuth
    setMode("register");
    setRegisterStep("credentials");
  };

  const handleSendOtp = () => setOtpSent(true);
  const handleVerifyOtp = () => {
    setOtpVerified(true);
    setTimeout(() => setRegisterStep("credentials"), 500);
  };
  const handleRegisterComplete = () => {
    setRegisterStep("done");
    setTimeout(() => navigate("/profile-verification"), 1500);
  };

  return (
    <PageLoader skeleton={<AuthSkeleton />} delay={500}>
      <div className="min-h-screen flex items-center justify-center bg-background p-6 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-[0.02]" />

        <div className="relative w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl accent-gradient flex items-center justify-center">
                <Code2 className="w-5 h-5 text-accent-foreground" />
              </div>
            </Link>
            <h1 className="text-2xl font-bold tracking-tight">
              {mode === "login" ? "Welcome back" : registerStep === "done" ? "You're all set!" : "Create your account"}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {mode === "login" ? "Sign in to continue to Utkal Hackathon" :
                registerStep === "email" ? "Step 1: Verify your email" :
                registerStep === "credentials" ? "Step 2: Set up your credentials" :
                "Redirecting to profile verification..."}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {/* LOGIN */}
            {mode === "login" && (
              <motion.div key="login" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
                <div className="card-elevated rounded-2xl p-8">
                  {/* Google */}
                  <Button variant="outline" className="w-full mb-4 gap-2" onClick={handleGoogleAuth}>
                    <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                    Continue with Google
                  </Button>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">or</span></div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input id="email" type="email" placeholder="you@example.com" className="pl-10" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" className="pl-10 pr-10" />
                        <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
                          {showPassword ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-muted-foreground" />}
                        </button>
                      </div>
                    </div>
                    <Button variant="hero" className="w-full gap-2" onClick={() => navigate("/dashboard")}>
                      Sign In <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-center text-sm text-muted-foreground mt-6">
                  Don't have an account?{" "}
                  <button onClick={() => { setMode("register"); setRegisterStep("email"); }} className="text-accent font-medium hover:underline">Register</button>
                </p>
              </motion.div>
            )}

            {/* REGISTER — Email OTP */}
            {mode === "register" && registerStep === "email" && (
              <motion.div key="reg-email" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
                <div className="card-elevated rounded-2xl p-8">
                  <Button variant="outline" className="w-full mb-4 gap-2" onClick={handleGoogleAuth}>
                    <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                    Continue with Google
                  </Button>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">or register with email</span></div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input type="email" placeholder="you@example.com" className="pl-10" />
                      </div>
                    </div>

                    {!otpSent ? (
                      <Button variant="hero" className="w-full" onClick={handleSendOtp}>Send OTP</Button>
                    ) : !otpVerified ? (
                      <>
                        <div className="space-y-2">
                          <Label>Enter OTP</Label>
                          <Input type="text" placeholder="123456" maxLength={6} className="text-center text-lg tracking-[0.5em] mono" />
                        </div>
                        <Button variant="hero" className="w-full" onClick={handleVerifyOtp}>Verify OTP</Button>
                        <button className="text-xs text-accent w-full text-center" onClick={handleSendOtp}>Resend OTP</button>
                      </>
                    ) : (
                      <div className="flex items-center gap-2 text-success text-sm justify-center py-2">
                        <CheckCircle2 className="w-4 h-4" /> Email verified!
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label>Phone Number (for contact only)</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input type="tel" placeholder="+91 98765 43210" className="pl-10" />
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-center text-sm text-muted-foreground mt-6">
                  Already have an account?{" "}
                  <button onClick={() => setMode("login")} className="text-accent font-medium hover:underline">Sign In</button>
                </p>
              </motion.div>
            )}

            {/* REGISTER — Credentials */}
            {mode === "register" && registerStep === "credentials" && (
              <motion.div key="reg-creds" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
                <div className="card-elevated rounded-2xl p-8">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input placeholder="John Doe" className="pl-10" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Create Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input type={showPassword ? "text" : "password"} placeholder="Min. 8 characters" className="pl-10 pr-10" />
                        <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
                          {showPassword ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-muted-foreground" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Confirm Password</Label>
                      <Input type="password" placeholder="Re-enter password" />
                    </div>
                    <Button variant="hero" className="w-full gap-2" onClick={handleRegisterComplete}>
                      Complete Registration <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <button onClick={() => setRegisterStep("email")} className="flex items-center gap-1 text-sm text-muted-foreground mt-4 mx-auto hover:text-foreground">
                  <ArrowLeft className="w-3 h-3" /> Back
                </button>
              </motion.div>
            )}

            {/* REGISTER — Done */}
            {mode === "register" && registerStep === "done" && (
              <motion.div key="reg-done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
                <div className="card-elevated rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-success" />
                  </div>
                  <h2 className="text-xl font-bold mb-2">Registration Complete!</h2>
                  <p className="text-sm text-muted-foreground">Redirecting to profile verification...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageLoader>
  );
};

export default Auth;
