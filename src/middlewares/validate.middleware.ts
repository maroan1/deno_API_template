import { helpers, RouterContext, z } from "../../deps.ts";

const validate =
  (schema: z.AnyZodObject) =>
  async (ctx: RouterContext<string>, next: () => unknown): Promise<void> => {
    try {
      schema.parse({
        params: ctx.params,
        query: helpers.getQuery(ctx),
        body: await ctx.request.body().value,
      });

      await next();
    } catch (err) {
      if (err instanceof z.ZodError) {
        ctx.response.status = 400;
        ctx.response.body = {
          message: err.message,
          errors: err.errors,
        };
        return;
      }
      await next();
    }
  };

export default validate;
