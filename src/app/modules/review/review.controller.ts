import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ReviewService } from './review.service';

const createReview = catchAsync(async (req, res) => {
  const result = await ReviewService.createReview(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Review created successfully',
    data: result,
  });
});

const updateReview = catchAsync(async (req, res) => {
  const result = await ReviewService.updateReview(req.params.id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Review updated successfully',
    data: result,
  });
});

const deleteReview = catchAsync(async (req, res) => {
  await ReviewService.deleteReview(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Review deleted successfully',
  });
});

export const ReviewController = {
  createReview,
  updateReview,
  deleteReview,
};
