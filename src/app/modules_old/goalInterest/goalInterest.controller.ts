import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { GoalInterestService } from './goalInterest.service';

const createGoalInterest = catchAsync(async (req, res) => {
  const result = await GoalInterestService.createGoalInterestIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'GoalInterest created successfully',
    data: result,
  });
});

const getGoalInterest = catchAsync(async (req, res) => {
  const result = await GoalInterestService.getGoalInterestFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'GoalInterest fetched successfully',
    data: result,
  });
});

const updateGoalInterest = catchAsync(async (req, res) => {
  const result = await GoalInterestService.updateGoalInterestIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'GoalInterest updated successfully',
    data: result,
  });
});

const deleteGoalInterest = catchAsync(async (req, res) => {
  const result = await GoalInterestService.deleteGoalInterestFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'GoalInterest deleted successfully',
    data: result,
  });
});

export default {
  createGoalInterest,
  getGoalInterest,
  updateGoalInterest,
  deleteGoalInterest,
};
