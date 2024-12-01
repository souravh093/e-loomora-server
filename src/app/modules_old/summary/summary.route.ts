import { Router } from 'express';
import auth from '../../middlewares/auth';
import validationRequest from '../../middlewares/validationRequest';
import { SummerValidations } from './summary.validation';
import { SummaryController } from './summary.controller';

const router = Router();

router.post(
  '/',
  auth('admin'),
  validationRequest(SummerValidations.createSummaryValidation),
  SummaryController.createSummary,
);

router.get('/:id', SummaryController.getSummary);
router.get('/', SummaryController.getSum);

router.put(
  '/:id',
  auth('admin'),
  validationRequest(SummerValidations.updateSummaryValidation),
  SummaryController.updateSummary,
);

router.delete('/:id', auth('admin'), SummaryController.deleteSummary);

export const SummaryRoutes = router;
