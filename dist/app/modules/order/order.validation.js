"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidations = void 0;
const zod_1 = require("zod");
const createOrderValidation = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({ required_error: 'User Id is required' }),
        shopId: zod_1.z.string({ required_error: 'Shop Id is required' }),
        totalAmount: zod_1.z.number({ required_error: 'Total Amount is required' }),
        orderItem: zod_1.z.array(zod_1.z.object({
            productId: zod_1.z.string({ required_error: 'Product Id is required' }),
            quantity: zod_1.z.number({ required_error: 'Quantity is required' }),
            price: zod_1.z.number({ required_error: 'Price is required' }),
        })),
        shippingAddress: zod_1.z.object({
            userId: zod_1.z.string({ required_error: 'User Id is required' }),
            address: zod_1.z.string({ required_error: 'Address is required' }),
            city: zod_1.z.string({ required_error: 'City is required' }),
            state: zod_1.z.string({ required_error: 'State is required' }),
            phone: zod_1.z.string({ required_error: 'Phone is required' }),
            country: zod_1.z.string({ required_error: 'Country is required' }),
            zip: zod_1.z.string({ required_error: 'Zip is required' }),
        }),
    }),
});
exports.OrderValidations = {
    createOrderValidation,
};
