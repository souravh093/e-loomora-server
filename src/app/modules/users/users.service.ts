import { Role, User } from '@prisma/client';
import bcryptjs from 'bcryptjs';
import prisma from '../../../db/db.config';
import { buildPrismaQuery } from '../../builder/prismaBuilderQuery';

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

const getUsersFromDB = async (query: Record<string, any>) => {
  const userQuery = buildPrismaQuery({
    searchFields: ['name', 'email'],
    searchTerm: query.searchTerm,
    filter: query.filter && JSON.parse(query.filter),
    orderBy: query.orderBy && JSON.parse(query.orderBy),
    limit: query.limit,
    page: query.page,
  });

  const totalUsers = await prisma.user.count({
    where: userQuery.where,
  });

  const totalPages = Math.ceil(totalUsers / userQuery.take);

  const result = await prisma.user.findMany({
    ...userQuery,
  });

  return {
    meta: {
      total: totalUsers,
      limit: userQuery.take,
      page: totalPages,
    },
    result,
  };
};

const getUserByIdFromDB = async (id: string) => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateUserByIdFromDB = async (id: string, payload: User) => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteUserByIdFromDB = async (id: string) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });

  await prisma.user.delete({
    where: {
      id,
    },
  });

  return 'User deleted successfully';
};

export const UserServices = {
  createUserIntoDB,
  createVendorIntoDB,
  getUsersFromDB,
  getUserByIdFromDB,
  updateUserByIdFromDB,
  deleteUserByIdFromDB,
};
