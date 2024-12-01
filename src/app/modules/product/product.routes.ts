import { Router } from 'express';
import auth from '../../middlewares/auth';
import { Role } from '@prisma/client';
import validationRequest from '../../middlewares/validationRequest';
import { ProductValidations } from './product.validation';
import { ProductController } from './product.controller';

const router = Router();

router.post(
  '/',
  auth(Role.ADMIN, Role.VENDOR),
  validationRequest(ProductValidations.createProductValidation),
  ProductController.createProduct,
);

router.get('/', ProductController.getProducts);
router.get('/:id', ProductController.getProductById);

router.put(
  '/:id',
  auth(Role.ADMIN, Role.VENDOR),
  validationRequest(ProductValidations.updateProductValidation),
  ProductController.updateProduct,
);

router.delete(
  '/:id',
  auth(Role.ADMIN, Role.VENDOR),
  ProductController.deleteProduct,
);

export const ProductRoutes = router;
