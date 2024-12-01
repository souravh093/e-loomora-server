import { z } from 'zod';

const authValidation = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is Required' }).email(),
    password: z.string({ required_error: 'Password is Required' }),
  }),
});

export const AuthValidations = {
  authValidation,
};
