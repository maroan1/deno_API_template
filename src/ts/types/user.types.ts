import { ObjectId } from "../../../deps.ts";

export type User = {
  _id?: ObjectId;
  id?: number;
  username: string;
  password: string;
  email: string;
  created_at?: Date;
  updated_at?: Date;
};
