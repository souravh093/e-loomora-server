import { Router } from 'express';
import auth from '../../middlewares/auth';
import validationRequest from '../../middlewares/validationRequest';
import { SkillValidations } from './skill.validation';
import { SkillController } from './skill.controller';

const router = Router();

router.post(
  '/',
  auth('admin'),
  validationRequest(SkillValidations.createSkillValidationSchema),
  SkillController.createSkill,
);

router.get('/', SkillController.getSkills);

router.get('/:id', SkillController.getSkillById);

router.put(
  '/:id',
  auth('admin'),
  validationRequest(SkillValidations.updateSkillValidationSchema),
  SkillController.updateSkill,
);

router.delete('/:id', auth('admin'), SkillController.deleteSkill);

export const SkillRoutes = router;
