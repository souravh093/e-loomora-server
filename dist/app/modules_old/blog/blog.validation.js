"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogValidations = void 0;
const zod_1 = require("zod");
const createBlogValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Name is required' }),
        description: zod_1.z.string({ required_error: 'Description is required' }),
        categoryId: zod_1.z.string({ required_error: 'Category is required' }),
    }),
});
const updateBlogValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        categoryId: zod_1.z.string().optional(),
    }),
});
exports.BlogValidations = {
    createBlogValidation,
    updateBlogValidation,
};
