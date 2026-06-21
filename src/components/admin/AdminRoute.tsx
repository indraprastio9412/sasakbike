import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { isAdminLoggedIn } from "@/lib/admin-auth";

const AdminRoute = ({ children }: { children: ReactNode }) => {
  if (!isAdminLoggedIn()) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
};

export default AdminRoute;
