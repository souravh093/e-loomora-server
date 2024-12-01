import { Router } from 'express';
import auth from '../../middlewares/auth';
import validationRequest from '../../middlewares/validationRequest';
import { ProjectValidation } from './project.validation';
import { imageUpload } from '../../middlewares/multer';
import { ProjectController } from './project.controller';

const router = Router();

router.post(
  '/',
  auth('admin'),
  imageUpload.fields([
    { name: 'firstImage', maxCount: 1 },
    { name: 'secondImage', maxCount: 1 },
    { name: 'thirdImage', maxCount: 1 },
    { name: 'images', maxCount: 20 },
  ]),
  validationRequest(ProjectValidation.createProjectValidationSchema),
  ProjectController.createProject,
);

router.get('/', ProjectController.getProjects);

router.get('/:id', ProjectController.getProject);

router.put(
  '/:id',
  auth('admin'),
  imageUpload.fields([
    { name: 'firstImage', maxCount: 1 },
    { name: 'secondImage', maxCount: 1 },
    { name: 'thirdImage', maxCount: 1 },
  ]),
  validationRequest(ProjectValidation.updateProjectValidationSchema),
  ProjectController.updateProject,
);

router.delete('/:id', auth('admin'), ProjectController.deleteProject);

export const ProjectRoutes = router;
