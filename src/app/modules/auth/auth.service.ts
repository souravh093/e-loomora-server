import { User } from '@prisma/client';
import prisma from '../../../db/db.config';
import bcrypt from 'bcryptjs';
import AppError from '../../errors/AppError';
import config from '../../config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { sendEmail } from '../../utils/sendEmail';
import { createToke } from './auth.utils';

const loginUserFromDB = async (payload: User) => {
  const userExists = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });

  const isPasswordMatch = bcrypt.compareSync(
    payload.password,
    userExists.password,
  );

  if (!isPasswordMatch) {
    throw new AppError(404, 'Invalid email or password');
  }

  const jwtPayload = {
    id: userExists.id,
    email: userExists.email,
    role: userExists.role,
    status: userExists.status,
  };

  const accessToken = createToke(
    jwtPayload,
    config.jwtSecret as string,
    '365d',
  );

  return {
    accessToken,
  };
};

const forgetPasswordIntoDB = async (email: string) => {
  const findUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!findUser) {
    throw new AppError(404, 'User not found');
  }

  const token = jwt.sign(
    { email, id: findUser.id },
    config.jwtSecret as string,
    { expiresIn: '1h' },
  );

  const resetLink = `${config.clientUrl}/reset-password/?id=${findUser.id}&token=${token}`;

  sendEmail(resetLink, email);

  return 'Reset link sent to your email';
};

const resetPasswordIntoDB = async (
  id: string,
  newPassword: string,
  token: string | undefined,
) => {
  const findUser = await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });

  if (!token) {
    throw new AppError(400, 'Token is required');
  }

  const decoded = jwt.verify(token, config.jwtSecret as string) as JwtPayload;

  if (decoded.id !== findUser.id) {
    throw new AppError(401, 'Invalid token');
  }

  const hashedPassword = bcrypt.hashSync(newPassword, 10);

  await prisma.user.update({
    where: {
      id,
    },
    data: {
      password: hashedPassword,
    },
  });

  return 'Password reset successfully';
};

const changePasswordIntDB = async (
  email: string,
  oldPassword: string,
  newPassword: string,
) => {
  const findUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!findUser) {
    throw new AppError(404, 'User not found');
  }

  const isPasswordMatch = bcrypt.compareSync(oldPassword, findUser.password);

  if (!isPasswordMatch) {
    throw new AppError(404, 'Invalid password');
  }

  const hashedPassword = bcrypt.hashSync(newPassword, 10);

  await prisma.user.update({
    where: {
      email,
    },
    data: {
      password: hashedPassword,
    },
  });

  return 'Password changed successfully';
};

export const AuthServices = {
  loginUserFromDB,
  forgetPasswordIntoDB,
  resetPasswordIntoDB,
  changePasswordIntDB,
};
