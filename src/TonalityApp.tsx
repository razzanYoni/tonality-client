import "./App.css";
import React from "react";
import { RenderRoutes } from "@/routes/RenderRoutes.tsx";
import { routes } from "@/routes/routes.ts";

export type UserContext =  {token: string | null, onLogin: (accessToken: string) => void, onLogout: () => void}
export const AuthContext = React.createContext<
  UserContext>(null as unknown as UserContext);

export const useAuth = () => React.useContext(AuthContext);

// @ts-expect-error error bg
export const Routes: React.ReactNode = RenderRoutes(routes);

const TonalityApp = () => {
  return (
  // @ts-expect-error error bg
      <Routes />
  );
};

export default TonalityApp;
