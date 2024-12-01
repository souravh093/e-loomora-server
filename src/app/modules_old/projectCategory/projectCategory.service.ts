import { Prisma, ProjectCategory } from '@prisma/client';
import prisma from '../../../db/db.config';
import { buildPrismaQuery } from '../../builder/prismaBuilderQuery';

const createProjectCategoryIntoDB = async (payload: ProjectCategory) => {
  const result = await prisma.projectCategory.create({
    data: payload,
  });

  return result;
};

const getProjectCategoriesFromDB = async (query: any) => {
  const result = buildPrismaQuery<
    Prisma.ProjectCategoryWhereInput,
    Prisma.ProjectCategoryOrderByWithRelationInput
  >({
    searchFields: ['name'],
    searchQuery: query.searchQuery,
    filter: query.filter,
    orderBy: query.orderBy,
    page: query.page,
    pageSize: query.pageSize,
  });

  const totalItems = await prisma.projectCategory.count({
    where: result.where,
  });

  const totalPages = Math.ceil(totalItems / result.take);
  const currentPage = Number(query.page || 1);
  const projectCategories = await prisma.projectCategory.findMany({
    ...result,
    include: {
      Project: {
        include: {
          ProjectImages: true,
        },
      },
    },
  });

  return {
    meta: {
      totalItems,
      totalPages,
      currentPage,
    },
    projectCategories,
  };
};

const singleProjectCategoryFromDB = async (id: string) => {
  const result = await prisma.projectCategory.findUnique({
    where: {
      id,
    },
    include: {
      Project: {
        include: {
          ProjectImages: true,
        },
      },
    },
  });

  return result;
};

export const ProjectCategoryServices = {
  createProjectCategoryIntoDB,
  getProjectCategoriesFromDB,
  singleProjectCategoryFromDB,
};
