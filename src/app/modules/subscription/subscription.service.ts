import { Subscription } from '@prisma/client';
import prisma from '../../../db/db.config';

const createSubscription = async (payload: Subscription) => {
  const alreadySubscribe = await prisma.subscription.findFirst({
    where: {
      email: payload.email,
    },
  });

  if (alreadySubscribe) {
    throw new Error('You have already subscribed to our newsletter');
  }

  return await prisma.subscription.create({
    data: payload,
  });
};

const getSubscriptions = async () => {
  return await prisma.subscription.findMany();
};

const deleteSubscription = async (id: string) => {
  const result = await prisma.subscription.delete({
    where: {
      id,
    },
  });

  return result;
};

export const SubscriptionService = {
  createSubscription,
  getSubscriptions,
  deleteSubscription,
};
