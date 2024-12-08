"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const coupon_controller_1 = require("./coupon.controller");
const createCoupon = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield coupon_controller_1.CouponService.createCouponIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Coupon created successfully',
        data: result,
    });
}));
const getCouponById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield coupon_controller_1.CouponService.getCouponById(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Coupon fetched successfully',
        data: result,
    });
}));
const checkCouponCode = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield coupon_controller_1.CouponService.checkCouponCode(req.params.code);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Coupon check successfully',
        data: result,
    });
}));
const getAllCoupons = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield coupon_controller_1.CouponService.getAllCoupons();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Coupons fetched successfully',
        data: result,
    });
}));
const updateCouponById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield coupon_controller_1.CouponService.updateCouponById(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Coupon updated successfully',
        data: result,
    });
}));
const deleteCouponById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield coupon_controller_1.CouponService.deleteCouponById(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Coupon deleted successfully',
        data: result,
    });
}));
exports.CouponController = {
    createCoupon,
    getCouponById,
    getAllCoupons,
    updateCouponById,
    deleteCouponById,
    checkCouponCode,
};
