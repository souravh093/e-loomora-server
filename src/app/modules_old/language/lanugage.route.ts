import { Router } from 'express';
import auth from '../../middlewares/auth';
import validationRequest from '../../middlewares/validationRequest';
import { LanguageValidations } from './lanugage.validation';
import { LanguageController } from './lanugage.controller';

const router = Router();

router.post(
  '/',
  auth('admin'),
  validationRequest(LanguageValidations.createLanguageValidationSchema),
  LanguageController.createLanguage,
);

router.get('/', LanguageController.getLanguages);

router.get('/:id', LanguageController.getLanguage);

router.put(
  '/:id',
  auth('admin'),
  validationRequest(LanguageValidations.updateLanguageValidationSchema),
  LanguageController.updateLanguage,
);

router.delete('/:id', auth('admin'), LanguageController.deleteLanguage);

export const LanguageRoutes = router;
