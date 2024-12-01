import { Banner } from '@prisma/client';
import prisma from '../../../db/db.config';
import { getImagePathToUnlink } from '../../utils/getFilePathToUnlink';
import fs from 'fs';

const createBannerIntoDB = async (payload: Banner, images: string[]) => {
  const result = await prisma.banner.create({
    data: {
      ...payload,
      BannerImages: {
        create: images.map((image) => ({
          image,
        })),
      },
    },
    include: {
      BannerImages: true,
    },
  });

  return result;
};

const getBannersFromDB = async () => {
  const result = await prisma.banner.findFirst({
    include: {
      BannerImages: true,
    },
  });

  return result;
};

const updateBanner = async (payload: Banner) => {
  const findBanner = await prisma.banner.findFirst();

  if (!findBanner) {
    throw new Error('Banner not found');
  }

  const result = await prisma.banner.update({
    where: {
      id: findBanner.id,
    },
    data: payload,
  });

  return result;
};

const createBannerImage = async (image: string | null) => {
  const findBanner = await prisma.banner.findFirst();

  if (!findBanner) {
    throw new Error('Banner not found');
  }

  if (!image) {
    throw new Error('Image is required');
  }

  const result = await prisma.bannerImages.create({
    data: {
      image,
      bannerId: findBanner.id,
    },
  });

  return result;
};

const deleteBannerImage = async (id: string) => {
  const findBannerImage = await prisma.bannerImages.findUnique({
    where: { id },
  });

  if (!findBannerImage) {
    throw new Error('Banner image not found');
  }

  const result = await prisma.bannerImages.delete({
    where: {
      id,
    },
  });

  if (findBannerImage) {
    const imageToUnlink = getImagePathToUnlink(findBannerImage.image);
    if (fs.existsSync(imageToUnlink)) {
      fs.unlinkSync(imageToUnlink);
    }
  }

  return result;
};

export const BannerService = {
  createBannerIntoDB,
  getBannersFromDB,
  updateBanner,
  createBannerImage,
  deleteBannerImage,
};
