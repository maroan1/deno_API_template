import UserRepository from "./user.repository.ts";
import { User } from "../../ts/types/user.types.ts";
import { ObjectId } from "https://deno.land/x/web_bson@v0.2.5/src/objectid.ts";
import { UserUpdate } from "../../ts/interfaces/user.interfaces.ts";
import { hashPassword } from "../../helpers/password.ts";

const createUser = async (user: User) => {
  const hashedPassword = await hashPassword(user.password);

  const userWithRoles = {
    ...user,
    password: hashedPassword,
    roles: ["user"],
  };

  return await UserRepository.createUser(userWithRoles);
};

const updateUser = async (
  id: (string | ObjectId) & (string | number),
  user: UserUpdate,
) => {
  return await UserRepository.updateUser(id, user);
};

export default {
  createUser,
  updateUser,
};
