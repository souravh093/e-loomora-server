"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopValidations = void 0;
const zod_1 = require("zod");
const createShopValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Shop name is required' }),
        logoUrl: zod_1.z
            .string({ required_error: 'Shop logo is required' })
            .url({ message: 'Invalid URL' }),
        description: zod_1.z.string({ required_error: 'Shop description is required' }),
        ownerId: zod_1.z.string({ required_error: 'Shop owner is required' }),
    }),
});
const updateShopValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        logoUrl: zod_1.z.string().url().optional(),
        description: zod_1.z.string().optional(),
    }),
});
exports.ShopValidations = {
    createShopValidation,
    updateShopValidation,
};
