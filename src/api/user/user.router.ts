import { Router } from "../../../deps.ts";
import UserController from "./user.controller.ts";
import validate from "../../middlewares/validate.middleware.ts";
import { createUser, updateUser } from "./user.schema.ts";

const router = new Router();

router.post("/api/user", validate(createUser), UserController.createUser);
router.put("/api/user/:id", validate(updateUser), UserController.updateUser);
