import { motion } from "framer-motion";
import { User, Plus, Trash2 } from "lucide-react";
import { useLearning } from "@/context/LearningContext";
import { Button } from "@/components/ui/button";

interface UserSelectionProps {
  onCreateNew: () => void;
}

export default function UserSelection({ onCreateNew }: UserSelectionProps) {
  const { appState, switchUser, deleteUser } = useLearning();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg space-y-8"
      >
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Who's learning today?
          </h1>
          <p className="text-muted-foreground">
            Select your profile to continue
          </p>
        </div>

        <div className="grid gap-4">
          {appState.users.map((user) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-4 flex items-center justify-between group cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all"
              onClick={() => switchUser(user.id)}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
                  <User className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <div className="font-semibold text-foreground text-lg">
                    {user.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {user.skills.length} skills • Level{" "}
                    {Math.floor(user.totalXP / 100) + 1}
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                aria-label={`Delete profile for ${user.name}`}
                onClick={(e) => {
                  e.stopPropagation();
                  deleteUser(user.id);
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="w-5 h-5" />
              </Button>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-4 flex items-center gap-4 cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all border-dashed"
            onClick={onCreateNew}
          >
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center border-2 border-dashed border-border">
              <Plus className="w-6 h-6 text-muted-foreground" />
            </div>
            <div className="font-medium text-foreground">
              Create New Profile
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
