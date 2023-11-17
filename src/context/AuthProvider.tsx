import React from "react";
import { AuthContext } from "@/TonalityApp.tsx";
import {Outlet, useNavigate} from "react-router-dom";

const AuthProvider = () => {
  const navigate = useNavigate();

  const [accessToken, setAccessToken] =
    React.useState<string | null>(sessionStorage.getItem("accessToken") ?? null);

  const handleLogin = (accessToken: string) => {
    sessionStorage.setItem("accessToken", accessToken);
    setAccessToken(accessToken);
    navigate("/album");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    setAccessToken(null);
    navigate("/login", );
  };

  const value = {
    token: accessToken,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>
    <Outlet />
  </AuthContext.Provider>;
};

export default AuthProvider;
