"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryValidations = void 0;
const zod_1 = require("zod");
const createCategoryValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Category name is required' }),
        logo: zod_1.z
            .string({ required_error: 'Category logo is required' })
            .url({ message: 'Invalid URL' }),
    }),
});
const updateCategoryValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        logo: zod_1.z.string().url().optional(),
    }),
});
exports.CategoryValidations = {
    createCategoryValidation,
    updateCategoryValidation,
};
