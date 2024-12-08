import { Router } from 'express';
import auth from '../../middlewares/auth';
import { Role } from '@prisma/client';
import validationRequest from '../../middlewares/validationRequest';
import { CouponValidation } from './coupon.validation';
import { CouponController } from './coupon.service';

const router = Router();

router.post(
  '/',
  auth(Role.ADMIN, Role.VENDOR),
  validationRequest(CouponValidation.createCouponValidation),
  CouponController.createCoupon,
);

router.get('/', CouponController.getAllCoupons);

router.get('/:id', CouponController.getCouponById);
router.get('/check/:code', CouponController.checkCouponCode);

router.put(
  '/:id',
  auth(Role.ADMIN, Role.VENDOR),
  CouponController.updateCouponById,
);

router.delete(
  '/:id',
  auth(Role.ADMIN, Role.VENDOR),
  CouponController.deleteCouponById,
);

export const CouponRoutes = router;
