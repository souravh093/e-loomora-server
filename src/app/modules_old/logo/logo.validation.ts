import { z } from 'zod';

const LogoValidation = z.object({
  file: z
    .object({})
    .optional()
    .refine((data) => data !== undefined, {
      message: 'Logo image is required',
    }),
});

export const LogoValidations = {
  LogoValidation,
};
