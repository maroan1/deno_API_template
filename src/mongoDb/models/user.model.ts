import MongoDB from "../mongo.db.ts";
import { Database } from "../../../deps.ts";
import { UserWithRoles } from "../../ts/interfaces/user.interfaces.ts";

class UserCollection {
  constructor() {
  }

  private async getDatabase(): Promise<Database> {
    return await MongoDB.getDatabase();
  }

  public async getCollection() {
    const db = await this.getDatabase();
    const User = db.collection<UserWithRoles>("users");
    await User.createIndexes({
      indexes: [
        { name: "unique_username", key: { username: 1 }, unique: true },
        { name: "unique_email", key: { email: 1 }, unique: true },
      ],
    });
    return User;
  }
}

export default new UserCollection();
