import { Router } from '../../../deps.ts';
import TestController from './test.controller.ts';

const router = new Router();

router.get('/api/test', TestController.helloWorld);

export default router;
