import { z } from 'zod';

const createAdminContactValidationSchema = z.object({
  body: z.object({
    location: z.string({ required_error: 'Location is required' }),
    phone: z.string({ required_error: 'Phone is required' }),
    email: z.string({ required_error: 'Email is required' }).email({ message: 'Invalid email' }),
  }),
});

const updateAdminContactValidationSchema = z.object({
  body: z.object({
    location: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email().optional(),
  }),
});

export const AdminContactValidation = {
  createAdminContactValidationSchema,
  updateAdminContactValidationSchema,
};
