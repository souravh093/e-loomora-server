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
exports.CouponService = void 0;
const db_config_1 = __importDefault(require("../../../db/db.config"));
const createCouponIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistCouponCode = yield db_config_1.default.coupon.findFirst({
        where: {
            code: payload.code,
        },
    });
    if (isExistCouponCode) {
        throw new Error('Coupon code already exists');
    }
    const result = yield db_config_1.default.coupon.create({
        data: payload,
    });
    return result;
});
const checkCouponCode = (code) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_config_1.default.coupon.findFirstOrThrow({
        where: {
            code,
        },
    });
    return result;
});
const getCouponById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_config_1.default.coupon.findUniqueOrThrow({
        where: {
            id,
        },
    });
    return result;
});
const getAllCoupons = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_config_1.default.coupon.findMany();
    return result;
});
const updateCouponById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_config_1.default.coupon.findUniqueOrThrow({
        where: {
            id,
        },
    });
    const result = yield db_config_1.default.coupon.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteCouponById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_config_1.default.coupon.findUniqueOrThrow({
        where: {
            id,
        },
    });
    const result = yield db_config_1.default.coupon.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.CouponService = {
    createCouponIntoDB,
    getCouponById,
    getAllCoupons,
    updateCouponById,
    deleteCouponById,
    checkCouponCode,
};
