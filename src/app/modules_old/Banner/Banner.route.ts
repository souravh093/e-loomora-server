import { Router } from 'express';
import auth from '../../middlewares/auth';
import validationRequest from '../../middlewares/validationRequest';
import { BannerValidation } from './Banner.validation';
import { BannerController } from './Banner.controller';
import { imageUpload } from '../../middlewares/multer';

const router = Router();

router.post(
  '/',
  auth('admin'),
  imageUpload.fields([{ name: 'images', maxCount: 10 }]),
  validationRequest(BannerValidation.createBannerValidationSchema),
  BannerController.createBanner,
);

router.get('/', BannerController.getBanners);

router.put(
  '/',
  auth('admin'),
  validationRequest(BannerValidation.updateBannerValidationSchema),
  BannerController.updateBanner,
);

router.post(
  '/image',
  auth('admin'),
  imageUpload.fields([{ name: 'image', maxCount: 1 }]),
  BannerController.createBannerImage,
);

router.delete('/image/:id', auth('admin'), BannerController.deleteBannerImage);

export const BannerRoutes = router;
