import { Education } from '@prisma/client';
import prisma from '../../../db/db.config';

const createEducationIntoDB = async (payload: Education) => {
  const result = await prisma.education.create({ data: payload });

  return result;
};

const getEducationsFromDB = async () => {
  const result = await prisma.education.findMany();

  return result;
};

const getEducationFromDB = async (id: string) => {
  const result = await prisma.education.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateEducationFromDB = async (id: string, payload: Education) => {
  const result = await prisma.education.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteEducationFromDB = async (id: string) => {
  const result = await prisma.education.delete({
    where: {
      id,
    },
  });

  return result;
};

export const EducationServices = {
  createEducationIntoDB,
  getEducationsFromDB,
  getEducationFromDB,
  updateEducationFromDB,
  deleteEducationFromDB,
};
