import { Router } from 'express';
import { LogoController } from './logo.controller';
import { imageUpload } from '../../middlewares/multer';
import validationRequest from '../../middlewares/validationRequest';
import { LogoValidations } from './logo.validation';
import auth from '../../middlewares/auth';

const router = Router();

router.post(
  '/',
  auth('admin'),
  imageUpload.single('image'),
  validationRequest(LogoValidations.LogoValidation),
  LogoController.createLogo,
);
router.get('/', LogoController.getLogo);
router.put(
  '/',
  auth('admin'),
  imageUpload.single('image'),
  validationRequest(LogoValidations.LogoValidation),
  LogoController.updateLogo,
);

export const LogoRoutes = router;
