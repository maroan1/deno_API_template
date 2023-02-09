import { Context, State, Status } from "../../deps.ts";
import type { Err } from "../ts/interfaces/error.interfaces.ts";

/**
 * Throws Error with provided params
 * @param {Err} options
 * @throws Error Throws Error
 */
export const throwError = (options: Err): Error => {
  throw options;
};

/**
 * Error Handler Middleware function
 * @param {Context} ctx
 * @param next
 * @returns {Promise<void>}
 */
export const errorHandler = async (
  ctx: Context<State, Record<string, unknown>>,
  next: () => Promise<unknown>,
): Promise<void> => {
  try {
    await next();
  } catch (err) {
    const { message, name, path, type } = err;
    const status = err.status || err.statusCode || Status.InternalServerError;

    ctx.response.status = status;
    ctx.response.body = { message, name, path, type, status };
  }
};
