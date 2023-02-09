import {
  config,
  create,
  getNumericDate,
  Header,
  Logger,
  Payload,
  verify,
} from "../../deps.ts";
import { UserWithRoles } from "../ts/interfaces/user.interfaces.ts";
import { User } from "../ts/types/user.types.ts";

const logger = new Logger();

const {
  JWT_ACCESS_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_SECRET,
  JWT_ACCESS_TOKEN_EXP,
  JWT_REFRESH_TOKEN_EXP,
} = await config();

const header: Header = {
  alg: "HS256",
  typ: "JWT",
};

const getAuthToken = async (user: UserWithRoles): Promise<string> => {
  const payload: Payload = {
    iss: "deno-api",
    id: user.id,
    name: user.name,
    email: user.email,
    roles: user.roles,
    exp: getNumericDate(parseInt(JWT_ACCESS_TOKEN_EXP)),
  };

  const key = await crypto.subtle.generateKey(
    { name: JWT_ACCESS_TOKEN_SECRET, hash: { name: "SHA-256" } },
    true,
    ["sign", "verify"],
  );

  return create(header, payload, key);
};

const getRefreshToken = async (user: User): Promise<string> => {
  const payload: Payload = {
    iss: "deno-api",
    id: user.id,
    exp: getNumericDate(parseInt(JWT_REFRESH_TOKEN_EXP)),
  };

  const key = await crypto.subtle.generateKey(
    { name: JWT_REFRESH_TOKEN_SECRET, hash: { name: "SHA-256" } },
    true,
    ["sign", "verify"],
  );

  return create(header, payload, key);
};

const getJwtAccessPayload = async (token: string): Promise<Payload | null> => {
  try {
    const key = await crypto.subtle.generateKey(
      { name: JWT_ACCESS_TOKEN_SECRET, hash: { name: "SHA-256" } },
      true,
      ["sign", "verify"],
    );
    const jwtObject = await verify(token, key);
    if (jwtObject) {
      return jwtObject;
    }
  } catch (err) {
    logger.error(err);
  }
  return null;
};

export { getAuthToken, getJwtAccessPayload, getRefreshToken };
