import { OrderStatus, PaymentStatus } from '@prisma/client';
import prisma from '../../../db/db.config';
import { initiatePayment } from '../payment/payment.utils';
import { TOrder } from '../../types/orderTypes';
import { buildPrismaQuery } from '../../builder/prismaBuilderQuery';
import { JwtPayload } from 'jsonwebtoken';

const createOrderIntoDB = async (payload: TOrder) => {
  const result = await prisma.$transaction(async (prisma) => {
    const { userId, shopId, totalAmount, orderItem, shippingAddress } = payload;

    const transactionId = `TXN-${Date.now()}${Math.floor(10000 + Math.random()) * 90000}`;

    const order = await prisma.order.create({
      data: {
        userId,
        shopId,
        totalAmount,
        transactionId,
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
      shippingAddress: true,
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

const getOrderByIdFromDB = async (id: string) => {
  const result = await prisma.order.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      orderItem: {
        include: {
          product: true,
        },
      },
      user: true,
      shop: true,
      shippingAddress: true,
    },
  });

  return result;
};

const getOrderByUserIdFromDB = async (query: Record<string, any>) => {
  const result = await prisma.order.findFirst({
    where: {
      userId: query.userId,
      orderItem: {
        some: {
          productId: query.productId,
        },
      },
    },
  });

  return result;
};

const getAllInfoFromDB = async (userData: JwtPayload) => {
  const shopData = await prisma.shop.findFirstOrThrow({
    where: {
      ownerId: userData.id,
    },
  });

  const productsCount = await prisma.product.count({
    where: {
      shopId: shopData.id,
    },
  });

  const ordersCount = await prisma.order.count({
    where: {
      shopId: shopData.id,
    },
  });

  const totalRevenue = await prisma.order.aggregate({
    where: {
      shopId: shopData.id,
      status: OrderStatus.COMPLETED,
    },
    _sum: {
      totalAmount: true,
    },
  });

  return {
    productsCount,
    ordersCount,
    totalRevenue,
  };
};

const getOrderCountByMonth = async (shopId: string) => {
  const orders = await prisma.order.findMany({
    where: {
      shopId: shopId,
      status: OrderStatus.COMPLETED,
    },
    select: {
      createdAt: true,
    },
  });

  const orderCountByMonth = orders.reduce(
    (acc, order) => {
      const month = order.createdAt.toLocaleString('default', {
        month: 'long',
      });
      if (!acc[month]) {
        acc[month] = 0;
      }
      acc[month]++;
      return acc;
    },
    {} as Record<string, number>,
  );

  const chartData = Object.keys(orderCountByMonth).map((month) => ({
    month,
    orderCount: orderCountByMonth[month],
  }));

  return chartData;
};

const getOrderCountByWeek = async (shopId: string) => {
  const orders = await prisma.order.findMany({
    where: {
      shopId: shopId,
      status: OrderStatus.COMPLETED,
    },
    select: {
      createdAt: true,
    },
  });

  const getStartOfWeek = (date: Date): string => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    const startOfWeek = new Date(date.setDate(diff));
    startOfWeek.setHours(0, 0, 0, 0);
    return startOfWeek.toISOString().split('T')[0];
  };

  const orderCountByWeek = orders.reduce(
    (acc, order) => {
      const week = getStartOfWeek(new Date(order.createdAt));
      if (!acc[week]) {
        acc[week] = 0;
      }
      acc[week]++;
      return acc;
    },
    {} as Record<string, number>,
  );

  const chartData = Object.keys(orderCountByWeek).map((week) => ({
    week,
    orderCount: orderCountByWeek[week],
  }));

  return chartData;
};

const getOrdersByUserIdFromDB = async (userId: string) => {
  const result = await prisma.order.findMany({
    where: {
      userId,
    },
    include: {
      Payment: true,
    },
  });

  return result;
};

export const OrderService = {
  createOrderIntoDB,
  getOrdersFromDB,
  getOrderByIdFromDB,
  getOrderByUserIdFromDB,
  getAllInfoFromDB,
  getOrderCountByMonth,
  getOrderCountByWeek,
  getOrdersByUserIdFromDB,
};
