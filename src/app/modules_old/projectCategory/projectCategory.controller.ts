import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProjectCategoryServices } from './projectCategory.service';

const createProjectCategory = catchAsync(async (req, res) => {
  const fileURLWithPath = `${config.serverUrl}/images/${req?.file?.filename}`;
  const result = await ProjectCategoryServices.createProjectCategoryIntoDB({
    ...req.body,
    image: fileURLWithPath,
  });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Project Category created successfully',
    data: result,
  });
});

const getProjectCategories = catchAsync(async (req, res) => {
  const result = await ProjectCategoryServices.getProjectCategoriesFromDB(
    req.query,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Project Categories fetched successfully',
    meta: result?.meta,
    data: result?.projectCategories,
  });
});

const getSingleProjectCategory = catchAsync(async (req, res) => {
  const result = await ProjectCategoryServices.singleProjectCategoryFromDB(
    req.params.id,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Project Category fetched successfully',
    data: result,
  });
});

export const ProjectCategoryController = {
  createProjectCategory,
  getProjectCategories,
  getSingleProjectCategory,
};
