import { Router } from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { UserValidations } from './user.validation';
import { UsersController } from './users.controller';

const router = Router();

router.post(
  '/',
  validationRequest(UserValidations.createUserValidationSchema),
  UsersController.createUser,
);

export const UsersRoutes = router;
