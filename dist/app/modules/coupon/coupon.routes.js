"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const validationRequest_1 = __importDefault(require("../../middlewares/validationRequest"));
const coupon_validation_1 = require("./coupon.validation");
const coupon_service_1 = require("./coupon.service");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)(client_1.Role.ADMIN, client_1.Role.VENDOR), (0, validationRequest_1.default)(coupon_validation_1.CouponValidation.createCouponValidation), coupon_service_1.CouponController.createCoupon);
router.get('/', coupon_service_1.CouponController.getAllCoupons);
router.get('/:id', coupon_service_1.CouponController.getCouponById);
router.put('/:id', (0, auth_1.default)(client_1.Role.ADMIN, client_1.Role.VENDOR), coupon_service_1.CouponController.updateCouponById);
router.delete('/:id', (0, auth_1.default)(client_1.Role.ADMIN, client_1.Role.VENDOR), coupon_service_1.CouponController.deleteCouponById);
exports.CouponRoutes = router;
