import { Router } from 'express';
import auth from '../../middlewares/auth';
import validationRequest from '../../middlewares/validationRequest';
import { EducationValidation } from './education.validation';
import { EducationController } from './education.controller';

const router = Router();

router.post(
  '/',
  auth('admin'),
  validationRequest(EducationValidation.createEducationValidationSchema),
  EducationController.createEducation,
);

router.get('/', EducationController.getEducations);

router.get('/:id', EducationController.getEducation);

router.put(
  '/:id',
  auth('admin'),
  validationRequest(EducationValidation.updateEducationValidationSchema),
  EducationController.updateEducation,
);

router.delete('/:id', auth('admin'), EducationController.deleteEducation);

export const EducationRoutes = router;
