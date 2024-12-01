import { Router } from 'express';
import auth from '../../middlewares/auth';
import validationRequest from '../../middlewares/validationRequest';
import { SuccessValidation } from './success.validation';
import { SuccessController } from './success.controller';

const router = Router();

router.post(
  '/',
  auth('admin'),
  validationRequest(SuccessValidation.updateSuccessValidationSchema),
  SuccessController.upsertSuccess,
);

router.get('/', SuccessController.getSuccess);

export const SuccessRoutes = router;
