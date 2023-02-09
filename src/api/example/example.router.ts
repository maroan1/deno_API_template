import { Router } from "../../../deps.ts";
import TestController from "./example.controller.ts";
import validate from "../../middlewares/validate.middleware.ts";
import { sum, sumPost } from "./example.schema.ts";

const router = new Router();

router.get("/api/test", TestController.helloWorld);

router.get("/api/test/sum", validate(sum), TestController.sum);

router.post("/api/test/sum", validate(sumPost), TestController.sumPost);

export default router;
