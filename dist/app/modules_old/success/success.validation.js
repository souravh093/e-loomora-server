"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessValidation = void 0;
const zod_1 = require("zod");
const createSuccessValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        relizedProject: zod_1.z.string({ required_error: 'relizedProject is required' }),
        yearsOfExperience: zod_1.z.string({
            required_error: 'yearsOfExperience is required',
        }),
        regionalOffice: zod_1.z.string({ required_error: 'regionalOffice is required' }),
    }),
});
const updateSuccessValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        relizedProject: zod_1.z.number().optional(),
        yearsOfExperience: zod_1.z.number().optional(),
        regionalOffice: zod_1.z.number().optional(),
        rating: zod_1.z.number().optional(),
    }),
});
exports.SuccessValidation = {
    createSuccessValidationSchema,
    updateSuccessValidationSchema,
};
