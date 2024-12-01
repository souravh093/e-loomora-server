import { Blog, Prisma } from '@prisma/client';
import prisma from '../../../db/db.config';
import AppError from '../../errors/AppError';
import { getImagePathToUnlink } from '../../utils/getFilePathToUnlink';
import fs from 'fs';
import { buildPrismaQuery } from '../../builder/prismaBuilderQuery';

const createBlogIntoDB = async (payload: Blog, images: string[]) => {
  const result = await prisma.$transaction(async (prisma) => {
    const blog = await prisma.blog.create({
      data: {
        ...payload,
        BlogImages: {
          create: images.map((image) => ({
            image,
          })),
        },
      },
      include: {
        BlogImages: true,
      },
    });

    return blog;
  });

  return result;
};

const updateBlogIntoDB = async (id: string, payload: Blog) => {
  const isBlogExist = await prisma.blog.findUnique({
    where: {
      id,
    },
  });

  if (!isBlogExist) {
    throw new AppError(404, 'Blog not found');
  }

  const result = await prisma.blog.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteBlogFromDB = async (id: string) => {
  const isBlogExist = await prisma.blog.findUnique({
    where: {
      id,
    },
    include: {
      BlogImages: true,
    },
  });

  if (!isBlogExist) {
    throw new AppError(404, 'Blog not found');
  }

  await prisma.blog.delete({
    where: {
      id,
    },
  });

  if (isBlogExist.BlogImages.length > 0) {
    isBlogExist.BlogImages.forEach((image) => {
      const imageToUnlink = getImagePathToUnlink(image.image);
      if (fs.existsSync(imageToUnlink)) {
        fs.unlinkSync(imageToUnlink);
      }
    });
  }
};

const getBlogFromDB = async (id: string) => {
  const blog = await prisma.blog.findUnique({
    where: { id },
    include: {
      BlogImages: true,
    },
  });

  if (!blog) {
    throw new AppError(404, 'Blog not found');
  }

  return blog;
};

const getBlogsFromDB = async (query: any) => {
  const blogsQuery = buildPrismaQuery<
    Prisma.BlogWhereInput,
    Prisma.BlogOrderByWithRelationInput
  >({
    searchFields: ['name'],
    searchQuery: query.searchQuery,
    filter: query.filter,
    orderBy: query.orderBy ? JSON.parse(query.orderBy) : {},
    page: query.page,
    pageSize: query.perPage,
  });

  const totalItems = await prisma.blog.count({
    where: blogsQuery.where,
  });

  const currentPage = Number(query.page) || 1;
  const totalPages = Math.ceil(totalItems / blogsQuery.take);

  const result = await prisma.blog.findMany({
    ...blogsQuery,
    include: {
      BlogImages: true,
      category: true,
    },
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

export const BlogServices = {
  createBlogIntoDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
  getBlogFromDB,
  getBlogsFromDB,
};
