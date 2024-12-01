import { Footer } from '@prisma/client';
import prisma from '../../../db/db.config';

const upsertFooterIntoDB = async (payload: Footer) => {
  const findFooter = await prisma.footer.findFirst();

  let result;

  if (!findFooter) {
    result = await prisma.footer.create({
      data: payload,
    });
  } else {
    result = await prisma.footer.update({
      where: {
        id: findFooter.id,
      },
      data: payload,
    });
  }

  return result;
};

const getFooterFromDB = async () => {
  const result = await prisma.footer.findFirst();

  return result;
};

export const FooterServices = {
  upsertFooterIntoDB,
  getFooterFromDB,
};
