import { z } from 'zod';

const createShopFollowIntoDB = z.object({
  body: z.object({
    userId: z.string({ required_error: 'User Id is required' }),
    shopId: z.string({ required_error: 'Shop Id is required' }),
  }),
});

export const ShopFollowValidations = {
  createShopFollowIntoDB,
};
