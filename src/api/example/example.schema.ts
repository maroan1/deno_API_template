import { z } from "../../../deps.ts";

export const sum = z.object({
  query: z.object({
    a: z.coerce.number(),
    b: z.coerce.number(),
  }),
});

export const sumPost = z.object({
  body: z.object({
    a: z.number(),
    b: z.number(),
  }),
});
