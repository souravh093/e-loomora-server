import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AchievementServices } from './achievement.service';

const createAchievement = catchAsync(async (req, res) => {
  const result = await AchievementServices.createAchievementIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Achievement created successfully',
    data: result,
  });
});

const getAchievement = catchAsync(async (req, res) => {
  const result = await AchievementServices.getAchievementFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Achievement fetched successfully',
    data: result,
  });
});

const updateAchievement = catchAsync(async (req, res) => {
  const result = await AchievementServices.updateAchievementIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Achievement updated successfully',
    data: result,
  });
});

const deleteAchievement = catchAsync(async (req, res) => {
  const result = await AchievementServices.deleteAchievementFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Achievement deleted successfully',
    data: result,
  });
});

export const AchievementController = {
  createAchievement,
  getAchievement,
  updateAchievement,
  deleteAchievement,
};
