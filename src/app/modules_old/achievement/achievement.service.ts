import { Achievement } from '@prisma/client';
import prisma from '../../../db/db.config';
import AppError from '../../errors/AppError';

const createAchievementIntoDB = async (payload: Achievement) => {
  const achievement = await prisma.achievement.create({ data: payload });

  return achievement;
};

const getAchievementFromDB = async () => {
  const achievements = await prisma.achievement.findFirst();

  return achievements;
};

const updateAchievementIntoDB = async (payload: Achievement) => {
  const isAchievementExist = await prisma.achievement.findFirst();

  if (!isAchievementExist) {
    throw new AppError(404, 'Achievement not found');
  }

  const achievement = await prisma.achievement.update({
    where: {
      id: isAchievementExist.id,
    },
    data: payload,
  });

  return achievement;
};

const deleteAchievementFromDB = async () => {
  const isAchievementExist = await prisma.achievement.findFirst();

  if (!isAchievementExist) {
    throw new AppError(404, 'Achievement not found');
  }

  const achievement = await prisma.achievement.delete({
    where: {
      id: isAchievementExist.id,
    },
  });

  return achievement;
};

export const AchievementServices = {
  createAchievementIntoDB,
  getAchievementFromDB,
  updateAchievementIntoDB,
  deleteAchievementFromDB,
};
