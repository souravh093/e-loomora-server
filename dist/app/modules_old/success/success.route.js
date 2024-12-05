"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validationRequest_1 = __importDefault(require("../../middlewares/validationRequest"));
const success_validation_1 = require("./success.validation");
const success_controller_1 = require("./success.controller");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)('admin'), (0, validationRequest_1.default)(success_validation_1.SuccessValidation.updateSuccessValidationSchema), success_controller_1.SuccessController.upsertSuccess);
router.get('/', success_controller_1.SuccessController.getSuccess);
exports.SuccessRoutes = router;
