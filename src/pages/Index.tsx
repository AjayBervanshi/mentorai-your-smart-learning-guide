import { useLearning, LearningProvider } from "@/context/LearningContext";
import Onboarding from "@/components/Onboarding";
import AppLayout from "@/components/AppLayout";

function IndexContent() {
  const { isOnboarded } = useLearning();
  return isOnboarded ? <AppLayout /> : <Onboarding />;
}

export default function Index() {
  return (
    <LearningProvider>
      <div className="dark min-h-screen bg-background text-foreground">
        <IndexContent />
      </div>
    </LearningProvider>
  );
}
