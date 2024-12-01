import { z } from 'zod';

const createBlogCategoryValidation = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
  }),
});

const updateBlogCategoryValidation = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
  }),
});

export const BlogCategoryValidations = {
  createBlogCategoryValidation,
  updateBlogCategoryValidation,
};
