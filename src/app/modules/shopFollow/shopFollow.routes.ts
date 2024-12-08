import { Router } from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { ShopFollowValidations } from './shopFollow.validation';
import { ShopFollowController } from './shopFollow.controller';
import auth from '../../middlewares/auth';
import { Role } from '@prisma/client';

const router = Router();

router.post(
  '/',
  auth(Role.USER),
  validationRequest(ShopFollowValidations.createShopFollowIntoDB),
  ShopFollowController.followShop,
);

router.get('/check', auth(Role.USER), ShopFollowController.checkShopFollow);

router.get(
  '/',
  // auth(Role.ADMIN),
  ShopFollowController.getAllShopFollow,
);

router.get(
  '/user/:userId',
  auth(Role.USER),
  ShopFollowController.getShopFollowByUserId,
);

router.get(
  '/shop/:shopId',
  // auth(Role.VENDOR),
  ShopFollowController.getShopFollowByShopId,
);

router.delete(
  '/',
  auth(Role.USER),
  validationRequest(ShopFollowValidations.createShopFollowIntoDB),
  ShopFollowController.unfollowShop,
);

export const ShopFollowRoutes = router;
