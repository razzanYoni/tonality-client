import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "@/routes/ProtectedRoute.tsx";
import { generateFlattenRoutes } from "@/lib/utils.ts";
import {RouteWithLayout} from "@/routes/routes.ts";
import AuthProvider from "@/context/AuthProvider.tsx";

export const RenderRoutes = (mainRoutes: RouteWithLayout[]) => {
  return () => {
    const layouts = mainRoutes.map(({ layout: Layout, routes }, index) => {
      const subRoutes = generateFlattenRoutes(routes);

      return (
        <Route key={index} element={<Layout />}>
          {subRoutes.map(
            // @ts-expect-error error bg
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
        <Route element={<AuthProvider />}>
        {layouts}
        </Route>
      </Routes>
    );
  };
};
