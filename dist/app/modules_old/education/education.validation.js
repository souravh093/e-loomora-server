"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EducationValidation = void 0;
const zod_1 = require("zod");
const createEducationValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        organizationName: zod_1.z.string({
            required_error: 'Organization Name is required',
        }),
        passingYear: zod_1.z.string({ required_error: 'Passing Year is required' }),
        degreeName: zod_1.z.string({ required_error: 'Degree Name is required' }),
        thesis: zod_1.z.string({ required_error: 'Thesis is required' }),
        award: zod_1.z.string({ required_error: 'Award is required' }),
        gpa: zod_1.z.string({ required_error: 'GPA is required' }),
    }),
});
const updateEducationValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        organizationName: zod_1.z.string().optional(),
        passingYear: zod_1.z.string().optional(),
        degreeName: zod_1.z.string().optional(),
        thesis: zod_1.z.string().optional(),
        award: zod_1.z.string().optional(),
        gpa: zod_1.z.string().optional(),
    }),
});
exports.EducationValidation = {
    createEducationValidationSchema,
    updateEducationValidationSchema,
};
