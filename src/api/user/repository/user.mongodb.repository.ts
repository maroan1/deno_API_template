import {User} from "../../../mongoDb/models/user.model.ts";
import {UserWithRoles} from "../../../ts/interfaces/user.interfaces.ts";
import {ObjectId} from "../../../../deps.ts";
import {toObjectId} from "../../../helpers/mongo.helper.ts";

export const getUser = async (username: string) => {
  return await User.findOne({
    username,
  });
};

export const getUserById = async (id: string | ObjectId) => {
  return await User.findOne({
    _id: toObjectId(id),
  });
};

export const createUser = async (user: UserWithRoles) => {
  return await User.insertOne(user);
};

export const updateUser = async (id: string | ObjectId, user: UserWithRoles) => {
  return await User.updateOne({_id: toObjectId(id)}, {$set: {...user}},);
};

export const deleteUser = async (id: string | ObjectId) => {
  return await User.deleteOne({_id: toObjectId(id)});
}

export const getUsers = () => {
  return User.find();
};

export const getUserByEmail = async (email: string) => {
  return await User.findOne({
    email,
  });
}
