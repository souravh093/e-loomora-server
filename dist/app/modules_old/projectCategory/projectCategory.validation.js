"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectCategoryValidation = void 0;
const zod_1 = require("zod");
const createProjectCategoryValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Name is required' }),
        slogan: zod_1.z.string({ required_error: 'Slogan is required' }),
    }),
});
const updateProjectCategoryValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        slogan: zod_1.z.string().optional(),
    }),
});
exports.ProjectCategoryValidation = {
    createProjectCategoryValidationSchema,
    updateProjectCategoryValidationSchema,
};
