import { Category } from '@prisma/client';
import prisma from '../../../db/db.config';

const createCategoryIntoDB = async (payload: Category) => {
  const result = await prisma.category.create({
    data: payload,
  });

  return result;
};

const getCategoriesFromDB = async () => {
  const result = await prisma.category.findMany();

  return result;
};

const getCategoryByIdFromDB = async (id: string) => {
  const result = await prisma.category.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      product: true,
    },
  });

  return result;
};

const updateCategoryIntoDB = async (id: string, payload: Category) => {
  await prisma.category.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.category.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteCategoryFromDB = async (id: string) => {
  await prisma.category.findUniqueOrThrow({
    where: {
      id,
    },
  });

  await prisma.category.delete({
    where: {
      id,
    },
  });

  return 'Category deleted successfully';
};

export const CategoryService = {
  createCategoryIntoDB,
  getCategoriesFromDB,
  getCategoryByIdFromDB,
  updateCategoryIntoDB,
  deleteCategoryFromDB,
};
