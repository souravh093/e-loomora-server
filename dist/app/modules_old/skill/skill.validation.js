"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillValidations = void 0;
const zod_1 = require("zod");
const createSkillValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        category: zod_1.z.string({ required_error: 'Category is required' }),
        name: zod_1.z.string({ required_error: 'Name is required' }),
    }),
});
const updateSkillValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        category: zod_1.z.string({ required_error: 'Category is required' }).optional(),
        name: zod_1.z.string({ required_error: 'Name is required' }).optional(),
    }),
});
exports.SkillValidations = {
    createSkillValidationSchema,
    updateSkillValidationSchema,
};
