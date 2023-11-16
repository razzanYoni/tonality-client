import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/TonalityApp.tsx";

const ProtectedRoute = ({ isPublic }) => {
  const isValidUser: boolean = useAuth().token === null;
  return isValidUser || isPublic ? <Outlet /> : <Navigate to="/login" />;
};

const ProtectedRoute = ({ isPublic, isAuthorized }) => {
  return isPublic || isAuthorized ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
