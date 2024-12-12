import { Product, ProductImage } from '@prisma/client';
import prisma from '../../../db/db.config';
import { buildPrismaQuery } from '../../builder/prismaBuilderQuery';
import { JwtPayload } from 'jsonwebtoken';

const createProductIntoDB = async (payload: any) => {
  const result = await prisma.product.create({
    data: {
      ...payload,
      productImage: {
        create: payload.productImage.map((image: string) => ({
          url: image,
        })),
      },
    },
    include: {
      productImage: true,
    },
  });

  return result;
};

const getProductById = async (id: string) => {
  const result = await prisma.product.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      productImage: true,
      review: {
        include: {
          replayReview: true,
          user: true,
        }
      },
      category: true,
      shop: true,
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

  const totalPages = Math.ceil(productItems / productQuery.take);

  const result = await prisma.product.findMany({
    ...productQuery,
    include: {
      productImage: true,
      review: true,
      category: true,
      shop: true,
    },
  });

  return {
    meta: {
      total: productItems,
      limit: productQuery.take,
      page: totalPages,
    },
    result,
  };
};

const getPrioritizeProduct = async (loggedUser: JwtPayload) => {
  const followedShop = await prisma.shopFollow.findMany({
    where: {
      userId: loggedUser.id,
    },
  });

  // how to get prioritize product from followedShop
  const result = await prisma.product.findMany({
    where: {
      shopId: {
        in: followedShop.map((shop) => shop.shopId),
      },
    },
    skip: 0,
    take: 10,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      productImage: true,
      review: true,
      category: true,
      shop: true,
    },
  });

  return result;
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

const deleteProductImageFromDB = async (id: string) => {
  await prisma.productImage.findUniqueOrThrow({
    where: {
      id,
    },
  });

  await prisma.productImage.delete({
    where: {
      id,
    },
  });

  return 'Image deleted successfully';
};

const createProductImageIntoDB = async (payload: ProductImage) => {
  const result = await prisma.productImage.create({
    data: payload,
  });

  return result;
};

export const ProductService = {
  createProductIntoDB,
  getProductById,
  getProducts,
  updateProductInDB,
  deleteProductFromDB,
  deleteProductImageFromDB,
  createProductImageIntoDB,
  getPrioritizeProduct,
};
