"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validationRequest_1 = __importDefault(require("../../middlewares/validationRequest"));
const lanugage_validation_1 = require("./lanugage.validation");
const lanugage_controller_1 = require("./lanugage.controller");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)('admin'), (0, validationRequest_1.default)(lanugage_validation_1.LanguageValidations.createLanguageValidationSchema), lanugage_controller_1.LanguageController.createLanguage);
router.get('/', lanugage_controller_1.LanguageController.getLanguages);
router.get('/:id', lanugage_controller_1.LanguageController.getLanguage);
router.put('/:id', (0, auth_1.default)('admin'), (0, validationRequest_1.default)(lanugage_validation_1.LanguageValidations.updateLanguageValidationSchema), lanugage_controller_1.LanguageController.updateLanguage);
router.delete('/:id', (0, auth_1.default)('admin'), lanugage_controller_1.LanguageController.deleteLanguage);
exports.LanguageRoutes = router;
