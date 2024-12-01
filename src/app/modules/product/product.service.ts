import { Product } from '@prisma/client';
import prisma from '../../../db/db.config';
import { buildPrismaQuery } from '../../builder/prismaBuilderQuery';

const createProductIntoDB = async (payload: Product) => {
  const result = await prisma.product.create({
    data: payload,
  });

  return result;
};

const getProductById = async (id: string) => {
  const result = await prisma.product.findUniqueOrThrow({
    where: {
      id,
    },
  });

  return result;
};

const getProducts = async (query: Record<string, any>) => {
  const productQuery = buildPrismaQuery({
    searchFields: ['name'],
    searchTerm: query.searchTerm,
    filter: query.filter && JSON.parse(query.filter),
    orderBy: query.orderBy && JSON.parse(query.orderBy),
    page: query.page,
    limit: query.limit,
  });

  const productItems = await prisma.product.count({
    where: productQuery.where,
  });

  const totalPages = Math.ceil(productItems / query.limit);

  const result = await prisma.product.findMany({
    ...productQuery,
  });

  return {
    meta: {
      total: productItems,
      limit: query.limit,
      page: totalPages,
    },
    result,
  };
};

const updateProductInDB = async (id: string, payload: Product) => {
  await prisma.product.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.product.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteProductFromDB = async (id: string) => {
  await prisma.product.findUniqueOrThrow({
    where: {
      id,
    },
  });

  await prisma.product.delete({
    where: {
      id,
    },
  });
};

export const ProductService = {
  createProductIntoDB,
  getProductById,
  getProducts,
  updateProductInDB,
  deleteProductFromDB,
};
