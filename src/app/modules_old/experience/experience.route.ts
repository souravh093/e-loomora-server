import { Router } from 'express';
import auth from '../../middlewares/auth';
import validationRequest from '../../middlewares/validationRequest';
import { ExperienceValidations } from './experience.validation';
import { ExperienceController } from './experience.controller';

const router = Router();

router.post(
  '/',
  auth('admin'),
  validationRequest(ExperienceValidations.createExperienceValidation),
  ExperienceController.createExperience,
);

router.get('/:id', ExperienceController.getExperience);

router.get('/', ExperienceController.getExperiences);

router.put(
  '/:id',
  auth('admin'),
  validationRequest(ExperienceValidations.updateExperienceValidation),
  ExperienceController.updateExperience,
);

router.delete('/:id', auth('admin'), ExperienceController.deleteExperience);

export const ExperienceRoutes = router;
