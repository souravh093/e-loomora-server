"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExperienceValidations = void 0;
const zod_1 = require("zod");
const createExperienceValidation = zod_1.z.object({
    body: zod_1.z.object({
        projectName: zod_1.z.string({ required_error: 'Project Name is required' }),
        companyName: zod_1.z.string({ required_error: 'Company Name is required' }),
        location: zod_1.z.string({ required_error: 'Location is required' }),
        startDate: zod_1.z.date({ required_error: 'Start Date is required' }),
        endDate: zod_1.z.date({ required_error: 'End Date is required' }),
        description: zod_1.z.string({ required_error: 'Description is required' }),
    }),
});
const updateExperienceValidation = zod_1.z.object({
    body: zod_1.z.object({
        projectName: zod_1.z.string().optional(),
        companyName: zod_1.z.string().optional(),
        location: zod_1.z.string().optional(),
        startDate: zod_1.z.date().optional(),
        endDate: zod_1.z.date().optional(),
        description: zod_1.z.string().optional(),
    }),
});
exports.ExperienceValidations = {
    createExperienceValidation,
    updateExperienceValidation,
};
