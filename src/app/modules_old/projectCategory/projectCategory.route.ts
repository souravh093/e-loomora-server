import { Router } from 'express';
import auth from '../../middlewares/auth';
import validationRequest from '../../middlewares/validationRequest';
import { ProjectCategoryValidation } from './projectCategory.validation';
import { ProjectCategoryController } from './projectCategory.controller';
import { imageUpload } from '../../middlewares/multer';

const router = Router();

router.post(
  '/',
  auth('admin'),
  imageUpload.single('image'),
  validationRequest(
    ProjectCategoryValidation.createProjectCategoryValidationSchema,
  ),
  ProjectCategoryController.createProjectCategory,
);

router.get('/', ProjectCategoryController.getProjectCategories);

router.get('/:id', ProjectCategoryController.getSingleProjectCategory);

export const ProjectCategoryRoutes = router;
