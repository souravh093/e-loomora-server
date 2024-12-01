import { Role, User } from '@prisma/client';
import bcryptjs from 'bcryptjs';
import prisma from '../../../db/db.config';

const createUserIntoDB = async (payload: User) => {
  const userData = {
    ...payload,
    role: Role.USER,
  };

  if (userData.password) {
    userData.password = await bcryptjs.hash(userData.password, 10);
  }

  const result = await prisma.user.create({
    data: userData,
  });

  return result;
};

const createVendorIntoDB = async (payload: User) => {
  const userData = {
    ...payload,
    role: Role.VENDOR,
  };

  if (userData.password) {
    userData.password = await bcryptjs.hash(userData.password, 10);
  }

  const result = await prisma.user.create({
    data: userData,
  });

  return result;
};


export const UserServices = {
  createUserIntoDB,
  createVendorIntoDB,
};
