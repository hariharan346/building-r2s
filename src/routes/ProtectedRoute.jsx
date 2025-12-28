import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute = ({ role }) => {
  const { user, loading } = useAuth();

  // ⏳ WAIT until auth finishes loading
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // 🔐 NOT LOGGED IN
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  // 🔒 ROLE CHECK
  if (role && user.type !== role) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
