import {Navigate, Outlet, } from "react-router-dom";
import { useAuth } from "@/context/auth-context.tsx";
import {StatusCodes} from "http-status-codes";
import api from "@/api/api.ts";


const ProtectedRoute = ({ isPublic }: {isPublic: boolean}) => {
  const { token, onLogout } = useAuth();

  api.post("/verify-token",).then((response) => {
    if (response.status !== StatusCodes.OK) {
      onLogout();
    }
  });

  const isValidUser: boolean = token !== null;
  return isValidUser || isPublic ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
