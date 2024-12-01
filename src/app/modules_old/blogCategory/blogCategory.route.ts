import { Router } from 'express';
import auth from '../../middlewares/auth';
import { BlogCategoryValidations } from './blogCategory.validation';
import validationRequest from '../../middlewares/validationRequest';
import { BlogCategoryController } from './blogCategory.controller';

const router = Router();

router.post(
  '/',
  auth('admin'),
  validationRequest(BlogCategoryValidations.createBlogCategoryValidation),
  BlogCategoryController.createBlogCategory,
);

router.get('/:id', BlogCategoryController.getBlogCategory);

router.put(
  '/:id',
  auth('admin'),
  validationRequest(BlogCategoryValidations.updateBlogCategoryValidation),
  BlogCategoryController.updateBlogCategory,
);

router.delete('/:id', auth('admin'), BlogCategoryController.deleteBlogCategory);

export const BlogCategoryRoutes = router;
