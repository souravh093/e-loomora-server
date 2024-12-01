import { z } from 'zod';

const createCategoryValidation = z.object({
  body: z.object({
    name: z.string({ required_error: 'Category name is required' }),
    logo: z
      .string({ required_error: 'Category logo is required' })
      .url({ message: 'Invalid URL' }),
  }),
});

const updateCategoryValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    logo: z.string().url().optional(),
  }),
});

export const CategoryValidations = {
  createCategoryValidation,
  updateCategoryValidation,
};
