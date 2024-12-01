import { z } from 'zod';

const contactValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Invalid email' }),
    message: z.string({ required_error: 'Message is required' }),
  }),
});

export const ContactValidation = {
  contactValidationSchema,
};
