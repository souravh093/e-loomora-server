"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const validationRequest_1 = __importDefault(require("../../middlewares/validationRequest"));
const order_validation_1 = require("./order.validation");
const order_controller_1 = require("./order.controller");
const router = (0, express_1.Router)();
router.post('/', 
// auth(Role.USER), // TODO
(0, validationRequest_1.default)(order_validation_1.OrderValidations.createOrderValidation), order_controller_1.OrderController.createOrder);
router.get('/user', (0, auth_1.default)(client_1.Role.USER), order_controller_1.OrderController.getOrderByUserId);
router.get('/', (0, auth_1.default)(client_1.Role.ADMIN, client_1.Role.VENDOR, client_1.Role.USER), order_controller_1.OrderController.getOrders);
router.get('/payment', (0, auth_1.default)(client_1.Role.USER), order_controller_1.OrderController.getOrdersByUserId);
router.get('/all-info', (0, auth_1.default)(client_1.Role.ADMIN, client_1.Role.VENDOR, client_1.Role.USER), order_controller_1.OrderController.getAllInfo);
router.get('/customer/status', (0, auth_1.default)(client_1.Role.USER), order_controller_1.OrderController.getCustomerOrdersStatus);
router.get('/customer/day-of-week', (0, auth_1.default)(client_1.Role.USER), order_controller_1.OrderController.getOrderCountByDayOfWeek);
router.get('/customer/month', (0, auth_1.default)(client_1.Role.USER), order_controller_1.OrderController.getOrderCountByMonthCustomer);
router.get('/week/:shopId', (0, auth_1.default)(client_1.Role.ADMIN, client_1.Role.VENDOR), order_controller_1.OrderController.getOrderCountByWeek);
router.get('/month/:shopId', (0, auth_1.default)(client_1.Role.ADMIN, client_1.Role.VENDOR), order_controller_1.OrderController.getOrderCountByMonth);
router.get('/:id', (0, auth_1.default)(client_1.Role.ADMIN, client_1.Role.VENDOR, client_1.Role.USER), order_controller_1.OrderController.getOrderById);
exports.OrderRoutes = router;
