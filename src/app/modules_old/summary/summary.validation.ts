import { z } from 'zod';

const createSummaryValidation = z.object({
  body: z.object({
    summary: z.string({ required_error: 'Summary is required' }),
  }),
});

const updateSummaryValidation = z.object({
  body: z.object({
    summary: z.string({ required_error: 'Summary is required' }),
  }),
});

export const SummerValidations = {
  createSummaryValidation,
  updateSummaryValidation,
};
