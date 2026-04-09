import { Router, json } from 'express';
import { subscribe } from '../controllers/subscription.controller.js';
import { validate } from '../middleware/validate.js';
import { subscribeSchema } from '../validation/subscription.schema.js';

const router = Router();

const jsonParser = json();

router.post('/', jsonParser, validate(subscribeSchema), subscribe);

export default router;
