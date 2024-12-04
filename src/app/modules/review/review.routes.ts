import { Router } from 'express';
import auth from '../../middlewares/auth';
import { Role } from '@prisma/client';
import validationRequest from '../../middlewares/validationRequest';
import { ReviewValidation } from './review.validation';
import { ReviewController } from './review.controller';

const router = Router();

router.post(
  '/',
  auth(Role.USER, Role.ADMIN, Role.VENDOR),
  validationRequest(ReviewValidation.productReviewValidation),
  ReviewController.createReview,
);

router.get(
  '/:shopId',
  auth(Role.ADMIN, Role.VENDOR),
  ReviewController.getReviews,
);

router.put(
  '/:id',
  auth(Role.USER, Role.ADMIN, Role.VENDOR),
  validationRequest(ReviewValidation.productReviewValidation),
  ReviewController.updateReview,
);

router.delete(
  '/:id',
  auth(Role.USER, Role.ADMIN, Role.VENDOR),
  ReviewController.deleteReview,
);

export const ReviewRoutes = router;
