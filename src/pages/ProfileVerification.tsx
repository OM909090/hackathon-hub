import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardSidebar";
import { ScrollReveal } from "@/components/ScrollReveal";
import { PageLoader, SkeletonBox, SkeletonLine } from "@/components/PageLoader";
import { Button } from "@/components/ui/button";
import { Upload, CheckCircle2, Camera, CreditCard, Shield, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const ProfileVerificationSkeleton = () => (
  <div className="max-w-2xl mx-auto">
    <SkeletonBox className="h-8 w-56 mb-2" />
    <SkeletonLine width="300px" className="mb-8" />
    <div className="space-y-6">
      <div className="card-elevated rounded-xl p-6">
        <SkeletonBox className="h-5 w-40 mb-4" />
        <SkeletonBox className="h-40 w-full rounded-xl" />
      </div>
      <div className="card-elevated rounded-xl p-6">
        <SkeletonBox className="h-5 w-40 mb-4" />
        <SkeletonBox className="h-40 w-full rounded-xl" />
      </div>
      <SkeletonBox className="h-11 w-full rounded-lg" />
    </div>
  </div>
);

const ProfileVerification = () => {
  const navigate = useNavigate();
  const [passportPhoto, setPassportPhoto] = useState<string | null>(null);
  const [studentId, setStudentId] = useState<string | null>(null);
  const [verified, setVerified] = useState(false);

  const handleFileUpload = (setter: (val: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setter(URL.createObjectURL(file));
  };

  const handleVerify = () => {
    setVerified(true);
    setTimeout(() => navigate("/dashboard"), 2000);
  };

  const bothUploaded = passportPhoto && studentId;

  return (
    <DashboardLayout>
      <PageLoader skeleton={<ProfileVerificationSkeleton />}>
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
                <Shield className="w-7 h-7 text-accent" /> Profile Verification
              </h1>
              <p className="text-muted-foreground text-sm mt-1">Upload required documents to unlock all platform features</p>
            </div>
          </ScrollReveal>

          {/* Status */}
          <ScrollReveal>
            <div className="card-elevated rounded-xl p-4 mb-6 flex items-center gap-3">
              {verified ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-success" />
                  <div>
                    <div className="text-sm font-medium text-success">Profile Verified</div>
                    <div className="text-xs text-muted-foreground">All platform features are unlocked</div>
                  </div>
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5 text-warning" />
                  <div>
                    <div className="text-sm font-medium text-warning">Verification Required</div>
                    <div className="text-xs text-muted-foreground">Upload passport photo and student ID to continue</div>
                  </div>
                </>
              )}
            </div>
          </ScrollReveal>

          {!verified ? (
            <div className="space-y-6">
              {/* Passport Photo */}
              <ScrollReveal>
                <div className="card-elevated rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Camera className="w-5 h-5 text-accent" />
                    <h2 className="font-semibold">Passport Size Photo</h2>
                    {passportPhoto && <CheckCircle2 className="w-4 h-4 text-success ml-auto" />}
                  </div>
                  {passportPhoto ? (
                    <div className="flex items-center gap-4">
                      <img src={passportPhoto} alt="Passport" className="w-28 h-36 rounded-lg object-cover border border-border" />
                      <div>
                        <p className="text-sm text-success font-medium">Photo uploaded</p>
                        <button
                          onClick={() => setPassportPhoto(null)}
                          className="text-xs text-muted-foreground hover:text-foreground mt-1"
                        >
                          Replace
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-accent/50 hover:bg-accent/5 transition-all">
                      <Upload className="w-8 h-8 text-muted-foreground" />
                      <div className="text-center">
                        <p className="text-sm font-medium">Drop file or click to upload</p>
                        <p className="text-xs text-muted-foreground mt-1">JPG, PNG — Max 5MB</p>
                      </div>
                      <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload(setPassportPhoto)} />
                    </label>
                  )}
                </div>
              </ScrollReveal>

              {/* Student ID */}
              <ScrollReveal delay={0.1}>
                <div className="card-elevated rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <CreditCard className="w-5 h-5 text-accent" />
                    <h2 className="font-semibold">Student ID Card</h2>
                    {studentId && <CheckCircle2 className="w-4 h-4 text-success ml-auto" />}
                  </div>
                  {studentId ? (
                    <div className="flex items-center gap-4">
                      <img src={studentId} alt="Student ID" className="w-48 h-28 rounded-lg object-cover border border-border" />
                      <div>
                        <p className="text-sm text-success font-medium">ID uploaded</p>
                        <button
                          onClick={() => setStudentId(null)}
                          className="text-xs text-muted-foreground hover:text-foreground mt-1"
                        >
                          Replace
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-accent/50 hover:bg-accent/5 transition-all">
                      <Upload className="w-8 h-8 text-muted-foreground" />
                      <div className="text-center">
                        <p className="text-sm font-medium">Drop file or click to upload</p>
                        <p className="text-xs text-muted-foreground mt-1">JPG, PNG, PDF — Max 10MB</p>
                      </div>
                      <input type="file" accept="image/*,.pdf" className="hidden" onChange={handleFileUpload(setStudentId)} />
                    </label>
                  )}
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <Button
                  variant="hero"
                  className="w-full"
                  disabled={!bothUploaded}
                  onClick={handleVerify}
                >
                  {bothUploaded ? "Verify Profile" : "Upload both documents to continue"}
                </Button>
              </ScrollReveal>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <div className="card-elevated rounded-2xl p-12 text-center">
                <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-success" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Profile Verified!</h2>
                <p className="text-muted-foreground">All platform features are now unlocked. Redirecting to dashboard...</p>
              </div>
            </motion.div>
          )}
        </div>
      </PageLoader>
    </DashboardLayout>
  );
};

export default ProfileVerification;
