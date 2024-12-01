import { Experience, Prisma } from '@prisma/client';
import prisma from '../../../db/db.config';
import { buildPrismaQuery } from '../../builder/prismaBuilderQuery';

const createExperienceIntoDB = async (payload: Experience) => {
  const result = await prisma.experience.create({
    data: payload,
  });

  return result;
};

const getExperiencesFromDB = async (query: any) => {
  const experienceQuery = buildPrismaQuery<
    Prisma.ExperienceWhereInput,
    Prisma.ExperienceOrderByWithRelationInput
  >({
    searchFields: ['projectName', 'companyName', 'location'],
    searchQuery: query.searchQuery,
    filter: query.filter,
    orderBy: query.orderBy,
    page: query.page,
    pageSize: query.perPage,
  });

  const totalItems = await prisma.experience.count({
    where: experienceQuery.where,
  });

  const currentPage = Number(query.page) || 1;
  const totalPages = Math.ceil(totalItems / experienceQuery.take);

  const result = await prisma.experience.findMany({
    ...experienceQuery,
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

const getExperienceFromDB = async (id: string) => {
  const result = await prisma.experience.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateExperienceFromDB = async (id: string, payload: Experience) => {
  const result = await prisma.experience.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteExperienceFromDB = async (id: string) => {
  const result = await prisma.experience.delete({
    where: {
      id,
    },
  });

  return result;
};

export const ExperienceServices = {
  createExperienceIntoDB,
  getExperienceFromDB,
  getExperiencesFromDB,
  updateExperienceFromDB,
  deleteExperienceFromDB,
};
