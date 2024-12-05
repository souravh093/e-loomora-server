"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoRoutes = void 0;
const express_1 = require("express");
const logo_controller_1 = require("./logo.controller");
const multer_1 = require("../../middlewares/multer");
const validationRequest_1 = __importDefault(require("../../middlewares/validationRequest"));
const logo_validation_1 = require("./logo.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)('admin'), multer_1.imageUpload.single('image'), (0, validationRequest_1.default)(logo_validation_1.LogoValidations.LogoValidation), logo_controller_1.LogoController.createLogo);
router.get('/', logo_controller_1.LogoController.getLogo);
router.put('/', (0, auth_1.default)('admin'), multer_1.imageUpload.single('image'), (0, validationRequest_1.default)(logo_validation_1.LogoValidations.LogoValidation), logo_controller_1.LogoController.updateLogo);
exports.LogoRoutes = router;
