import { z } from 'zod';

const createSkillValidationSchema = z.object({
  body: z.object({
    category: z.string({ required_error: 'Category is required' }),
    name: z.string({ required_error: 'Name is required' }),
  }),
});

const updateSkillValidationSchema = z.object({
  body: z.object({
    category: z.string({ required_error: 'Category is required' }).optional(),
    name: z.string({ required_error: 'Name is required' }).optional(),
  }),
});

export const SkillValidations = {
  createSkillValidationSchema,
  updateSkillValidationSchema,
};
