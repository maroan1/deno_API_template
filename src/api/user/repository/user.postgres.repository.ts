import { runQuery } from "../../../postgreSQL/postgres.db.ts";
import { UserWithRoles } from "../../../ts/interfaces/user.interfaces.ts";

const GET_USER_BY_USERNAME_QUERY = `
  SELECT users.*, array_agg(roles.name) as roles
  FROM users
    JOIN users_roles ur on users.id = ur.user_id
    JOIN roles on ur.role_id = roles.id
  WHERE username = $1
  GROUP BY users.id;
`;

const GET_USER_BY_ID_QUERY = `
  SELECT users.*, array_agg(roles.name) as roles
  FROM users
    JOIN users_roles ur on users.id = ur.user_id
    JOIN roles on ur.role_id = roles.id
  WHERE users.id = $1
  GROUP BY users.id;
`;

const CREATE_USER_QUERY = `
  INSERT INTO users (username, password, email)
  VALUES ($1, $2, $3)
  RETURNING *;
`;

const UPDATE_USER_QUERY = `
  UPDATE users
  SET username = $1, password = $2, email = $3
  WHERE id = $4
  RETURNING *;
`;

const getUser = async (username: string): Promise<UserWithRoles | null> => {
    // Run the query with the username as a parameter
    const result = await runQuery<UserWithRoles>(GET_USER_BY_USERNAME_QUERY, [username]);

    // Return null if no user is found
    if (result?.length === 0) {
        return null;
    }
    // Return the first user otherwise
    return result[0];
};

const getUserById = async (id: number): Promise<UserWithRoles | null> => {
    // Run the query with the id as a parameter
    const result = await runQuery<UserWithRoles>(GET_USER_BY_ID_QUERY, [id]);

    // Return null if no user is found
    if (result?.length === 0) {
        return null;
    }
    // Return the first user otherwise
    return result[0];
};

const createUser = async (user: UserWithRoles): Promise<UserWithRoles> => {
    // Run the query with the user properties as parameters
    const result = await runQuery<UserWithRoles>(
        CREATE_USER_QUERY,
        [
            user.username,
            user.password,
            user.email
        ],
    );

    // Return the created user
    return result[0];
};

// Define a function to update a user
const updateUser = async (id: number, user: UserWithRoles): Promise<UserWithRoles> => {
    // Run the query with the user properties and the id as parameters
    const result = await runQuery<UserWithRoles>(
        UPDATE_USER_QUERY,
    [
            user.username,
            user.password,
            user.email,
            id,
        ]
    );

    // Return the updated user
    return result[0];
};

// Export the functions as default
export default {
    getUser,
    getUserById,
    createUser,
    updateUser,
};