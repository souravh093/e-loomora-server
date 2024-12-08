import { z } from 'zod';

const createShopValidation = z.object({
  body: z.object({
    name: z.string({ required_error: 'Shop name is required' }),
    logoUrl: z
      .string({ required_error: 'Shop logo is required' })
      .url({ message: 'Invalid URL' }),
    description: z.string({ required_error: 'Shop description is required' }),
    ownerId: z.string({ required_error: 'Shop owner is required' }),
  }),
});

const updateShopValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    logoUrl: z.string().url().optional(),
    description: z.string().optional(),
  }),
});

export const ShopValidations = {
  createShopValidation,
  updateShopValidation,
};
