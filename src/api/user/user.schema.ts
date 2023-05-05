import { z } from "../../../deps.ts";

export const createUser = z.object({
  body: z.object({
    username: z.string(),
    password: z.string(),
    email: z.string(),
  }),
});

export const updateUser = z.object({
  params: z.object({
    id: z.coerce.number(),
  }),
  body: z.object({
    username: z.string(),
    password: z.string(),
    email: z.string(),
  }),
});
