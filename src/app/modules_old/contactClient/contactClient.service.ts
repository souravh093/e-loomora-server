import { ContactClient, Prisma } from '@prisma/client';
import prisma from '../../../db/db.config';
import { buildPrismaQuery } from '../../builder/prismaBuilderQuery';
import AppError from '../../errors/AppError';

const createContactClientIntoDB = async (payload: ContactClient) => {
  const result = await prisma.contactClient.create({
    data: payload,
  });

  return result;
};

const getContactClientFromDB = async (query: Record<string, any>) => {
  const contactClientQuery = buildPrismaQuery<
    Prisma.ContactClientWhereInput,
    Prisma.ContactClientOrderByWithRelationInput
  >({
    searchFields: ['name', 'email'],
    searchQuery: query.searchQuery,
    filter: query.filter,
    orderBy: query.orderBy ? JSON.parse(query.orderBy) : {},
    page: query.page,
    pageSize: query.pageSize,
  });

  const totalItems = await prisma.contactClient.count({
    where: contactClientQuery.where,
  });
  const currentPage = Number(query.page) || 1;
  const totalPages = Math.ceil(totalItems / contactClientQuery.take);

  const result = await prisma.contactClient.findMany({
    ...contactClientQuery,
  });

  return {
    meta: {
      totalItems,
      totalPages,
      currentPage,
    },
    result,
  };
};

const getSingleContactClientFromDB = async (id: string) => {
  const result = await prisma.contactClient.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const deleteContactClientFromDB = async (id: string) => {
  const findContactClient = await prisma.contactClient.findUnique({
    where: {
      id,
    },
  });

  if (!findContactClient) {
    throw new AppError(404, 'Contact client not found');
  }

  const result = await prisma.contactClient.delete({
    where: {
      id,
    },
  });

  return result;
};

export const ContactClientServices = {
  createContactClientIntoDB,
  getContactClientFromDB,
  getSingleContactClientFromDB,
  deleteContactClientFromDB,
};
