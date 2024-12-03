import { Router } from 'express';
import auth from '../../middlewares/auth';
import { Role } from '@prisma/client';
import validationRequest from '../../middlewares/validationRequest';
import { ShopValidations } from './shop.validation';
import { ShopController } from './shop.controller';

const router = Router();

router.post(
  '/',
  auth(Role.ADMIN, Role.USER, Role.VENDOR),
  validationRequest(ShopValidations.createShopValidation),
  ShopController.createShop,
);
router.put(
  '/:id',
  auth(Role.ADMIN, Role.USER, Role.VENDOR),
  validationRequest(ShopValidations.updateShopValidation),
  ShopController.updateShop,
);
router.delete(
  '/:id',
  auth(Role.ADMIN, Role.USER, Role.VENDOR),
  ShopController.deleteShop,
);

router.get('/', ShopController.getShops);
router.get('/:id', ShopController.getShopById);
router.get('/user/:id', ShopController.getShopByUserId);

export const ShopRoutes = router;
