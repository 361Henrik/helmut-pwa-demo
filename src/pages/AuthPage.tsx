import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export default function AuthPage() {
  const navigate = useNavigate();
  const { signUp, signIn } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = isSignUp
      ? await signUp(email, password)
      : await signIn(email, password);

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    if (isSignUp) {
      toast.success("Account created — you're signed in!");
    }
    navigate("/map", { replace: true });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background px-6 pt-safe-top">
      <button
        onClick={() => navigate(-1)}
        className="mt-3 flex h-10 w-10 items-center justify-center rounded-full bg-card"
        aria-label="Go back"
      >
        <ArrowLeft className="h-5 w-5 text-foreground" />
      </button>

      <motion.div
        className="mt-12 flex flex-1 flex-col"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="font-display text-3xl font-medium text-foreground">
          {isSignUp ? "Create Account" : "Welcome Back"}
        </h1>
        <p className="mt-2 text-body text-muted-foreground">
          {isSignUp
            ? "Sign up to save stories to your personal journey"
            : "Sign in to access your saved stories"}
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 pr-10"
              required
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading
              ? "Please wait…"
              : isSignUp
              ? "Create Account"
              : "Sign In"}
          </Button>
        </form>

        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="mt-6 text-center text-body-small text-muted-foreground"
        >
          {isSignUp ? (
            <>Already have an account? <span className="text-primary font-medium">Sign in</span></>
          ) : (
            <>Don't have an account? <span className="text-primary font-medium">Sign up</span></>
          )}
        </button>
      </motion.div>
    </div>
  );
}
