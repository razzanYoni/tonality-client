import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "@/routes/ProtectedRoute.tsx";
import { generateFlattenRoutes } from "@/lib/utils.ts";

export const RenderRoutes: React.FC = (mainRoutes) => {
  return ({ isAuthorized }) => {
    const layouts = mainRoutes.map(({ layout: Layout, routes }, index) => {
      const subRoutes = generateFlattenRoutes(routes);

      subRoutes.map(({ component: Component, path, name }) => {
        console.log("component", Component);
        console.log("path", path);
        console.log("name", name);
      });

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
    console.log("layouts", layouts);
    return (
      <Routes>
        <>{layouts}</>
      </Routes>
    );
  };
};
