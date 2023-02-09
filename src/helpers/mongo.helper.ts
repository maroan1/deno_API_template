import {ObjectId} from "../../deps.ts";

export const toObjectId = (id: string | ObjectId ) => {
  return typeof id === "string" ? { $oid: id } : id;
}
