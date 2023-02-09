import { pool } from "./postgres.db.ts";
import {hashPassword} from "../helpers/password.ts";
// import {getUser} from "../api/user/repository/user.postgres.repository.ts";

const init = async () => {
  const client = await pool.connect();
  const transaction = await client.createTransaction('init');
  const username = Deno.env.get("INIT_USER") || "admin";
  const email = Deno.env.get("INIT_EMAIL") || "admin@admin.com";
  let password = Deno.env.get("INIT_PASSWORD") || "admin";
  password = await hashPassword(password);

  const query1 = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) NOT NULL UNIQUE,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    CREATE OR REPLACE FUNCTION update_timestamp() RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
    END;
    $$ language plpgsql;
    CREATE OR REPLACE TRIGGER update_users_timestamp
    BEFORE UPDATE ON users 
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();
  `;

  const query2 = `
      INSERT INTO users (username, email, password)
        SELECT *
        FROM (SELECT '${username}', '${email}', '${password}')t
        WHERE NOT EXISTS (SELECT 1 FROM users);
  `;

  const query3 = `
    CREATE TABLE IF NOT EXISTS roles (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE
    );
  `;

  const query4 = `
    INSERT INTO roles (name)
      SELECT *
      FROM (SELECT 'admin')t
      WHERE NOT EXISTS (SELECT 1 FROM roles);
  `;

  const query5 = `
    CREATE TABLE IF NOT EXISTS users_roles (
      id SERIAL PRIMARY KEY,
      user_id INT NOT NULL,
      role_id INT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
    );
  `;

  const query6 = `
    INSERT INTO users_roles (user_id, role_id)
      SELECT *
      FROM (SELECT 1, 1)t
      WHERE NOT EXISTS (SELECT 1 FROM users_roles);
  `;


  try {
    await transaction.begin();
    await transaction.queryObject(query1);
    await transaction.queryObject(query2);
    await transaction.queryObject(query3);
    await transaction.queryObject(query4);
    await transaction.queryObject(query5);
    await transaction.queryObject(query6);
    await transaction.commit()
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    throw error;
  } finally {
    client.release();
  }
}

export default init;
