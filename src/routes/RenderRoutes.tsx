import React from 'react';
import {Route, Routes} from 'react-router-dom';
import ProtectedRoute from "@/routes/ProtectedRoute.tsx";
import {generateFlattenRoutes} from "@/lib/utils.ts";
export const RenderRoutes  : React.FC = (mainRoutes) => {
  return ({isAuthorized}) => {
    const layouts = mainRoutes.map(({layout: Layout, routes}, index) => {
      const subRoutes = generateFlattenRoutes(routes);

      return (
        <Route key={index} element={<Layout/>}>
          <Route element={<ProtectedRoute isAuthorized={isAuthorized}/>}>
            {subRoutes.map(({component: Component, path, name}) => {
              return (
                Component
                && path
                && (<Route key={name} element={<Component/>} path={path}/>)
              )
            })}
          </Route>
        </Route>
      )
    });
    return (
      <Routes>
        <>
        {layouts}
        </>
      </Routes>
    );
  };
}
