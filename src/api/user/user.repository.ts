import "https://deno.land/std@0.170.0/dotenv/load.ts";
import mongoUserRepository from "./repository/user.mongodb.repository.ts";
import postgresUserRepository from "./repository/user.postgres.repository.ts";

type UserRepository = typeof mongoUserRepository | typeof postgresUserRepository;

let userRepository : UserRepository;

const userRepositoryByDatabase: {
    [key: string]: UserRepository;
} = {
    MONGODB: mongoUserRepository,
    POSTGRES: postgresUserRepository,
}
const databaseName = Deno.env.get("DATABASE") ?? "MONGODB"
userRepository = userRepositoryByDatabase[databaseName];

export default userRepository;