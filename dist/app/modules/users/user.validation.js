"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidations = void 0;
const zod_1 = require("zod");
const createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Name is required' }),
        email: zod_1.z
            .string({ required_error: 'Email is required' })
            .email({ message: 'Invalid email' }),
        password: zod_1.z
            .string({ required_error: 'Password is required' })
            .min(6, { message: 'Password must be at least 6 characters long' }),
        image: zod_1.z.string().optional(),
    }),
});
const updateUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Name is required' }).optional(),
        image: zod_1.z.string().optional(),
        status: zod_1.z.string().optional(),
    }),
});
exports.UserValidations = {
    createUserValidationSchema,
    updateUserValidationSchema,
};
