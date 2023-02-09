import {runQuery} from "../../../postgreSQL/postgres.db.ts";
import {UserWithRoles} from "../../../ts/interfaces/user.interfaces.ts";

export const getUser = async (username: string): Promise<UserWithRoles | null> => {
  const result = await runQuery<UserWithRoles>(`
      SELECT users.*, array_agg(roles.name) as roles
      FROM users
        JOIN users_roles ur on users.id = ur.user_id
        JOIN roles on ur.role_id = roles.id
      WHERE username = '${username}'
      GROUP BY users.id;
  `);

  if (result?.length === 0) {
    return null;
  }
  return result[0];
};

export const getUserById = async (id: number): Promise<UserWithRoles | null> => {
  const result = await runQuery<UserWithRoles>(`
      SELECT users.*, array_agg(roles.name) as roles
      FROM users
        JOIN users_roles ur on users.id = ur.user_id
        JOIN roles on ur.role_id = roles.id
      WHERE users.id = ${id}
      GROUP BY users.id;
  `);

  if (result?.length === 0) {
    return null;
  }
  return result[0];
}

export const createUser = async (user: UserWithRoles): Promise<UserWithRoles> => {
  const result = await runQuery<UserWithRoles>(`
      INSERT INTO users (username, password, email)
      VALUES ('${user.username}', '${user.password}', '${user.email}')
      RETURNING *;
  `);

  return result[0];
}

export const updateUser = async (id: number, user: UserWithRoles): Promise<UserWithRoles> => {
  const result = await runQuery<UserWithRoles>(`
      UPDATE users
      SET username = '${user.username}', password = '${user.password}', email = '${user.email}'
      WHERE id = ${id}
      RETURNING *;
  `);

  return result[0];
}
