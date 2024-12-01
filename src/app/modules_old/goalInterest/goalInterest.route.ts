import { Router } from 'express';
import auth from '../../middlewares/auth';
import validationRequest from '../../middlewares/validationRequest';
import goalInterestValidationSchema from './goalInterest.validation';
import goalInterestController from './goalInterest.controller';

const router = Router();

router.post(
  '/',
  auth('admin'),
  validationRequest(goalInterestValidationSchema),
  goalInterestController.createGoalInterest,
);

router.get('/', goalInterestController.getGoalInterest);


router.put(
  '/',
  auth('admin'),
  validationRequest(goalInterestValidationSchema),
  goalInterestController.updateGoalInterest,
);

router.delete('/:id', auth('admin'), goalInterestController.deleteGoalInterest);

export const GoalInterestRoutes = router;
