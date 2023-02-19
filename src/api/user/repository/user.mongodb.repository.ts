import {User} from "../../../mongoDb/models/user.model.ts";
import {UserWithRoles} from "../../../ts/interfaces/user.interfaces.ts";
import {ObjectId} from "../../../../deps.ts";
import {toObjectId} from "../../../helpers/mongo.helper.ts";

const getUser = async (username: string) => {
  return await User.findOne({
    username,
  });
};

const getUserById = async (id: string | ObjectId) => {
  return await User.findOne({
    _id: toObjectId(id),
  });
};

const createUser = async (user: UserWithRoles) => {
  return await User.insertOne(user);
};

const updateUser = async (id: string | ObjectId, user: UserWithRoles) => {
  return await User.updateOne({_id: toObjectId(id)}, {$set: {...user}},);
};

const deleteUser = async (id: string | ObjectId) => {
  return await User.deleteOne({_id: toObjectId(id)});
}

const getUsers = () => {
  return User.find();
};

const getUserByEmail = async (email: string) => {
  return await User.findOne({
    email,
  });
}

export default {
    getUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getUsers,
    getUserByEmail,
}
