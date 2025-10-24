export const extractPathParams = (
  routePattern: string,
  actualPath: string
): Record<string, string> => {
  const params: Record<string, string> = {};
  const patternParts = routePattern.split("/");
  const pathParts = actualPath.split("/");

  for (const [index, part] of patternParts.entries()) {
    if (part.startsWith(":")) {
      const paramName = part.slice(1);
      params[paramName] = pathParts[index];
    }
  }

  return params;
};
