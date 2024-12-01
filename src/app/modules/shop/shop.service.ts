import { Shop } from '@prisma/client';
import prisma from '../../../db/db.config';
import { buildPrismaQuery } from '../../builder/prismaBuilderQuery';

const createShopIntoDB = async (payload: Shop) => {
  const result = await prisma.shop.create({
    data: payload,
  });

  return result;
};

const updateShopIntoDB = async (id: string, payload: Shop) => {
  await prisma.shop.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.shop.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteShopFromDB = async (id: string) => {
  await prisma.shop.findUniqueOrThrow({
    where: {
      id,
    },
  });

  await prisma.shop.delete({
    where: {
      id,
    },
  });
};

const getShopByIdFromDB = async (id: string) => {
  const result = await prisma.shop.findUniqueOrThrow({
    where: {
      id,
    },
  });

  return result;
};

const getShopsFromDB = async (query: Record<string, any>) => {
  const shopQuery = buildPrismaQuery({
    searchFields: ['name'],
    searchTerm: query.searchTerm,
    filter: query.filter && JSON.parse(query.filter),
    orderBy: query.orderBy && JSON.parse(query.orderBy),
    page: query.page,
    limit: query.limit,
  });

  const shopItems = await prisma.shop.count({
    where: shopQuery.where,
  });

  const totalPages = Math.ceil(shopItems / shopQuery.take);

  const result = await prisma.shop.findMany({
    ...shopQuery,
  });

  return {
    meta: {
      total: shopItems,
      limit: shopQuery.take,
      page: totalPages,
    },
    result,
  };
};

export const ShopServices = {
    createShopIntoDB,
    updateShopIntoDB,
    deleteShopFromDB,
    getShopByIdFromDB,
    getShopsFromDB,
}
