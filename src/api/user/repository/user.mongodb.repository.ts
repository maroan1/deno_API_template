import UserCollection from "../../../mongoDb/models/user.model.ts";
import {
  UserUpdate,
  UserWithRoles,
} from "../../../ts/interfaces/user.interfaces.ts";
import { ObjectId } from "../../../../deps.ts";
import { toObjectId } from "../../../helpers/mongo.helper.ts";

const UserDB = await UserCollection.getCollection();

const getUser = async (username: string) => {
  return await UserDB.findOne({
    username,
  });
};

const getUserById = async (id: string | ObjectId) => {
  return await UserDB.findOne({
    _id: toObjectId(id),
  });
};

const createUser = async (user: UserWithRoles) => {
  return await UserDB.insertOne(user);
};

const updateUser = async (id: string | ObjectId, user: UserUpdate) => {
  return await UserDB.updateOne({ _id: toObjectId(id) }, {
    $set: { ...user } as Partial<UserWithRoles>,
  });
};

const deleteUser = async (id: string | ObjectId) => {
  return await UserDB.deleteOne({ _id: toObjectId(id) });
};

const getUsers = () => {
  return UserDB.find();
};

const getUserByEmail = async (email: string) => {
  return await UserDB.findOne({
    email,
  });
};

export default {
  getUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  getUserByEmail,
};
