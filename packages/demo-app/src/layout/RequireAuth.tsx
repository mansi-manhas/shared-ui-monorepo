import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../state/SessionContext";

export function RequireAuth() {
  const { user } = useSession();

  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
}
