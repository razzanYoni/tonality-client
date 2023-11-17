import "./App.css";
import React from "react";
import { RenderRoutes } from "@/routes/RenderRoutes.tsx";
import { routes } from "@/routes/routes.ts";
import AuthProvider from "@/context/AuthProvider.tsx";

export const AuthContext = React.createContext(null);

export const useAuth = () => React.useContext(AuthContext);

const RoutesComponent = () => {
  return RenderRoutes(routes);
};

const TonalityApp = () => {
  return (
    <AuthProvider>
      <RoutesComponent />
    </AuthProvider>
  );
};
export default TonalityApp;
