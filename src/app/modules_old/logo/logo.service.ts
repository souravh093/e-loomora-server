import { Logo } from '@prisma/client';
import prisma from '../../../db/db.config';
import AppError from '../../errors/AppError';
import { TFile } from '../../interface/file';
import config from '../../config';
import { getImagePathToUnlink } from '../../utils/getFilePathToUnlink';
import fs from 'fs';

const createLogoIntoDB = async (payload: Logo) => {
  const result = await prisma.logo.create({
    data: payload,
  });

  return result;
};

const getLogoFromDB = async () => {
  const result = await prisma.logo.findFirst();

  return result;
};

const updateLogoIntoDB = async (
  payload: Logo,
  requestImage: TFile | undefined,
) => {
  const findLogo = await prisma.logo.findFirst();

  if (!findLogo) {
    throw new AppError(400, 'Logo does not exists');
  }

  const result = await prisma.logo.update({
    where: {
      id: findLogo?.id,
    },
    data: {
      // If requestImage is not undefined, then update the image
      image: requestImage
        ? `${config.serverUrl}/images/${requestImage.filename}`
        : findLogo.image,
      logoAlt: payload.logoAlt,
    },
  });

  if (result && requestImage) {
    const imageToUnlink = getImagePathToUnlink(findLogo.image);
    fs.unlinkSync(imageToUnlink);
  }

  return result;
};

export const LogoServices = {
  createLogoIntoDB,
  getLogoFromDB,
  updateLogoIntoDB,
};
