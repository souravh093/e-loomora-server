import { z } from 'zod';

const createProductValidation = z.object({
  body: z.object({
    name: z.string({ required_error: 'Product name is required' }),
    description: z.string({
      required_error: 'Product description is required',
    }),
    price: z.number({ required_error: 'Product price is required' }),
    discount: z.number().optional(),
    inventoryCount: z.number({
      required_error: 'Product inventory count is required',
    }),
    categoryId: z.string({ required_error: 'Product category is required' }),
    shopId: z.string({ required_error: 'Product shop is required' }),
  }),
});

const updateProductValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.number().optional(),
    discount: z.number().optional(),
    inventoryCount: z.number().optional(),
  }),
});

export const ProductValidations = {
  createProductValidation,
  updateProductValidation,
};
