import { Middleware } from "../types/routes.types";
import { findMatchingRoute } from "../utils/route.utils";
import { ROUTES } from "../constants/routes.constants";

export const routeMiddleware: Middleware = () => {
  return async (event, context) => {
    const path = event.path.replace("/.netlify/functions/bff", "");
    const routeMatch = findMatchingRoute(path);

    if (!routeMatch) {
      const error = new Error("Route not found");
      (error as any).status = 404;
      throw error;
    }

    const method = event.httpMethod as keyof (typeof ROUTES)[string];
    const handlerFn = ROUTES[routeMatch.route]?.[method];

    if (!handlerFn) {
      const error = new Error("Method not allowed");
      (error as any).status = 405;
      throw error;
    }

    Object.assign(event, {
      pathParameters: {
        ...routeMatch.params,
      },
    });

    return handlerFn(event, context);
  };
};
