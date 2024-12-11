import { Router } from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { UserValidations } from './user.validation';
import { UsersController } from './users.controller';
import auth from '../../middlewares/auth';
import { Role } from '@prisma/client';

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

router.get('/', auth(Role.ADMIN), UsersController.getUsers);
router.get('/:id', auth(Role.ADMIN, Role.VENDOR, Role.USER), UsersController.getUserById);

router.put(
  '/:id',
  auth(Role.ADMIN),
  validationRequest(UserValidations.updateUserValidationSchema),
  UsersController.updateUserById,
);

router.delete('/:id', auth(Role.ADMIN), UsersController.deleteUserById);

export const UsersRoutes = router;
