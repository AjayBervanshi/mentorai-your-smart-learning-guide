import { useLearning, LearningProvider } from "@/context/LearningContext";
import { useAuth } from "@/hooks/useAuth";
import Onboarding from "@/components/Onboarding";
import AppLayout from "@/components/AppLayout";
import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

function IndexContent() {
  const { isOnboarded, loading } = useLearning();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return isOnboarded ? <AppLayout /> : <Onboarding />;
}

export default function Index() {
  const { user, isReady } = useAuth();

  if (!isReady) {
    return (
      <div className="dark min-h-screen bg-background text-foreground flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
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
