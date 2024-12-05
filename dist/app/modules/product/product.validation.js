"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidations = void 0;
const zod_1 = require("zod");
const createProductValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Product name is required' }),
        description: zod_1.z.string({
            required_error: 'Product description is required',
        }),
        price: zod_1.z.number({ required_error: 'Product price is required' }),
        discount: zod_1.z.number().optional(),
        inventoryCount: zod_1.z.number({
            required_error: 'Product inventory count is required',
        }),
        productImages: zod_1.z
            .array(zod_1.z.object({
            url: zod_1.z
                .string({ required_error: 'Product image URL is required' })
                .url({ message: 'Invalid URL' }),
        }))
            .optional(),
        categoryId: zod_1.z.string({ required_error: 'Product category is required' }),
        shopId: zod_1.z.string({ required_error: 'Product shop is required' }),
    }),
});
const updateProductValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        price: zod_1.z.number().optional(),
        discount: zod_1.z.number().optional(),
        inventoryCount: zod_1.z.number().optional(),
    }),
});
exports.ProductValidations = {
    createProductValidation,
    updateProductValidation,
};
