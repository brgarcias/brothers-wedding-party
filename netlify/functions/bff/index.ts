import { Handler } from "@netlify/functions";
import { applyMiddlewares } from "./middlewares";
import { routeMiddleware } from "./middlewares/route.middleware";
import { errorMiddleware } from "./middlewares/error.middleware";

const composedHandler = applyMiddlewares(errorMiddleware, routeMiddleware);

export const handler: Handler = async (event, context) => {
  return composedHandler(event, context);
};
