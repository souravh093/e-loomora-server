"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectValidation = void 0;
const zod_1 = require("zod");
const createProjectValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Name is required' }),
        clientName: zod_1.z.string({ required_error: 'Client name is required' }),
        location: zod_1.z.string({ required_error: 'Location is required' }),
        locationUrl: zod_1.z.string({ required_error: 'Location URL is required' }),
        firstDescription: zod_1.z.string({
            required_error: 'First description is required',
        }),
        secondDescription: zod_1.z.string({
            required_error: 'Second description is required',
        }),
        thirdDescription: zod_1.z.string({
            required_error: 'Third description is required',
        }),
        categoryId: zod_1.z.string({ required_error: 'Category ID is required' }),
    }),
});
const updateProjectValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        clientName: zod_1.z.string().optional(),
        location: zod_1.z.string().optional(),
        locationUrl: zod_1.z.string().optional(),
        firstDescription: zod_1.z.string().optional(),
        secondDescription: zod_1.z.string().optional(),
        thirdDescription: zod_1.z.string().optional(),
    }),
});
exports.ProjectValidation = {
    createProjectValidationSchema,
    updateProjectValidationSchema,
};
