"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidations = void 0;
const zod_1 = require("zod");
const loginValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({ required_error: 'Email is required' })
            .email({ message: 'Invalid email' }),
        password: zod_1.z.string({ required_error: 'Password is required' }),
    }),
});
const forgetPasswordValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({ required_error: 'Email is required' })
            .email({ message: 'Invalid email' }),
    }),
});
const resetPasswordValidation = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string({ required_error: 'Id is required' }),
        newPassword: zod_1.z.string({ required_error: 'New password is required' }),
        token: zod_1.z.string({ required_error: 'Token is required' }),
    }),
});
const changePasswordValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({ required_error: 'Email is required' })
            .email({ message: 'Invalid email' }),
        oldPassword: zod_1.z.string({ required_error: 'Old password is required' }),
        newPassword: zod_1.z.string({ required_error: 'New password is required' }),
    }),
});
exports.AuthValidations = {
    loginValidation,
    forgetPasswordValidation,
    resetPasswordValidation,
    changePasswordValidation,
};
