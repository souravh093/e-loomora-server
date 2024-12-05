"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoValidations = void 0;
const zod_1 = require("zod");
const LogoValidation = zod_1.z.object({
    file: zod_1.z
        .object({})
        .optional()
        .refine((data) => data !== undefined, {
        message: 'Logo image is required',
    }),
});
exports.LogoValidations = {
    LogoValidation,
};
