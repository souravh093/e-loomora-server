import { z } from 'zod';

const createBannerValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    slogan: z.string({ required_error: 'Slogan is required' }),
  }),
});

const updateBannerValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }).optional(),
    slogan: z.string({ required_error: 'Slogan is required' }).optional(),
  }),
});

export const BannerValidation = {
  createBannerValidationSchema,
  updateBannerValidationSchema,
};
