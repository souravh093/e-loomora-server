import { Skill } from '@prisma/client';
import prisma from '../../../db/db.config';

const createSkillIntoDB = async (payload: Skill) => {
  const result = await prisma.skill.create({ data: payload });

  return result;
};

const getSkillsFromDB = async (query: Record<string, unknown>) => {
  const result = await prisma.skill.findMany({
    where: {
      category: query.category as string,
    },
  });

  return result;
};

const getSkillByIdFromDB = async (id: string) => {
  const result = await prisma.skill.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateSkillIntoDB = async (id: string, payload: Skill) => {
  const result = await prisma.skill.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteSkillFromDB = async (id: string) => {
  const result = await prisma.skill.delete({
    where: {
      id,
    },
  });

  return result;
};


export const SkillService = {
  createSkillIntoDB,
  getSkillsFromDB,
  getSkillByIdFromDB,
  updateSkillIntoDB,
  deleteSkillFromDB,
};
