import { useState } from "react";
import { useLearning, LearningProvider } from "@/context/LearningContext";
import Onboarding from "@/components/Onboarding";
import AppLayout from "@/components/AppLayout";
import UserSelection from "@/components/UserSelection";

function IndexContent() {
  const { appState, profile, isOnboarded } = useLearning();
  const [creatingNew, setCreatingNew] = useState(false);

  // No users at all -> Force Onboarding
  if (appState.users.length === 0) {
    return <Onboarding />;
  }

  // Active profile exists and not explicitly creating a new one -> Show app
  if (profile && !creatingNew) {
    return <AppLayout onSwitchUser={() => {
      setCreatingNew(false);
    }} />;
  }

  // Creating new profile -> Show Onboarding
  if (creatingNew) {
    return <Onboarding />;
  }

  // Profiles exist but none selected -> Show UserSelection
  return <UserSelection onCreateNew={() => setCreatingNew(true)} />;
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
