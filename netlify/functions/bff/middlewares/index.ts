import { RouteHandler, Middleware } from "../types/routes.types";

export const applyMiddlewares = (
  ...middlewares: Middleware[]
): RouteHandler => {
  return middlewares.reduceRight<RouteHandler>(
    (next, middleware) => {
      return async (event, context) => {
        return middleware(next)(event, context);
      };
    },
    async () => {
      const err: Error & { status?: number } = new Error("No handler found");
      err.status = 404;
      throw err;
    }
  );
};
