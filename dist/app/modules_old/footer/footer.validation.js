"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const footerValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({ required_error: 'Footer is required' })
            .email({ message: 'Invalid email' })
            .optional(),
        slogan: zod_1.z.string({ required_error: 'Footer is required' }).optional(),
    }),
});
exports.default = footerValidationSchema;
