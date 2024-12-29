import { ShopFollow } from '@prisma/client';
import prisma from '../../../db/db.config';

const followShopIntoDB = async (payload: ShopFollow) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: payload.userId,
    },
  });

  const result = await prisma.shopFollow.create({
    data: payload,
  });

  await prisma.shop.update({
    where: {
      id: payload.shopId,
    },
    data: {
      follower: {
        increment: 1,
      },
    },
  });

  return result;
};

const unfollowShopFromDB = async (payload: ShopFollow) => {
  await prisma.shopFollow.findUniqueOrThrow({
    where: {
      id: payload.id,
      userId: payload.userId,
      shopId: payload.shopId,
    },
  });

  await prisma.shopFollow.delete({
    where: {
      id: payload.id,
      userId: payload.userId,
      shopId: payload.shopId,
    },
  });

  await prisma.shop.update({
    where: {
      id: payload.shopId,
    },
    data: {
      follower: {
        decrement: 1,
      },
    },
  });

  return 'Shop Unfollowed successfully';
};

const getShopFollowByUserId = async (userId: string) => {
  const result = await prisma.shopFollow.findMany({
    where: {
      userId,
    },
  });

  return result;
};

const getShopFollowByShopId = async (shopId: string) => {
  const result = await prisma.shopFollow.findMany({
    where: {
      shopId,
    },
  });

  return result;
};

const checkShopFollow = async (query: Record<string, any>) => {
  const result = await prisma.shopFollow.findFirst({
    where: {
      userId: query.userId,
      shopId: query.shopId,
    },
  });

  return result;
};

const getAllShopFollow = async () => {
  const result = await prisma.shopFollow.findMany();

  return result;
};

export const ShopFollowService = {
  followShopIntoDB,
  unfollowShopFromDB,
  getShopFollowByUserId,
  getShopFollowByShopId,
  checkShopFollow,
  getAllShopFollow,
};
