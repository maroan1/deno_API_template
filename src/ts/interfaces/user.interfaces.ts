import {User} from "../types/user.types.ts";
import {ObjectId} from "../../../deps.ts";

export interface UserWithRoles extends User {
  roles: string[];
}

export interface UserUpdate {
  _id?: { $oid: string } | ObjectId;
  username?: string;
  password?: string;
  email?: string;
  created_at?: Date;
  updated_at?: Date;
  roles?: string[];
}
