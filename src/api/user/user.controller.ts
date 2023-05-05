import userService from "./user.service.ts";
import { Context, RouterContext, Status } from "../../../deps.ts";

const createUser = async ({ request, response }: Context) => {
  // Get the user from the request body
  const {
    username,
    password,
    email,
  } = await request.body().value;

  // Create the user in the database
  const id = await userService.createUser({ username, password, email });

  // Return the created user
  response.status = Status.Created;
  response.body = {
    message: "User created successfully",
    id,
  };
};

const updateUser = async (
  // deno-lint-ignore no-explicit-any
  { request, response, params }: RouterContext<any>,
) => {
  const { id } = params;
  const { username, email } = await request.body().value;

  const updateId = await userService.updateUser(id, { username, email });

  response.status = Status.OK;
  response.body = {
    message: "User updated successfully",
    id: updateId,
  };
};

export default {
  createUser,
  updateUser,
};
