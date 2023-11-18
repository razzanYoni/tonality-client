import React from "react";
import {Outlet, useNavigate} from "react-router-dom";
import api from "@/api/api.ts";

export type UserContext =  {
  token: string | null,
  username: string | null,
  onLogin: (accessToken: string, username: string) => void,
  onLogout: () => void,
}

export const AuthContext = React.createContext<
  UserContext>(null as unknown as UserContext);

export const useAuth = () => React.useContext(AuthContext);


const AuthProvider = () => {
  const navigate = useNavigate();

  const [accessToken, setAccessToken] =
    React.useState<string | null>(sessionStorage.getItem("accessToken") ?? null);

  const [username, setUsername] =
    React.useState<string | null>(sessionStorage.getItem("username") ?? null);

  const handleLogin = (accessToken: string, username: string) => {
    sessionStorage.setItem("accessToken", accessToken);
    sessionStorage.setItem("username", username);
    setAccessToken(accessToken);
    setUsername(username);
    api.interceptors.request.use(
      (config) => {
        config.headers["Authorization"] = "Bearer " + accessToken;
        return config;
      },
      (error) => {
        Promise.reject(error).then(r => console.log(r));
      }
    )
  };

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    setAccessToken(null);
    setUsername(null);
    navigate("/login", );
  };

  const value = {
    token: accessToken,
    username: username,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>
    <Outlet />
  </AuthContext.Provider>;
};

export default AuthProvider;
