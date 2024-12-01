import { Router } from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { UserValidations } from './user.validation';
import { UsersController } from './users.controller';

const router = Router();

router.post(
  '/customer',
  validationRequest(UserValidations.createUserValidationSchema),
  UsersController.createUser,
);

router.post(
  '/vendor',
  validationRequest(UserValidations.createUserValidationSchema),
  UsersController.createVendor,
);

export const UsersRoutes = router;
