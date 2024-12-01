import { z } from 'zod';

const socialMediaValidationSchema = z.object({
  body: z.object({
    facebookUrl: z
      .string({ required_error: 'Facebook URL is required' })
      .optional(),
    twitterUrl: z
      .string({ required_error: 'Twitter URL is required' })
      .optional(),
    instagramUrl: z
      .string({ required_error: 'Instagram URL is required' })
      .optional(),
    linkedinUrl: z
      .string({ required_error: 'LinkedIn URL is required' })
      .optional(),
    youtubeUrl: z
      .string({ required_error: 'Youtube URL is required' })
      .optional(),
  }),
});

export default socialMediaValidationSchema;
