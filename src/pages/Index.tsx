import { useState } from "react";
import { useLearning, LearningProvider } from "@/context/LearningContext";
import { useAuth } from "@/hooks/useAuth";
import Onboarding from "@/components/Onboarding";
import AppLayout from "@/components/AppLayout";
import { Navigate } from "react-router-dom";
import { Loader2, Brain } from "lucide-react";

function BrandedLoader() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center glow-primary">
        <Brain className="w-7 h-7 text-primary-foreground" />
      </div>
      <Loader2 className="w-6 h-6 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground">Loading your learning space...</p>
    </div>
  );
}

function IndexContent() {
  const { isOnboarded, loading } = useLearning();

  if (loading) return <BrandedLoader />;
  return isOnboarded ? <AppLayout /> : <Onboarding />;
}

export default function Index() {
  const { user, isReady } = useAuth();

  if (!isReady) {
    return (
      <div className="dark min-h-screen bg-background text-foreground">
        <BrandedLoader />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <LearningProvider userId={user.id}>
      <div className="dark min-h-screen bg-background text-foreground">
        <IndexContent />
      </div>
    </LearningProvider>
  );
}
