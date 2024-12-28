import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SubscriptionService } from './subscription.service';

const createSubscription = catchAsync(async (req, res) => {
  const result = await SubscriptionService.createSubscription(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'You have successfully subscribed to our newsletter',
    data: result,
  });
});

const getSubscriptions = catchAsync(async (req, res) => {
  const result = await SubscriptionService.getSubscriptions();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Subscriptions retrieved successfully',
    data: result,
  });
});

const deleteSubscription = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SubscriptionService.deleteSubscription(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Subscription deleted successfully',
    data: result,
  });
});

export const SubscriptionController = {
  createSubscription,
  getSubscriptions,
  deleteSubscription,
};
