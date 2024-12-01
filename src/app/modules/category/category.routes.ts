import { Router } from 'express';
import auth from '../../middlewares/auth';
import { Role } from '@prisma/client';
import validationRequest from '../../middlewares/validationRequest';
import { CategoryValidations } from './category.validation';
import { CategoryController } from './category.controller';

const router = Router();

router.post(
  '/',
  auth(Role.ADMIN),
  validationRequest(CategoryValidations.createCategoryValidation),
  CategoryController.createCategory,
);

router.get('/', CategoryController.getCategories);

router.get('/:id', CategoryController.getCategoryById);

router.put(
  '/:id',
  auth(Role.ADMIN),
  validationRequest(CategoryValidations.updateCategoryValidation),
  CategoryController.updateCategory,
);

router.delete('/:id', auth(Role.ADMIN), CategoryController.deleteCategory);

export const CategoriesRoutes = router;
