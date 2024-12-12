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

const getReviews = catchAsync(async (req, res) => {
  const result = await ReviewService.getReviews(req.params.shopId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
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

const replayReview = catchAsync(async (req, res) => {
  const result = await ReviewService.replayReview(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Review replayed successfully',
    data: result,
  });
});

export const ReviewController = {
  createReview,
  updateReview,
  deleteReview,
  getReviews,
  replayReview,
};
