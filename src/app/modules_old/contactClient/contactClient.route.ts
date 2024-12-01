import { Router } from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { ContactValidation } from './contactClient.validation';
import { ContactClientController } from './contactClient.controller';
import auth from '../../middlewares/auth';

const router = Router();

router.post(
  '/',
  validationRequest(ContactValidation.contactValidationSchema),
  ContactClientController.createContactClient,
);

router.get('/', auth('admin'), ContactClientController.getContactClient);

router.get(
  '/:id',
  auth('admin'),
  ContactClientController.getSingleContactClient,
);

router.delete(
  '/:id',
  auth('admin'),
  ContactClientController.deleteContactClient,
);

export const ContactClientRoutes = router;
