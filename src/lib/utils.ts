import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import flattenDeep from "lodash.flattendeep";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generateFlattenRoutes = (routes) => {
  if (!routes) return [];
  return flattenDeep(routes.map(({ routes: subRoutes, ...rest }) => [rest, generateFlattenRoutes(subRoutes)]));
};

