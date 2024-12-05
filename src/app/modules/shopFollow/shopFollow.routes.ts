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

router.delete(
  '/',
  auth(Role.USER),
  validationRequest(ShopFollowValidations.createShopFollowIntoDB),
  ShopFollowController.unfollowShop,
);

router.get(
  '/:userId',
  auth(Role.USER),
  ShopFollowController.getShopFollowByUserId,
);

router.get(
  '/:shopId',
  auth(Role.VENDOR),
  ShopFollowController.getShopFollowByShopId,
);

export const ShopFollowRoutes = router;
