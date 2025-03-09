import { Router } from 'express';
import auth from '../../middlewares/auth';
import { Role } from '@prisma/client';
import validationRequest from '../../middlewares/validationRequest';
import { OrderValidations } from './order.validation';
import { OrderController } from './order.controller';

const router = Router();

router.post(
  '/',
  // auth(Role.USER), // TODO
  validationRequest(OrderValidations.createOrderValidation),
  OrderController.createOrder,
);

router.get('/user', auth(Role.USER), OrderController.getOrderByUserId);

router.get(
  '/',
  auth(Role.ADMIN, Role.VENDOR, Role.USER),
  OrderController.getOrders,
);

router.get('/payment', auth(Role.USER), OrderController.getOrdersByUserId);

router.get(
  '/all-info',
  auth(Role.ADMIN, Role.VENDOR, Role.USER),
  OrderController.getAllInfo,
);

router.get(
  '/customer/status',
  auth(Role.USER),
  OrderController.getCustomerOrdersStatus,
);

router.get(
  '/customer/day-of-week',
  auth(Role.USER),
  OrderController.getOrderCountByDayOfWeek,
);

router.get(
  '/customer/month',
  auth(Role.USER),
  OrderController.getOrderCountByMonthCustomer,
);

router.get(
  '/week/:shopId',
  auth(Role.ADMIN, Role.VENDOR),
  OrderController.getOrderCountByWeek,
);

router.get(
  '/month/:shopId',
  auth(Role.ADMIN, Role.VENDOR),
  OrderController.getOrderCountByMonth,
);

router.get(
  '/:id',
  auth(Role.ADMIN, Role.VENDOR, Role.USER),
  OrderController.getOrderById,
);

export const OrderRoutes = router;
