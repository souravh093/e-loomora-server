import { z } from 'zod';

const footerValidationSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Footer is required' })
      .email({ message: 'Invalid email' })
      .optional(),

    slogan: z.string({ required_error: 'Footer is required' }).optional(),
  }),
});

export default footerValidationSchema;
