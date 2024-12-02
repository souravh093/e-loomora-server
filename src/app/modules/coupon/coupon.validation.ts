import { z } from 'zod';

const createCouponValidation = z.object({
  body: z.object({
    code: z.string().min(1).max(255),
    discount: z.number().min(0).max(100),
    expiryDate: z.string(),
  }),
});

export const CouponValidation = {
  createCouponValidation,
};
