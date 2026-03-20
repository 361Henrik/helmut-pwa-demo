import { createContext, useContext, useState, type ReactNode } from "react";
import type { User, Session } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/** Demo user — bypasses real auth for presentation purposes */
const DEMO_USER = {
  id: "demo-user-00000000-0000-0000-0000-000000000001",
  email: "guest@curatedlens.app",
  app_metadata: {},
  user_metadata: { full_name: "Demo Guest" },
  aud: "authenticated",
  created_at: new Date().toISOString(),
} as unknown as User;

const DEMO_SESSION = {
  access_token: "demo-token",
  refresh_token: "demo-refresh",
  user: DEMO_USER,
  expires_at: Math.floor(Date.now() / 1000) + 86400,
} as unknown as Session;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user] = useState<User | null>(DEMO_USER);
  const [session] = useState<Session | null>(DEMO_SESSION);
  const [loading] = useState(false);

  const signUp = async (_email: string, _password: string) => {
    return { error: null };
  };

  const signIn = async (_email: string, _password: string) => {
    return { error: null };
  };

  const signOut = async () => {
    // no-op in demo mode
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
