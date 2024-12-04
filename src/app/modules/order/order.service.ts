import { OrderStatus, PaymentStatus } from '@prisma/client';
import prisma from '../../../db/db.config';
import { initiatePayment } from '../payment/payment.utils';
import { TOrder } from '../../types/orderTypes';
import { buildPrismaQuery } from '../../builder/prismaBuilderQuery';

const createOrderIntoDB = async (payload: TOrder) => {

  const result = await prisma.$transaction(async (prisma) => {
    const { userId, shopId, totalAmount, orderItem, shippingAddress } = payload;

    const order = await prisma.order.create({
      data: {
        userId,
        shopId,
        totalAmount,
        status: OrderStatus.PENDING,
        orderItem: {
          create: orderItem.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });

    
    await prisma.shippingAddress.create({
      data: {
        ...shippingAddress,
        orderId: order.id,
      },
    });

    const transactionId = `TXN-${Date.now()}${Math.floor(10000 + Math.random()) * 90000}`;

    const isExistUser = await prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });

    const paymentInfo = {
      transactionId,
      amount: totalAmount,
      customerName: isExistUser.name,
      customerEmail: isExistUser.email,
      customerPhone: shippingAddress.phone,
      customerAddress: shippingAddress.address,
    };

    const paymentResponse = await initiatePayment(paymentInfo);

    await prisma.payment.create({
      data: {
        transactionId,
        amount: totalAmount,
        status: PaymentStatus.PENDING,
        orderId: order.id,
      },
    });

    return {
      order,
      paymentResponse,
    };
  });

  return result;
};

const getOrdersFromDB = async (query: Record<string, any>) => {
  const orderQuery = buildPrismaQuery({
    searchFields: ['status'],
    searchTerm: query.searchTerm,
    filter: query.filter && JSON.parse(query.filter),
    orderBy: query.orderBy && JSON.parse(query.orderBy),
    page: query.page,
    limit: query.limit,
  });

  const totalOrders = await prisma.order.count({
    where: orderQuery.where,
  });

  const totalPages = Math.ceil(totalOrders / orderQuery.take);

  const result = await prisma.order.findMany({
    ...orderQuery,
    include: {
      orderItem: true,
      user: true,
      shop: true,
    },
  });

  return {
    meta: {
      total: totalOrders,
      limit: orderQuery.take,
      page: totalPages,
    },
    result,
  };
};

export const OrderService = {
  createOrderIntoDB,
  getOrdersFromDB,
};
