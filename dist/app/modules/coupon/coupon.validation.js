"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponValidation = void 0;
const zod_1 = require("zod");
const createCouponValidation = zod_1.z.object({
    body: zod_1.z.object({
        code: zod_1.z.string().min(1).max(255),
        discount: zod_1.z.number().min(0).max(100),
        expiryDate: zod_1.z.string().optional(),
    }),
});
exports.CouponValidation = {
    createCouponValidation,
};
