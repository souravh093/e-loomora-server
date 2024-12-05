"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminContactValidation = void 0;
const zod_1 = require("zod");
const createAdminContactValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        location: zod_1.z.string({ required_error: 'Location is required' }),
        phone: zod_1.z.string({ required_error: 'Phone is required' }),
        email: zod_1.z.string({ required_error: 'Email is required' }).email({ message: 'Invalid email' }),
    }),
});
const updateAdminContactValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        location: zod_1.z.string().optional(),
        phone: zod_1.z.string().optional(),
        email: zod_1.z.string().email().optional(),
    }),
});
exports.AdminContactValidation = {
    createAdminContactValidationSchema,
    updateAdminContactValidationSchema,
};
