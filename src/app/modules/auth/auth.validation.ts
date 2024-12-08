import { z } from 'zod';

const loginValidation = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Invalid email' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

const forgetPasswordValidation = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Invalid email' }),
  }),
});

const resetPasswordValidation = z.object({
  body: z.object({
    id: z.string({ required_error: 'Id is required' }),
    newPassword: z.string({ required_error: 'New password is required' }),
    token: z.string({ required_error: 'Token is required' }),
  }),
});

const changePasswordValidation = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Invalid email' }),
    oldPassword: z.string({ required_error: 'Old password is required' }),
    newPassword: z.string({ required_error: 'New password is required' }),
  }),
});

export const AuthValidations = {
  loginValidation,
  forgetPasswordValidation,
  resetPasswordValidation,
  changePasswordValidation,
};
