import { runQuery } from "../../../postgreSQL/postgres.db.ts";
import {
  UserUpdate,
  UserWithRoles,
} from "../../../ts/interfaces/user.interfaces.ts";
import { toInt } from "../../../helpers/number.ts";

const QUERY = {
  GET_USER_BY_USERNAME: `
        SELECT users.*, array_agg(roles.name) as roles
        FROM users
            JOIN users_roles ur on users.id = ur.user_id
            JOIN roles on ur.role_id = roles.id
        WHERE username = $1
        GROUP BY users.id;
    `,
  GET_USER_BY_ID: `
        SELECT users.*, array_agg(roles.name) as roles
        FROM users
            JOIN users_roles ur on users.id = ur.user_id
            JOIN roles on ur.role_id = roles.id
        WHERE users.id = $1
        GROUP BY users.id;
    `,
  CREATE_USER: `
        INSERT INTO users (username, password, email)
        VALUES ($1, $2, $3)
        RETURNING id;
    `,
  UPDATE_USER: `
        UPDATE users
        SET username = $1, password = $2, email = $3
        WHERE id = $4
        RETURNING id;
    `,
  DELETE_USER: `
        DELETE FROM users
        WHERE id = $1
        RETURNING id;
    `,
  GET_USERS: `
        SELECT users.*, array_agg(roles.name) as roles
        FROM users
            JOIN users_roles ur on users.id = ur.user_id
            JOIN roles on ur.role_id = roles.id
        GROUP BY users.id;
    `,
  GET_USER_BY_EMAIL: `
        SELECT users.*, array_agg(roles.name) as roles
        FROM users
            JOIN users_roles ur on users.id = ur.user_id
            JOIN roles on ur.role_id = roles.id
        WHERE email = $1
        GROUP BY users.id;
    `,
};

const getUser = async (username: string): Promise<UserWithRoles | null> => {
  // Run the query with the username as a parameter
  const result = await runQuery<UserWithRoles>(QUERY.GET_USER_BY_USERNAME, [
    username,
  ]);

  // Return null if no user is found
  if (result?.length === 0) {
    return null;
  }
  // Return the first user otherwise
  return result[0];
};

const getUserById = async (id: number): Promise<UserWithRoles | null> => {
  // Run the query with the id as a parameter
  const result = await runQuery<UserWithRoles>(QUERY.GET_USER_BY_ID, [id]);

  // Return null if no user is found
  if (result?.length === 0) {
    return null;
  }
  // Return the first user otherwise
  return result[0];
};

const createUser = async (user: UserWithRoles): Promise<number | undefined> => {
  // Run the query with the user properties as parameters
  const result = await runQuery<UserWithRoles>(
    QUERY.CREATE_USER,
    [
      user.username,
      user.password,
      user.email,
    ],
  );

  // Return the created user
  return result[0].id;
};

// Define a function to update a user
const updateUser = async (
  id: number | string,
  user: UserUpdate,
): Promise<number | undefined> => {
  // Run the query with the user properties and the id as parameters
  const result = await runQuery<UserWithRoles>(
    QUERY.UPDATE_USER,
    [
      user.username,
      user.password,
      user.email,
      toInt(id),
    ],
  );

  // Return the updated user
  return result[0].id;
};

const deleteUser = async (id: number): Promise<number | undefined> => {
  const result = await runQuery<UserWithRoles>(QUERY.DELETE_USER, [id]);
  return result[0].id;
};

const getUsers = (): Promise<UserWithRoles[]> => {
  return runQuery<UserWithRoles>(QUERY.GET_USERS);
};

const getUserByEmail = async (email: string): Promise<UserWithRoles | null> => {
  const result = await runQuery<UserWithRoles>(QUERY.GET_USER_BY_EMAIL, [
    email,
  ]);
  return result[0];
};

// Export the functions as default
export default {
  getUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  getUserByEmail,
};
