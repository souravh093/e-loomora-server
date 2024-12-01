import { Router } from 'express';
import auth from '../../middlewares/auth';
import validationRequest from '../../middlewares/validationRequest';
import achievementValidationSchema from './achievement.validation';
import { AchievementController } from './achievement.controller';

const router = Router();

router.post(
  '/',
  auth('admin'),
  validationRequest(achievementValidationSchema),
  AchievementController.createAchievement,
);

router.get('/', AchievementController.getAchievement);

router.put(
  '/',
  auth('admin'),
  validationRequest(achievementValidationSchema),
  AchievementController.updateAchievement,
);

router.delete('/', auth('admin'), AchievementController.deleteAchievement);

export const AchievementRouters = router;
