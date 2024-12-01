import { Router } from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { AuthValidations } from './auth.validation';
import { AuthController } from './auth.controller';
import auth from '../../middlewares/auth';
import { Role } from '@prisma/client';

const router = Router();

router.post(
  '/login',
  validationRequest(AuthValidations.loginValidation),
  AuthController.loginUser,
);

router.post(
  '/forget-password',
  validationRequest(AuthValidations.forgetPasswordValidation),
  AuthController.forgetPassword,
);

router.post(
  '/reset-password',
  validationRequest(AuthValidations.resetPasswordValidation),
  AuthController.resetPassword,
);

router.post(
  '/change-password',
  auth(Role.USER, Role.ADMIN, Role.VENDOR),
  validationRequest(AuthValidations.changePasswordValidation),
  AuthController.changedPassword,
);

export const AuthRoutes = router;
