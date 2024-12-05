"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminContactRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validationRequest_1 = __importDefault(require("../../middlewares/validationRequest"));
const adminContact_validation_1 = require("./adminContact.validation");
const adminContact_controller_1 = require("./adminContact.controller");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)('admin'), (0, validationRequest_1.default)(adminContact_validation_1.AdminContactValidation.updateAdminContactValidationSchema), adminContact_controller_1.AdminContactController.createAdminContact);
router.get('/', adminContact_controller_1.AdminContactController.getAdminContact);
exports.AdminContactRoutes = router;
