import { Router } from 'express';
import auth from '../../middlewares/auth';
import { Role } from '@prisma/client';
import validationRequest from '../../middlewares/validationRequest';
import { OrderValidations } from './order.validation';
import { OrderController } from './order.controller';

const router = Router();

router.post(
  '/',
  auth(Role.USER),
  validationRequest(OrderValidations.createOrderValidation),
  OrderController.createOrder,
);

export const OrderRoutes = router;
