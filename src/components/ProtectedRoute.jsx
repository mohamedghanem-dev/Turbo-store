import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loader from "../components/Loader";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Loading state (مهم جدًا)
  if (loading) {
    return <Loader fullPage />;
  }

  // لو مش مسجل
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;