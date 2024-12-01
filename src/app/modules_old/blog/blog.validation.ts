import { z } from 'zod';

const createBlogValidation = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    description: z.string({ required_error: 'Description is required' }),
    categoryId: z.string({ required_error: 'Category is required' }),
  }),
});

const updateBlogValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    categoryId: z.string().optional(),
  }),
});

export const BlogValidations = {
  createBlogValidation,
  updateBlogValidation,
};
