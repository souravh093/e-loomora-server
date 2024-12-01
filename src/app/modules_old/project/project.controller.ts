import config from '../../config';
import { MulterFiles } from '../../types/globalTypes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProjectServices } from './project.service';

const createProject = catchAsync(async (req, res) => {
  const files = req.files as MulterFiles;
  const firstImage = files['firstImage']
    ? `${config.serverUrl}/images/${files['firstImage'][0].filename}`
    : null;

  const secondImage = files['secondImage']
    ? `${config.serverUrl}/images/${files['secondImage'][0].filename}`
    : null;

  const thirdImage = files['thirdImage']
    ? `${config.serverUrl}/images/${files['thirdImage'][0].filename}`
    : null;

  const images = files['images']
    ? files['images'].map(
        (image) => `${config.serverUrl}/images/${image.filename}`,
      )
    : [];

  const result = await ProjectServices.createProjectIntoDB(
    {
      ...req.body,
      firstImage,
      secondImage,
      thirdImage,
    },
    images,
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Project created successfully',
    data: result,
  });
});

const updateProject = catchAsync(async (req, res) => {
  const files = req.files as MulterFiles;
  const updateData = { ...req.body };

  if (files['firstImage']) {
    updateData.firstImage = `${config.serverUrl}/images/${files['firstImage'][0].filename}`;
  }

  if (files['secondImage']) {
    updateData.secondImage = `${config.serverUrl}/images/${files['secondImage'][0].filename}`;
  }

  if (files['thirdImage']) {
    updateData.thirdImage = `${config.serverUrl}/images/${files['thirdImage'][0].filename}`;
  }

  const result = await ProjectServices.updateProjectIntoDB(
    req.params.id,
    updateData,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Project updated successfully',
    data: result,
  });
});

const getProjects = catchAsync(async (req, res) => {
  const { result, meta } = await ProjectServices.getProjectsFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Projects fetched successfully',
    meta,
    data: result,
  });
});

const getProject = catchAsync(async (req, res) => {
  const project = await ProjectServices.getProjectFromDB(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Project fetched successfully',
    data: project,
  });
});

const deleteProject = catchAsync(async (req, res) => {
  await ProjectServices.deleteProjectFromDB(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Project deleted successfully',
  });
});

export const ProjectController = {
  createProject,
  updateProject,
  getProjects,
  deleteProject,
  getProject,
};
