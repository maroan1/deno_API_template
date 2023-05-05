import { MongoClient } from "../../deps.ts";

const getDb = async (client: MongoClient) => {
  await client.connect(
    Deno.env.get("MONGODB_URI") || "mongodb://root:root@127.0.0.1:27017",
  );

  return client.database(Deno.env.get("DATABASE_NAME") || "deno-api");
};

class MongoDb {
  readonly client: MongoClient;

  constructor() {
    this.client = new MongoClient();
  }

  public async getDatabase() {
    return await getDb(this.client);
  }
}

export default new MongoDb();
