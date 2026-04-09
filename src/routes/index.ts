import { Router } from 'express';
import subscriptionRoutes from './subscription.routes.js';

const router = Router();

router.use('/subscribe', subscriptionRoutes);

export default router;
