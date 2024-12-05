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
        const order = yield prisma.order.create({
            data: {
                userId,
                shopId,
                totalAmount,
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
        const transactionId = `TXN-${Date.now()}${Math.floor(10000 + Math.random()) * 90000}`;
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
                }
            },
            user: true,
            shop: true,
            shippingAddress: true,
        },
    });
    return result;
});
exports.OrderService = {
    createOrderIntoDB,
    getOrdersFromDB,
    getOrderByIdFromDB,
};