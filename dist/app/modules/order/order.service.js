"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const client_1 = require("@prisma/client");
const db_config_1 = __importDefault(require("../../../db/db.config"));
const payment_utils_1 = require("../payment/payment.utils");
const prismaBuilderQuery_1 = require("../../builder/prismaBuilderQuery");
const createOrderIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_config_1.default.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId, shopId, totalAmount, orderItem, shippingAddress } = payload;
        const transactionId = `TXN-${Date.now()}${Math.floor(10000 + Math.random()) * 90000}`;
        const order = yield prisma.order.create({
            data: {
                userId,
                shopId,
                totalAmount,
                transactionId,
                status: client_1.OrderStatus.PENDING,
                orderItem: {
                    create: orderItem.map((item) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.price,
                    })),
                },
            },
        });
        yield prisma.shippingAddress.create({
            data: Object.assign(Object.assign({}, shippingAddress), { orderId: order.id }),
        });
        const isExistUser = yield prisma.user.findUniqueOrThrow({
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
        const paymentResponse = yield (0, payment_utils_1.initiatePayment)(paymentInfo);
        yield prisma.payment.create({
            data: {
                transactionId,
                amount: totalAmount,
                status: client_1.PaymentStatus.PENDING,
                orderId: order.id,
            },
        });
        return {
            order,
            paymentResponse,
        };
    }));
    return result;
});
const getOrdersFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const orderQuery = (0, prismaBuilderQuery_1.buildPrismaQuery)({
        searchFields: ['status'],
        searchTerm: query.searchTerm,
        filter: query.filter && JSON.parse(query.filter),
        orderBy: query.orderBy && JSON.parse(query.orderBy),
        page: query.page,
        limit: query.limit,
    });
    const totalOrders = yield db_config_1.default.order.count({
        where: orderQuery.where,
    });
    const totalPages = Math.ceil(totalOrders / orderQuery.take);
    const result = yield db_config_1.default.order.findMany(Object.assign(Object.assign({}, orderQuery), { include: {
            orderItem: true,
            user: true,
            shop: true,
            shippingAddress: true,
        } }));
    return {
        meta: {
            total: totalOrders,
            limit: orderQuery.take,
            page: totalPages,
        },
        result,
    };
});
const getOrderByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_config_1.default.order.findUniqueOrThrow({
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
});
const getOrderByUserIdFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_config_1.default.order.findFirst({
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
});
const getAllInfoFromDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const shopData = yield db_config_1.default.shop.findFirstOrThrow({
        where: {
            ownerId: userData.id,
        },
    });
    const productsCount = yield db_config_1.default.product.count({
        where: {
            shopId: shopData.id,
        },
    });
    const ordersCount = yield db_config_1.default.order.count({
        where: {
            shopId: shopData.id,
        },
    });
    const totalRevenue = yield db_config_1.default.order.aggregate({
        where: {
            shopId: shopData.id,
            status: client_1.OrderStatus.COMPLETED,
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
});
const getOrderCountByMonth = (shopId) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield db_config_1.default.order.findMany({
        where: {
            shopId: shopId,
            status: client_1.OrderStatus.COMPLETED,
        },
        select: {
            createdAt: true,
        },
    });
    const orderCountByMonth = orders.reduce((acc, order) => {
        const month = order.createdAt.toLocaleString('default', {
            month: 'long',
        });
        if (!acc[month]) {
            acc[month] = 0;
        }
        acc[month]++;
        return acc;
    }, {});
    const chartData = Object.keys(orderCountByMonth).map((month) => ({
        month,
        orderCount: orderCountByMonth[month],
    }));
    return chartData;
});
const getOrderCountByWeek = (shopId) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield db_config_1.default.order.findMany({
        where: {
            shopId: shopId,
            status: client_1.OrderStatus.COMPLETED,
        },
        select: {
            createdAt: true,
        },
    });
    const getStartOfWeek = (date) => {
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 1);
        const startOfWeek = new Date(date.setDate(diff));
        startOfWeek.setHours(0, 0, 0, 0);
        return startOfWeek.toISOString().split('T')[0];
    };
    const orderCountByWeek = orders.reduce((acc, order) => {
        const week = getStartOfWeek(new Date(order.createdAt));
        if (!acc[week]) {
            acc[week] = 0;
        }
        acc[week]++;
        return acc;
    }, {});
    const chartData = Object.keys(orderCountByWeek).map((week) => ({
        week,
        orderCount: orderCountByWeek[week],
    }));
    return chartData;
});
const getOrdersByUserIdFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_config_1.default.order.findMany({
        where: {
            userId,
        },
        include: {
            Payment: true,
        },
    });
    return result;
});
const getCustomerOrdersStatus = (loggedUser) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_config_1.default.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
        const totalOrders = yield prisma.order.count({
            where: {
                userId: loggedUser.id,
            },
        });
        const pendingOrders = yield prisma.order.count({
            where: {
                userId: loggedUser.id,
                status: client_1.OrderStatus.PENDING,
            },
        });
        const completedOrders = yield prisma.order.count({
            where: {
                userId: loggedUser.id,
                status: client_1.OrderStatus.COMPLETED,
            },
        });
        const totalAmount = yield prisma.order.aggregate({
            where: {
                userId: loggedUser.id,
            },
            _sum: {
                totalAmount: true,
            },
        });
        const cancelOrders = yield prisma.order.count({
            where: {
                userId: loggedUser.id,
                status: client_1.OrderStatus.CANCELLED,
            },
        });
        return {
            totalOrders,
            pendingOrders,
            completedOrders,
            totalAmount,
            cancelOrders,
        };
    }));
    return result;
});
const getOrderCountByDayOfWeek = (loggedUser) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_config_1.default.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
        const orders = yield prisma.order.findMany({
            where: {
                userId: loggedUser.id,
            },
            select: {
                createdAt: true,
            },
        });
        const getDayOfWeek = (date) => {
            const day = date.getDay();
            const days = [
                'Sunday',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
            ];
            return days[day];
        };
        const orderCountByDayOfWeek = orders.reduce((acc, order) => {
            const day = getDayOfWeek(new Date(order.createdAt));
            if (!acc[day]) {
                acc[day] = 0;
            }
            acc[day]++;
            return acc;
        }, {});
        const chartData = Object.keys(orderCountByDayOfWeek).map((day) => ({
            day,
            orders: orderCountByDayOfWeek[day],
        }));
        return chartData;
    }));
    return result;
});
const getOrderCountByMonthCustomer = (loggedUser) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_config_1.default.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
        const orders = yield prisma.order.findMany({
            where: {
                userId: loggedUser.id,
            },
            select: {
                createdAt: true,
            },
        });
        const orderCountByMonth = orders.reduce((acc, order) => {
            const month = order.createdAt.toLocaleString('default', {
                month: 'long',
            });
            if (!acc[month]) {
                acc[month] = 0;
            }
            acc[month]++;
            return acc;
        }, {});
        const chartData = Object.keys(orderCountByMonth).map((month) => ({
            name: month,
            orders: orderCountByMonth[month],
        }));
        return chartData;
    }));
    return result;
});
exports.OrderService = {
    createOrderIntoDB,
    getOrdersFromDB,
    getOrderByIdFromDB,
    getOrderByUserIdFromDB,
    getAllInfoFromDB,
    getOrderCountByMonth,
    getOrderCountByWeek,
    getOrdersByUserIdFromDB,
    getCustomerOrdersStatus,
    getOrderCountByDayOfWeek,
    getOrderCountByMonthCustomer,
};
