"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FooterRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const footer_service_1 = require("./footer.service");
const validationRequest_1 = __importDefault(require("../../middlewares/validationRequest"));
const footer_validation_1 = __importDefault(require("./footer.validation"));
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)('admin'), (0, validationRequest_1.default)(footer_validation_1.default), footer_service_1.FooterServices.upsertFooterIntoDB);
router.get('/', footer_service_1.FooterServices.getFooterFromDB);
exports.FooterRoutes = router;
