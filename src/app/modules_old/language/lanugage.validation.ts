import { z } from 'zod';

const createLanguageValidationSchema = z.object({
  body: z.object({
    launguage: z.string({ required_error: 'Language is required' }),
    nativeName: z.string({ required_error: 'Native name is required' }),
    level: z.string({ required_error: 'Level is required' }),
  }),
});

const updateLanguageValidationSchema = z.object({
  body: z.object({
    launguage: z.string().optional(),
    nativeName: z.string().optional(),
    level: z.string().optional(),
  }),
});

export const LanguageValidations = {
  createLanguageValidationSchema,
  updateLanguageValidationSchema,
};
