import { z } from 'zod';

const createSuccessValidationSchema = z.object({
  body: z.object({
    relizedProject: z.string({ required_error: 'relizedProject is required' }),
    yearsOfExperience: z.string({
      required_error: 'yearsOfExperience is required',
    }),
    regionalOffice: z.string({ required_error: 'regionalOffice is required' }),
  }),
});

const updateSuccessValidationSchema = z.object({
  body: z.object({
    relizedProject: z.number().optional(),
    yearsOfExperience: z.number().optional(),
    regionalOffice: z.number().optional(),
    rating: z.number().optional(),
  }),
});

export const SuccessValidation = {
  createSuccessValidationSchema,
  updateSuccessValidationSchema,
};
