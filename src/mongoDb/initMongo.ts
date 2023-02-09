import {User} from "./models/user.model.ts";
import {hashPassword} from "../helpers/password.ts";

export default async () => {
  let password = Deno.env.get("ADMIN_PASSWORD") || "admin";
  password = await hashPassword(password);

  const user = {
    username: Deno.env.get("INIT_USER") || "admin",
    email: Deno.env.get("INIT_EMAIL") || "admin@admin.com",
    password,
    roles: ["admin"],
    created_at: new Date(),
  };
  const count = await User.countDocuments();
  console.log('COUNT', count);
  if (!count) await User.insertOne(user);
}
