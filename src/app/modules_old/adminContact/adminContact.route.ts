import { Router } from 'express';
import auth from '../../middlewares/auth';
import validationRequest from '../../middlewares/validationRequest';
import { AdminContactValidation } from './adminContact.validation';
import { AdminContactController } from './adminContact.controller';

const router = Router();

router.post(
  '/',
  auth('admin'),
  validationRequest(AdminContactValidation.updateAdminContactValidationSchema),
  AdminContactController.createAdminContact,
);

router.get('/', AdminContactController.getAdminContact);


export const AdminContactRoutes = router;