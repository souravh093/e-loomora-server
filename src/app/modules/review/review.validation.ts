import { z } from 'zod';

const productReviewValidation = z.object({
  body: z.object({
    content: z.string({ required_error: 'Content is required' }),
    rating: z
      .number({ required_error: 'Rating is required' })
      .int()
      .min(1, 'Rating must be between 1 and 5')
      .max(5, 'Rating must be between 1 and 5'),

    productId: z.string({ required_error: 'Product ID is required' }),
    userId: z.string({ required_error: 'User ID is required' }),
  }),
});

const replayReviewValidation = z.object({
  body: z.object({
    content: z.string({ required_error: 'Content is required' }),
    reviewId: z.string({ required_error: 'Review ID is required' }),
  }),
});

export const ReviewValidation = {
  productReviewValidation,
  replayReviewValidation,
};
