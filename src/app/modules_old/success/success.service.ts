import { Success } from '@prisma/client';
import prisma from '../../../db/db.config';

const upsertSuccessIntoDB = async (payload: Success) => {
  const findSuccess = await prisma.success.findFirst();

  let result;

  if (!findSuccess) {
    result = await prisma.success.create({
      data: payload,
    });
  } else {
    result = await prisma.success.update({
      where: {
        id: findSuccess.id,
      },
      data: payload,
    });
  }

  return result;
};

const getSuccessFromDB = async () => {
  const result = await prisma.success.findFirst();

  return result;
};

export const SuccessServices = {
  upsertSuccessIntoDB,
  getSuccessFromDB,
};
