"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const validationRequest_1 = __importDefault(require("../../middlewares/validationRequest"));
const auth_validation_1 = require("./auth.validation");
const auth_controller_1 = require("./auth.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
router.post('/login', (0, validationRequest_1.default)(auth_validation_1.AuthValidations.loginValidation), auth_controller_1.AuthController.loginUser);
router.post('/forget-password', (0, validationRequest_1.default)(auth_validation_1.AuthValidations.forgetPasswordValidation), auth_controller_1.AuthController.forgetPassword);
router.post('/reset-password', (0, validationRequest_1.default)(auth_validation_1.AuthValidations.resetPasswordValidation), auth_controller_1.AuthController.resetPassword);
router.post('/change-password', (0, auth_1.default)(client_1.Role.USER, client_1.Role.ADMIN, client_1.Role.VENDOR), (0, validationRequest_1.default)(auth_validation_1.AuthValidations.changePasswordValidation), auth_controller_1.AuthController.changedPassword);
exports.AuthRoutes = router;
