import {Context, Logger, State} from '../../deps.ts';
const logger = new Logger();

const loggerMiddleware = async (
    ctx: Context<State, Record<string, unknown>>,
    next: () => Promise<unknown>
): Promise<void> => {
    await next();
    const reqTime = ctx.response.headers.get('X-Response-Time');
    const reqId = ctx.request.headers.get('X-Request-Id') || ctx.response.headers.get('X-Request-Id');
    const status = ctx.response.status;

    if (status < 400) {
        logger.info(`${ctx.request.method} ${ctx.request.url} - ${status} - ${reqTime} - ${reqId}`);
    } else {
        logger.error(`${ctx.request.method} ${ctx.request.url} - ${status} - ${reqTime} - ${reqId}`);
    }
}

export { loggerMiddleware };
