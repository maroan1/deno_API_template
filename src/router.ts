import type { Application } from  '../deps.ts';
import testRouter from './api/test/test.router.ts';

const init = (app: Application) => {
    app.use(testRouter.routes());
    app.use(testRouter.allowedMethods());
}

export default {
    init,
};
