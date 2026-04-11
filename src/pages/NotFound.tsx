import { useLocation, Link } from "react-router-dom";
import { Brain, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="dark min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-sm">
        <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto opacity-50">
          <Brain className="w-8 h-8 text-primary-foreground" />
        </div>
        <div className="space-y-2">
          <h1 className="text-5xl font-bold text-foreground">404</h1>
          <p className="text-lg text-muted-foreground">Page not found</p>
          <p className="text-sm text-muted-foreground">
            The page <code className="text-xs bg-secondary px-1.5 py-0.5 rounded">{location.pathname}</code> doesn't exist.
          </p>
        </div>
        <Link to="/">
          <Button className="gradient-primary text-primary-foreground gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to MentorAI
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
