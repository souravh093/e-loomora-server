import { SocialMedia } from '@prisma/client';
import prisma from '../../../db/db.config';

const upsertSocialMediaIntoDB = async (payload: SocialMedia) => {
  const findSocialMedia = await prisma.socialMedia.findFirst();

  let result;
  if (!findSocialMedia) {
    result = await prisma.socialMedia.create({
      data: payload,
    });
  } else {
    result = await prisma.socialMedia.update({
      where: {
        id: findSocialMedia.id,
      },
      data: payload,
    });
  }

  return result;
};

const getSocialMediaFromDB = async () => {
  const result = await prisma.socialMedia.findFirst();

  return result;
};

export const SocialMediaServices = {
  upsertSocialMediaIntoDB,
  getSocialMediaFromDB,
};
