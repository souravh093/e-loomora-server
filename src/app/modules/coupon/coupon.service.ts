import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CouponService } from './coupon.controller';

const createCoupon = catchAsync(async (req, res) => {
  const result = await CouponService.createCouponIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Coupon created successfully',
    data: result,
  });
});

const getCouponById = catchAsync(async (req, res) => {
  const result = await CouponService.getCouponById(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Coupon fetched successfully',
    data: result,
  });
});

const checkCouponCode = catchAsync(async (req, res) => {
  const result = await CouponService.checkCouponCode(req.params.code);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Coupon check successfully',
    data: result,
  });
});

const getAllCoupons = catchAsync(async (req, res) => {
  const result = await CouponService.getAllCoupons();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Coupons fetched successfully',
    data: result,
  });
});

const updateCouponById = catchAsync(async (req, res) => {
  const result = await CouponService.updateCouponById(req.params.id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Coupon updated successfully',
    data: result,
  });
});

const deleteCouponById = catchAsync(async (req, res) => {
  const result = await CouponService.deleteCouponById(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Coupon deleted successfully',
    data: result,
  });
});

export const CouponController = {
  createCoupon,
  getCouponById,
  getAllCoupons,
  updateCouponById,
  deleteCouponById,
  checkCouponCode,
};
