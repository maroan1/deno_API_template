import "https://deno.land/std@0.177.0/dotenv/load.ts";
import { Application, Context, oakCors, Router } from "../deps.ts";
import {
  errorHandler,
  loggerMiddleware,
  requestIdMiddleware,
  timingMiddleware,
} from "./middlewares/middlewares.ts";
import router from "./router.ts";
import initMongo from "./mongoDb/initMongo.ts";
import initPostgres from "./postgreSQL/initPostgres.ts";

if (Deno.env.get("DATABASE") === "MONGODB") {
  await initMongo();
} else if (Deno.env.get("DATABASE") === "POSTGRES") {
  await initPostgres();
}

const app = new Application();

app.use(oakCors());

const basicRouter = new Router();
basicRouter.get("/basic", (ctx: Context) => {
  ctx.response.body = "Hello World! This is a basic route.";
});

app.use(loggerMiddleware);
app.use(errorHandler);
app.use(timingMiddleware);
app.use(requestIdMiddleware);

app.use(basicRouter.routes());
app.use(basicRouter.allowedMethods());

router.init(app);

await app.listen({ port: +(Deno?.env?.get("PORT") || 8000) });
