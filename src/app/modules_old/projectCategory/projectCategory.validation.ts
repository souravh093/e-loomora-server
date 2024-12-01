import { z } from 'zod';

const createProjectCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    slogan: z.string({ required_error: 'Slogan is required' }),
  }),
});

const updateProjectCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    slogan: z.string().optional(),
  }),
});

export const ProjectCategoryValidation = {
  createProjectCategoryValidationSchema,
  updateProjectCategoryValidationSchema,
};
