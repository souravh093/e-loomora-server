"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewValidation = void 0;
const zod_1 = require("zod");
const productReviewValidation = zod_1.z.object({
    body: zod_1.z.object({
        content: zod_1.z.string({ required_error: 'Content is required' }),
        rating: zod_1.z
            .number({ required_error: 'Rating is required' })
            .int()
            .min(1, 'Rating must be between 1 and 5')
            .max(5, 'Rating must be between 1 and 5'),
        productId: zod_1.z.string({ required_error: 'Product ID is required' }),
        userId: zod_1.z.string({ required_error: 'User ID is required' }),
    }),
});
const replayReviewValidation = zod_1.z.object({
    body: zod_1.z.object({
        content: zod_1.z.string({ required_error: 'Content is required' }),
        reviewId: zod_1.z.string({ required_error: 'Review ID is required' }),
    }),
});
exports.ReviewValidation = {
    productReviewValidation,
    replayReviewValidation,
};
