import { Router } from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { AuthValidations } from './auth.validation';
import { AuthController } from './auth.controller';
import auth from '../../middlewares/auth';

const router = Router();

router.post(
  '/login',
  validationRequest(AuthValidations.authValidation),
  AuthController.login,
);

router.post('/forget-password', AuthController.forgetPassword);
router.post('/reset-password', AuthController.resetPassword);
router.post('/change-password', auth('admin'), AuthController.changePassword);
export const AuthRoutes = router;
