import { Pool, QueryArguments } from "../../deps.ts";

const pool = new Pool(
  Deno.env.get("POSTGRES_URI") ||
    "postgres://root:root@localhost:5432/postgres",
  10,
  true,
);

async function runQuery<T>(query: string, args?: QueryArguments) {
  const client = await pool.connect();
  let result;

  try {
    result = await client.queryObject<T>(query, args);
    result = result.rows;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    client.release();
  }
  return result;
}

export { pool, runQuery };
