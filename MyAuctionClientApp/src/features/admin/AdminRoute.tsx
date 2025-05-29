import { Navigate } from "react-router-dom";
import { getUserFromToken } from "../../utils/auth";

export default function AdminRoute({ children }: { children: JSX.Element }) {
  const user = getUserFromToken();

  if (!user || user.role !== "Administrator") {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
