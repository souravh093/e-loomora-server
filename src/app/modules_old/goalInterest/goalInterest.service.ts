import { GoalInterest } from '@prisma/client';
import prisma from '../../../db/db.config';
import AppError from '../../errors/AppError';

const createGoalInterestIntoDB = async (payload: GoalInterest) => {
  return await prisma.goalInterest.create({ data: payload });
};

const getGoalInterestFromDB = async () => {
  return await prisma.goalInterest.findFirst();
};

const updateGoalInterestIntoDB = async (payload: GoalInterest) => {
  const isGoalInterestExist = await prisma.goalInterest.findFirst();

  if (!isGoalInterestExist) {
    throw new AppError(404, 'GoalInterest not found');
  }

  return await prisma.goalInterest.update({
    where: { id: isGoalInterestExist?.id },
    data: payload,
  });
};

const deleteGoalInterestFromDB = async () => {
  const isGoalInterestExist = await prisma.goalInterest.findFirst();

  if (!isGoalInterestExist) {
    throw new AppError(404, 'GoalInterest not found');
  }

  return await prisma.goalInterest.delete({
    where: { id: isGoalInterestExist.id },
  });
};

export const GoalInterestService = {
  createGoalInterestIntoDB,
  getGoalInterestFromDB,
  updateGoalInterestIntoDB,
  deleteGoalInterestFromDB,
};
