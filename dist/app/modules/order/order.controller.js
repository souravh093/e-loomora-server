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
exports.OrderController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const order_service_1 = require("./order.service");
const createOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_service_1.OrderService.createOrderIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Order created successfully',
        data: result,
    });
}));
const getOrders = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { result, meta } = yield order_service_1.OrderService.getOrdersFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        meta,
        data: result,
    });
}));
const getOrderById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_service_1.OrderService.getOrderByIdFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Order fetched successfully',
        data: result,
    });
}));
const getOrderByUserId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_service_1.OrderService.getOrderByUserIdFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Order fetched successfully',
        data: result,
    });
}));
const getAllInfo = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_service_1.OrderService.getAllInfoFromDB(req.user);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Order fetched successfully',
        data: result,
    });
}));
const getOrderCountByWeek = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_service_1.OrderService.getOrderCountByWeek(req.params.shopId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Order count fetched successfully',
        data: result,
    });
}));
const getOrderCountByMonth = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_service_1.OrderService.getOrderCountByMonth(req.params.shopId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Order count fetched successfully',
        data: result,
    });
}));
const getOrdersByUserId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_service_1.OrderService.getOrdersByUserIdFromDB(req.user.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Order fetched successfully',
        data: result,
    });
}));
const getCustomerOrdersStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_service_1.OrderService.getCustomerOrdersStatus(req.user);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Order status fetched successfully',
        data: result,
    });
}));
const getOrderCountByDayOfWeek = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_service_1.OrderService.getOrderCountByDayOfWeek(req.user);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Order count fetched successfully',
        data: result,
    });
}));
const getOrderCountByMonthCustomer = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_service_1.OrderService.getOrderCountByMonthCustomer(req.user);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Order count fetched successfully',
        data: result,
    });
}));
exports.OrderController = {
    createOrder,
    getOrders,
    getOrderById,
    getOrderByUserId,
    getAllInfo,
    getOrderCountByWeek,
    getOrderCountByMonth,
    getOrdersByUserId,
    getCustomerOrdersStatus,
    getOrderCountByDayOfWeek,
    getOrderCountByMonthCustomer,
};
