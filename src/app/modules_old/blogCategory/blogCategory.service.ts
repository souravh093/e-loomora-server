import { BlogCategory } from '@prisma/client';
import prisma from '../../../db/db.config';

const createBlogCategoryIntoDB = async (payload: BlogCategory) => {
  const result = await prisma.blogCategory.create({
    data: payload,
  });

  return result;
};

const getBlogCategoryFromDB = async (id: string) => {
  const result = await prisma.blogCategory.findUnique({
    where: {
      id: id,
    },
    include: {
      Blog: {
        include: {
          BlogImages: true,
        },
      },
    },
  });

  return result;
};

const updateBlogCategoryFromDB = async (id: string, payload: BlogCategory) => {
  const result = await prisma.blogCategory.update({
    where: {
      id: id,
    },
    data: payload,
  });

  return result;
};

const deleteBlogCategoryFromDB = async (id: string) => {
  const result = await prisma.blogCategory.delete({
    where: {
      id: id,
    },
  });

  return result;
};

export const BlogCategoryServices = {
  createBlogCategoryIntoDB,
  getBlogCategoryFromDB,
  updateBlogCategoryFromDB,
  deleteBlogCategoryFromDB,
};
