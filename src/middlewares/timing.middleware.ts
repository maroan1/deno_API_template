import {Context, State} from '../../deps.ts';

const timingMiddleware = async (
    ctx: Context<State, Record<string, unknown>>,
    next: () => Promise<unknown>
): Promise<void> => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.response.headers.set('X-Response-Time', `${ms}ms`);
};

export { timingMiddleware };
