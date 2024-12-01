import { Router } from 'express';
import auth from '../../middlewares/auth';
import validationRequest from '../../middlewares/validationRequest';
import socialMediaValidationSchema from './socialMedia.validation';
import { SocialMediaController } from './socialMedia.controller';

const router = Router();

router.post(
  '/',
  auth('admin'),
  validationRequest(socialMediaValidationSchema),
  SocialMediaController.upsertSocialMedia,
);

router.get('/', SocialMediaController.getSocialMedia);

export const SocialMediaRoutes = router;
