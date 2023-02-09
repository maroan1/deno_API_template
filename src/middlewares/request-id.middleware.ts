import {Context, generate, State} from "../../deps.ts";

/**
 * requestId middleware
 * attaches a unique id to each request
 */
const requestIdMiddleware = async (
  ctx: Context<State, Record<string, unknown>>,
  next: () => Promise<unknown>,
): Promise<void> => {
  let requestId = ctx.request.headers.get("X-Request-Id");
  if (!requestId) {
    const uuid = generate();
    if (uuid && typeof uuid === "string") {
      requestId = uuid;
    } else {
      requestId = "unknown";
    }
  }
  await next();
  ctx.response.headers.set("X-Request-Id", requestId);
};

export {requestIdMiddleware};
