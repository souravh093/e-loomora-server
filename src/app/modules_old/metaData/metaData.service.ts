import { MetaData } from '@prisma/client';
import prisma from '../../../db/db.config';

const upsertMetaDataIntoDB = async (payload: MetaData) => {
  const findMetaData = await prisma.metaData.findFirst();

  let result;
  if (!findMetaData) {
    result = await prisma.metaData.create({
      data: payload,
    });
  } else {
    result = await prisma.metaData.update({
      where: {
        id: findMetaData.id,
      },
      data: {
        ...payload,
        favicon: payload.favicon ? payload.favicon : findMetaData.favicon,
      },
    });
  }

  return result;
};

const getMetaDataFromDB = async () => {
  const result = await prisma.metaData.findFirst();

  return result;
};

export const MetaDataServices = {
  upsertMetaDataIntoDB,
  getMetaDataFromDB,
};
