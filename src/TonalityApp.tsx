import "./App.css";
import React from "react";
import { RenderRoutes } from "@/routes/RenderRoutes.tsx";
import { routes } from "@/routes/routes.ts";


// @ts-expect-error error bg
export const Routes: React.ReactNode = RenderRoutes(routes);

const TonalityApp = () => {
  return (
  // @ts-expect-error error bg
      <Routes />
  );
};

export default TonalityApp;
