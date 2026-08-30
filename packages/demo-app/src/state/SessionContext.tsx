import * as React from "react";
import type { UserProfile } from "@my-org/user-profile-ui";
import { mockUser } from "../data/mockUser";

interface SessionState {
  user: UserProfile | null;
  login: (email: string) => void;
  logout: () => void;
}

const SessionContext = React.createContext<SessionState | undefined>(undefined);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<UserProfile | null>(null);

  const login = React.useCallback((email: string) => {
    setUser({ ...mockUser, email });
  }, []);

  const logout = React.useCallback(() => setUser(null), []);

  const value = React.useMemo(() => ({ user, login, logout }), [user, login, logout]);

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession(): SessionState {
  const context = React.useContext(SessionContext);
  if (!context) throw new Error("useSession must be used within a SessionProvider");
  return context;
}
