import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "@/routes/ProtectedRoute.tsx";
import { generateFlattenRoutes } from "@/lib/utils.ts";

export const RenderRoutes: React.FC = (mainRoutes) => {
  return ({ isAuthorized }) => {
    const layouts = mainRoutes.map(({ layout: Layout, routes }, index) => {
      const subRoutes = generateFlattenRoutes(routes);

      return (
        <Route key={index} element={<Layout />}>
          {subRoutes.map(
            ({ component: Component, path, name, isPublic }, index) => {
              const isPublics: boolean =
                typeof isPublic === "boolean" ? isPublic : false;
              const componentFound = Component !== undefined;
              if (!componentFound) return null;

              return (
                <Route
                  key={index}
                  element={
                    <ProtectedRoute
                      isPublic={isPublics}
                      isAuthorized={isAuthorized}
                    />
                  }
                >
                  ) && Component && path && (
                  <Route key={name} element={<Component />} path={path} />) && (
                </Route>
              );
            },
          )}
        </Route>
      );
    });
    return (
      <Routes>
        <>{layouts}</>
      </Routes>
    );
  };
};
