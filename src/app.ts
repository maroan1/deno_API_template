import { Application, config, Router, Context, oakCors } from '../deps.ts';
import { errorHandler, loggerMiddleware, timingMiddleware, requestIdMiddleware } from "./middlewares/middlewares.ts";
import router from './router.ts';

const { PORT } = await config();


const app = new Application();

app.use(oakCors());

const basicRouter = new Router();
basicRouter.get('/basic', (ctx: Context) => {
    ctx.response.body = 'Hello World! This is a basic route.';
});


app.use(loggerMiddleware);
app.use(errorHandler);
app.use(timingMiddleware);
app.use(requestIdMiddleware);

app.use(basicRouter.routes());
app.use(basicRouter.allowedMethods());

router.init(app);



await app.listen({ port: +PORT});
