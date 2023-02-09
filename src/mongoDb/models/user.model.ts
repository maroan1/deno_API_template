import db from "../mongo.db.ts";
import {UserWithRoles} from "../../ts/interfaces/user.interfaces.ts";

export const User = db.collection<UserWithRoles>("users");
await User.createIndexes({
  indexes: [
    {name: 'unique_username', key: {username: 1}, unique: true},
    {name: 'unique_email', key: {email: 1}, unique: true},
  ]
});
