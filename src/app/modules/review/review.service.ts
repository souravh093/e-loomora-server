import { Review } from '@prisma/client';
import prisma from '../../../db/db.config';

const createReview = async (payload: Review) => {
  const result = await prisma.review.create({
    data: payload,
  });

  return result;
};

const getReviews = async (shopId: string) => {
  const result = await prisma.review.findMany({
    where: {
      product: {
        shopId: shopId,
      },
    },
    include: {
      product: {
        include: {
          category: true,
        },
      },
      user: true,
    },
  });

  return result;
};

const updateReview = async (id: string, payload: Review) => {
  await prisma.review.findUniqueOrThrow({
    where: { id },
  });

  const result = await prisma.review.update({
    where: { id },
    data: payload,
  });

  return result;
};

const deleteReview = async (id: string) => {
  await prisma.review.findUniqueOrThrow({
    where: { id },
  });

  const result = await prisma.review.delete({
    where: { id },
  });

  return result;
};

export const ReviewService = {
  createReview,
  updateReview,
  deleteReview,
  getReviews,
};
