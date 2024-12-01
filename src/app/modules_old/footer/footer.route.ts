import { Router } from 'express';
import auth from '../../middlewares/auth';
import { FooterServices } from './footer.service';
import validationRequest from '../../middlewares/validationRequest';
import footerValidationSchema from './footer.validation';

const router = Router();

router.post(
  '/',
  auth('admin'),
  validationRequest(footerValidationSchema),
  FooterServices.upsertFooterIntoDB,
);

router.get('/', FooterServices.getFooterFromDB);

export const FooterRoutes = router;
