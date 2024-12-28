import { Router } from 'express';
import { SubscriptionController } from './subscription.controller';

const router = Router();

router.post('/', SubscriptionController.createSubscription);
router.get('/', SubscriptionController.getSubscriptions);
router.delete('/:id', SubscriptionController.deleteSubscription);

export const SubscriptionRoutes = router;
