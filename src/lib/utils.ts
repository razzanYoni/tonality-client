import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import flattenDeep from "lodash.flattendeep";
import React from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Route {
  name: string;
  title: string;
  hasSiderLink?: boolean;
  routes?: Route[];
  component?: React.ComponentType<any>;
  path?: string;
  isPublic?: boolean;
}

export const generateFlattenRoutes = (routes: Route[] | undefined): Route[] => {
  if (!routes) return [];
  return flattenDeep(
    routes.map(({ routes: subRoutes, ...rest }) => [
      rest,
      generateFlattenRoutes(subRoutes),
    ]),
  );
};
