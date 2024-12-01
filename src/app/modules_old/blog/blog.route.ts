import { Router } from 'express';
import auth from '../../middlewares/auth';
import validationRequest from '../../middlewares/validationRequest';
import { BlogValidations } from './blog.validation';
import { BlogController } from './blog.controller';
import { imageUpload } from '../../middlewares/multer';

const router = Router();

router.post(
  '/',
  auth('admin'),
  imageUpload.fields([{ name: 'images', maxCount: 20 }]),
  validationRequest(BlogValidations.createBlogValidation),
  BlogController.createBlog,
);

router.get('/', BlogController.getBlogs);
router.get('/:id', BlogController.getBlog);

router.put(
  '/:id',
  auth('admin'),
  validationRequest(BlogValidations.updateBlogValidation),
  BlogController.updateBlog,
);

router.delete('/:id', auth('admin'), BlogController.deleteBlog);

export const BlogRoutes = router;
