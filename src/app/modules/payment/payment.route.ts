import { Router } from 'express';
import { PaymentController } from './payment.controller';
import auth from '../../middlewares/auth';
import { Role } from '@prisma/client';

const router = Router();

router.post('/confirmation', PaymentController.confirmationController);
router.get('/', auth(Role.ADMIN, Role.VENDOR), PaymentController.getPayments);

export const paymentRoutes = router;
