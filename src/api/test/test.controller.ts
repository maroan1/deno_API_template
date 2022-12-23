import type { Context } from '../../../deps.ts';
import { Status } from '../../../deps.ts';

function later(delay: number) {
    return new Promise(function(resolve) {
        setTimeout(resolve, delay);
    });
}

const helloWorld = async ({ response }: Context ) => {
    await later(2000);
    response.status = Status.OK;
    response.body = {
        message: 'Hello World! Testing',
    };
};

export default {
    helloWorld,
}
