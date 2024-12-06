import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ShopFollowService } from './shopFollow.service';

const followShop = catchAsync(async (req, res) => {
  const result = await ShopFollowService.followShopIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Shop Followed successfully',
    data: result,
  });
});

const checkShopFollow = catchAsync(async (req, res) => {
  const result = await ShopFollowService.checkShopFollow(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Shop Followed successfully',
    data: result,
  });
});

const unfollowShop = catchAsync(async (req, res) => {
  const result = await ShopFollowService.unfollowShopFromDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: result,
  });
});

const getShopFollowByUserId = catchAsync(async (req, res) => {
  const result = await ShopFollowService.getShopFollowByUserId(
    req.params.userId,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
  });
});

const getShopFollowByShopId = catchAsync(async (req, res) => {
  const result = await ShopFollowService.getShopFollowByShopId(
    req.params.shopId,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
  });
});

const getAllShopFollow = catchAsync(async (req, res) => {
  const result = await ShopFollowService.getAllShopFollow();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'All Shop Follows',
    data: result,
  });
});

export const ShopFollowController = {
  followShop,
  unfollowShop,
  getShopFollowByUserId,
  getShopFollowByShopId,
  checkShopFollow,
  getAllShopFollow,
};
