"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRoutes = void 0;
const express_1 = require("express");
const payment_controller_1 = require("./payment.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
router.post('/confirmation', payment_controller_1.PaymentController.confirmationController);
router.get('/', (0, auth_1.default)(client_1.Role.ADMIN, client_1.Role.VENDOR), payment_controller_1.PaymentController.getPayments);
exports.paymentRoutes = router;
