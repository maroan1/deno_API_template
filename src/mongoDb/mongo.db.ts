import { MongoClient } from "../../deps.ts";

const client = new MongoClient();

await client.connect(Deno.env.get("MONGODB_URI") || "mongodb://root:root@127.0.0.1:27017");

const db = client.database(Deno.env.get("DATABASE_NAME") || "deno-api");

export default db;
