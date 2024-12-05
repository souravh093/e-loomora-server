"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerValidation = void 0;
const zod_1 = require("zod");
const createBannerValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: 'Title is required' }),
        slogan: zod_1.z.string({ required_error: 'Slogan is required' }),
    }),
});
const updateBannerValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: 'Title is required' }).optional(),
        slogan: zod_1.z.string({ required_error: 'Slogan is required' }).optional(),
    }),
});
exports.BannerValidation = {
    createBannerValidationSchema,
    updateBannerValidationSchema,
};
