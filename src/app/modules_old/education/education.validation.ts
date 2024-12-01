import { z } from 'zod';

const createEducationValidationSchema = z.object({
  body: z.object({
    organizationName: z.string({
      required_error: 'Organization Name is required',
    }),
    passingYear: z.string({ required_error: 'Passing Year is required' }),
    degreeName: z.string({ required_error: 'Degree Name is required' }),
    thesis: z.string({ required_error: 'Thesis is required' }),
    award: z.string({ required_error: 'Award is required' }),
    gpa: z.string({ required_error: 'GPA is required' }),
  }),
});

const updateEducationValidationSchema = z.object({
  body: z.object({
    organizationName: z.string().optional(),
    passingYear: z.string().optional(),
    degreeName: z.string().optional(),
    thesis: z.string().optional(),
    award: z.string().optional(),
    gpa: z.string().optional(),
  }),
});

export const EducationValidation = {
  createEducationValidationSchema,
  updateEducationValidationSchema,
};
