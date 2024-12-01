import { Router } from 'express';
import auth from '../../middlewares/auth';
import validationRequest from '../../middlewares/validationRequest';
import metaDataValidation from './metaData.validation';
import { MetaDataController } from './metaData.controller';
import { imageUpload } from '../../middlewares/multer';

const router = Router();

router.post(
  '/',
  auth('admin'),
  imageUpload.fields([
    {name: 'favicon', maxCount: 1}
  ]),
  validationRequest(metaDataValidation),
  MetaDataController.upsertMetaData,
);

router.get('/', MetaDataController.getMetaData);

export const MetaDataRoutes = router;
