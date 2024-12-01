import { Summary } from '@prisma/client';
import prisma from '../../../db/db.config';

const createSummaryIntoD = async (payload: Summary) => {
  const result = await prisma.summary.create({
    data: payload,
  });

  return result;
};

const getSummaryById = async (id: string) => {
  const result = await prisma.summary.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const getSummary = async () => {
  const result = await prisma.summary.findFirst();

  return result;
};

const updateSummerFromDB = async (id: string, payload: Summary) => {
  const result = await prisma.summary.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteSummaryById = async (id: string) => {
  const result = await prisma.summary.delete({
    where: {
      id,
    },
  });

  return result;
};

export const SummaryServices = {
  createSummaryIntoD,
  getSummaryById,
  getSummary,
  updateSummerFromDB,
  deleteSummaryById,
};
