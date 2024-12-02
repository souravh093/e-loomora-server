import { Coupon } from '@prisma/client';
import prisma from '../../../db/db.config';

const createCouponIntoDB = async (payload: Coupon) => {
  const result = await prisma.coupon.create({
    data: payload,
  });

  return result;
};

const getCouponById = async (id: string) => {
  const result = await prisma.coupon.findUniqueOrThrow({
    where: {
      id,
    },
  });

  return result;
};

const getAllCoupons = async () => {
  const result = await prisma.coupon.findMany();

  return result;
};

const updateCouponById = async (id: string, payload: Coupon) => {
  await prisma.coupon.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const result = await prisma.coupon.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteCouponById = async (id: string) => {
  await prisma.coupon.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const result = await prisma.coupon.delete({
    where: {
      id,
    },
  });

  return result;
};

export const CouponService = {
  createCouponIntoDB,
  getCouponById,
  getAllCoupons,
  updateCouponById,
  deleteCouponById,
};